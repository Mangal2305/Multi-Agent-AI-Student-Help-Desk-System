-- Run this against sahayak-db after schema-add-auth-columns.sql.
-- Adds what's needed for full ticket + conversation persistence.
-- Safe to re-run (IF NOT EXISTS guards throughout).

ALTER TABLE support_tickets
  ADD COLUMN IF NOT EXISTS dept VARCHAR(100),
  ADD COLUMN IF NOT EXISTS entities_json JSONB,
  ADD COLUMN IF NOT EXISTS intent_key VARCHAR(50),
  ADD COLUMN IF NOT EXISTS norm_query TEXT,
  ADD COLUMN IF NOT EXISTS faculty_response TEXT,
  ADD COLUMN IF NOT EXISTS added_to_kb BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE ai_conversations
  ADD COLUMN IF NOT EXISTS response_type VARCHAR(20) NOT NULL DEFAULT 'answer',
  ADD COLUMN IF NOT EXISTS confidence NUMERIC(4,3),
  ADD COLUMN IF NOT EXISTS ticket_id INT REFERENCES support_tickets(ticket_id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS dept VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_tickets_dept ON support_tickets(dept);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON ai_conversations(user_id);
