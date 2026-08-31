require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// Database connection
// ---------------------------------------------------------
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || 'postgres',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.PGSSLROOTCERT || './global-bundle.pem').toString()
  },
  max: 10,
  idleTimeoutMillis: 30000
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle DB client', err);
});

// ---------------------------------------------------------
// Health check
// ---------------------------------------------------------
app.get('/healthz', (req, res) => res.status(200).send('ok'));

app.get('/api/db-health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Database unreachable' });
  }
});

// ---------------------------------------------------------
// Auth: Signup
// ---------------------------------------------------------
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  const validRoles = ['student', 'faculty', 'admin'];
  const finalRole = validRoles.includes(role) ? role : 'student';

  try {
    const existing = await pool.query('SELECT user_id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, full_name, email, role, created_at`,
      [name, email.toLowerCase(), passwordHash, finalRole]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Could not create account' });
  }
});

// ---------------------------------------------------------
// Auth: Signin
// ---------------------------------------------------------
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT user_id, full_name, email, password_hash, role FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    res.json({
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Could not sign in' });
  }
});

// ---------------------------------------------------------
// AI Conversations: log a chat exchange
// ---------------------------------------------------------
app.post('/api/conversations', async (req, res) => {
  const {
    user_id,
    user_query,
    ai_response,
    channel,
    sentiment
  } = req.body;

  // Validate required fields
  if (!user_id || !user_query || !ai_response) {
    return res.status(400).json({
      error: 'user_id, user_query and ai_response are required'
    });
  }

  try {
    // Check that the user actually exists
    const userCheck = await pool.query(
      `SELECT user_id FROM public.users WHERE user_id = $1`,
      [user_id]
    );

    if (userCheck.rows.length === 0) {
      return res.status(400).json({
        error: `User ID ${user_id} does not exist`
      });
    }

    // Save conversation
    const result = await pool.query(
      `
      INSERT INTO public.ai_conversations
      (
        user_id,
        user_query,
        ai_response,
        channel,
        sentiment
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        conversation_id,
        user_id,
        user_query,
        ai_response,
        channel,
        sentiment,
        created_at
      `,
      [
        user_id,
        user_query,
        ai_response,
        channel || 'web',
        sentiment || null
      ]
    );

    console.log('✅ Conversation saved:', result.rows[0]);

    res.status(201).json({
      success: true,
      conversation: result.rows[0]
    });

  } catch (err) {
    console.error('❌ Conversation log error:', err);

    res.status(500).json({
      success: false,
      error: 'Could not save conversation',
      details: err.message
    });
  }
});
// ---------------------------------------------------------
// Support Tickets: create + list + resolve
// ---------------------------------------------------------
app.post('/api/tickets', async (req, res) => {
  const { user_id, conversation_id, subject, description, priority } = req.body;
  if (!subject) {
    return res.status(400).json({ error: 'subject is required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO support_tickets (user_id, conversation_id, subject, description, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ticket_id, status, created_at`,
      [user_id || null, conversation_id || null, subject, description || null, priority || 'medium']
    );
    res.status(201).json({ ticket: result.rows[0] });
  } catch (err) {
    console.error('Ticket creation error:', err);
    res.status(500).json({ error: 'Could not create ticket' });
  }
});

app.get('/api/tickets', async (req, res) => {
  const { user_id, status } = req.query;
  const conditions = [];
  const values = [];
  if (user_id) { values.push(user_id); conditions.push(`user_id = $${values.length}`); }
  if (status) { values.push(status); conditions.push(`status = $${values.length}`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await pool.query(
      `SELECT * FROM support_tickets ${where} ORDER BY created_at DESC`,
      values
    );
    res.json({ tickets: result.rows });
  } catch (err) {
    console.error('Ticket list error:', err);
    res.status(500).json({ error: 'Could not fetch tickets' });
  }
});

app.patch('/api/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { status, assigned_to } = req.body;
  try {
    const result = await pool.query(
      `UPDATE support_tickets
       SET status = COALESCE($1, status),
           assigned_to = COALESCE($2, assigned_to),
           resolved_at = CASE WHEN $1 = 'resolved' THEN now() ELSE resolved_at END
       WHERE ticket_id = $3
       RETURNING *`,
      [status || null, assigned_to || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ ticket: result.rows[0] });
  } catch (err) {
    console.error('Ticket update error:', err);
    res.status(500).json({ error: 'Could not update ticket' });
  }
});

// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sahayak backend listening on port ${PORT}`));