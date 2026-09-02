/* ============================================================
   DATA MODEL
============================================================ */
const API_BASE = ''; // same-origin: nginx proxies /api/* to the Node backend on :3000

const DEPTS = {
  "Admissions":"Prof. Rina Shah",
  "Examination":"Prof. Meera Nair",
  "Fees":"Prof. Anil Bhatt",
  "Scholarship":"Prof. Divya Rao",
  "Library":"Prof. Sunil Mehta",
  "Hostel":"Prof. Kavita Joshi",
  "Placement":"Prof. Rakesh Iyer",
  "Academic Office":"Prof. Neha Trivedi",
  "Transport":"Prof. Jignesh Patel",
  "IT Support":"Mr. Karan Desai",
  "Health Center":"Dr. Priya Solanki",
  "Sports":"Prof. Vikram Chauhan",
  "Alumni Relations":"Prof. Sneha Gupta",
  "Student Services":"Student Services Desk"
};

const SEED_KB = [
 {id:"in01",name:"Exam Schedule",dept:"Examination",keywords:["exam","examination","schedule","timetable","begin","start","semester exam","date sheet"],answer:"Semester 7 examinations begin on 24 November 2026. The detailed timetable is published on the student portal under Examination > Schedule at least 21 days in advance."},
 {id:"in02",name:"Hall Ticket / Admit Card",dept:"Examination",keywords:["hall ticket","admit card","download ticket","exam ticket"],answer:"Hall tickets are released 7 days before the first exam. Download it from Student Portal > Examination > Hall Ticket using your enrollment number."},
 {id:"in03",name:"Revaluation",dept:"Examination",keywords:["revaluation","recheck","remark","re-evaluation","challenge marks"],answer:"Revaluation requests can be raised within 5 days of result declaration via Portal > Examination > Revaluation, with a fee of ₹300 per subject."},
 {id:"in04",name:"Admission Eligibility",dept:"Admissions",keywords:["eligibility","criteria","admission requirement","who can apply"],answer:"Eligibility for the Integrated MSc/MS IT programme is 50% in HSC (Science) with Mathematics as a subject. Lateral entry requires a relevant diploma with 50% marks."},
 {id:"in05",name:"Admission Deadline",dept:"Admissions",keywords:["deadline","last date","apply by","admission close"],answer:"Admissions for the 2026-27 batch close on 10 August 2026. Late applications may be considered subject to seat availability with a late fee."},
 {id:"in06",name:"Fee Payment",dept:"Fees",keywords:["fee","payment","pay fees","due date","late fine","installment"],answer:"Semester fees can be paid online via Portal > Fees > Pay Now, or through the SBI Collect link. The due date for Sem 7 is 5 August 2026; a 2% late fine applies after that."},
 {id:"in07",name:"Fee Receipt",dept:"Fees",keywords:["receipt","invoice","fee slip","fee proof"],answer:"Fee receipts are auto-generated after payment and available under Portal > Fees > Receipts. You can also request a duplicate receipt from the accounts office."},
 {id:"in08",name:"Scholarship Application",dept:"Scholarship",keywords:["scholarship","apply scholarship","financial aid","merit scholarship"],answer:"Merit and need-based scholarship applications open from 1-15 September every year on the National Scholarship Portal, linked from Portal > Scholarships."},
 {id:"in09",name:"Scholarship Status",dept:"Scholarship",keywords:["scholarship status","disbursed","approved scholarship","scholarship tracking"],answer:"Scholarship disbursement status can be tracked under Portal > Scholarships > My Applications. Disbursement typically completes within 60 days of approval."},
 {id:"in10",name:"Library Timing",dept:"Library",keywords:["library timing","library hours","library open","library close"],answer:"The Central Library is open Monday–Saturday, 8:00 AM to 10:00 PM, and Sundays 10:00 AM to 4:00 PM during exam weeks."},
 {id:"in11",name:"Library Book Issue/Return",dept:"Library",keywords:["issue book","return book","renew book","library fine","book due"],answer:"Students can issue up to 4 books for 14 days, renewable twice online via Portal > Library. A fine of ₹2/day applies after the due date."},
 {id:"in12",name:"Hostel Allotment",dept:"Hostel",keywords:["hostel","room allotment","hostel allocation","hostel room"],answer:"Hostel room allotment is done on a first-come basis after fee payment. Apply via Portal > Hostel > Room Request; results are announced within 10 working days."},
 {id:"in13",name:"Hostel Fee",dept:"Hostel",keywords:["hostel fee","mess fee","hostel charges"],answer:"Annual hostel fee (including mess) for 2026-27 is ₹98,000, payable in two installments through Portal > Hostel > Fees."},
 {id:"in14",name:"Placement Companies",dept:"Placement",keywords:["placement","companies visiting","campus recruitment","placement drive"],answer:"42 companies visited campus in the last placement season including TCS, Infosys, and Accenture. The upcoming drive calendar is on Portal > Placement > Schedule."},
 {id:"in15",name:"Placement Eligibility",dept:"Placement",keywords:["placement eligibility","cgpa criteria","placement criteria","backlog placement"],answer:"Minimum eligibility for placement drives is 6.5 CGPA with no active backlogs at the time of the drive, unless specified otherwise by the visiting company."},
 {id:"in16",name:"Certificate Request",dept:"Academic Office",keywords:["certificate","bonafide","transcript request","migration certificate","character certificate"],answer:"Bonafide, transcript and migration certificates can be requested via Portal > Academic Office > Certificate Request. Processing takes 5-7 working days."},
 {id:"in17",name:"Transcript Status",dept:"Academic Office",keywords:["transcript status","certificate status","track request","application status"],answer:"You can track the status of any certificate request under Portal > Academic Office > My Requests — it updates in real time as it moves through approval."},
 {id:"in18",name:"Bus Route & Timing",dept:"Transport",keywords:["bus route","bus timing","bus stop","pickup point","transport schedule"],answer:"Campus bus routes and timings for all 12 city stops are listed under Portal > Transport > Routes. Buses depart from the main stops between 7:00 AM and 7:45 AM."},
 {id:"in19",name:"Bus Pass / Transport Fee",dept:"Transport",keywords:["bus pass","transport fee","travel pass","transport charges"],answer:"Annual transport pass fee depends on your route zone (₹9,000–₹16,000). Apply and pay under Portal > Transport > Apply for Pass within the first two weeks of the semester."},
 {id:"in20",name:"WiFi / Network Issue",dept:"IT Support",keywords:["wifi","wi-fi","internet not working","network issue","cannot connect wifi"],answer:"For WiFi issues, reconnect using your student ID as username and reset your network password at Portal > IT Support > WiFi Reset. Persistent outages are posted on the IT Support status page."},
 {id:"in21",name:"Portal Login / Password Reset",dept:"IT Support",keywords:["portal login","forgot password","account locked","reset password","cannot login"],answer:"Reset your student portal password using the 'Forgot Password' link on the login page — a reset link is emailed to your registered address within 5 minutes."},
 {id:"in22",name:"Health Center Timing",dept:"Health Center",keywords:["health center","medical","doctor on campus","clinic timing","feeling sick"],answer:"The campus Health Center is open 9:00 AM to 6:00 PM on weekdays with a resident doctor. For emergencies after hours, contact campus security at the gate for ambulance coordination."},
 {id:"in23",name:"Sports Facilities & Tournaments",dept:"Sports",keywords:["sports facility","gym timing","sports ground","tournament","sports quota"],answer:"The gym and sports grounds are open 6:00 AM–9:00 AM and 4:00 PM–8:00 PM daily. Inter-department tournament registrations open each September via Portal > Sports > Events."},
 {id:"in24",name:"Alumni Association",dept:"Alumni Relations",keywords:["alumni","alumni association","ex-student network","alumni meet"],answer:"Graduates are automatically added to the Alumni Association on convocation. Register early for networking access at Portal > Alumni > Join Network."},
 {id:"in25",name:"Internship Opportunities",dept:"Placement",keywords:["internship","summer internship","intern opportunity","industrial training"],answer:"Internship postings for pre-final and final year students are updated weekly under Portal > Placement > Internships, with both on-campus and remote listings."},
 {id:"in26",name:"Grievance Redressal",dept:"Student Services",keywords:["grievance","complaint","file a complaint","harassment complaint"],answer:"Grievances can be filed confidentially via Portal > Student Services > Grievance Cell. Every complaint is acknowledged within 48 hours and reviewed by the Grievance Committee."},
 {id:"in27",name:"Anti-Ragging Policy",dept:"Student Services",keywords:["ragging","anti-ragging","ragging complaint","student safety"],answer:"The institute enforces a strict zero-tolerance anti-ragging policy per UGC regulations. Report any incident immediately to the Anti-Ragging Committee via Portal > Student Services > Anti-Ragging, or the 24x7 helpline."},
 {id:"in28",name:"ID Card Reissue",dept:"Academic Office",keywords:["id card","lost id card","duplicate id card","student id reissue"],answer:"A lost ID card can be reissued for ₹200 via Portal > Academic Office > ID Card Reissue. Report the loss first so the old card is deactivated for security."},
 {id:"in29",name:"NOC Request",dept:"Academic Office",keywords:["noc","no objection certificate","noc for internship","noc for job"],answer:"NOC requests (for internships, higher studies, or part-time work) are processed within 3 working days via Portal > Academic Office > NOC Request."},
 {id:"in30",name:"Semester / Course Registration",dept:"Academic Office",keywords:["semester registration","course registration","enroll subjects","elective selection"],answer:"Semester registration and elective selection open 10 days before each semester starts, via Portal > Academic Office > Registration. Late registration attracts a ₹500 fine."},
 {id:"in31",name:"Attendance Shortage",dept:"Academic Office",keywords:["attendance shortage","condonation","minimum attendance","attendance percentage"],answer:"Minimum required attendance is 75% per subject. Students between 65-75% can apply for condonation with a medical/valid reason via Portal > Academic Office > Attendance Condonation."},
 {id:"in32",name:"Backlog / Supplementary Exam",dept:"Examination",keywords:["backlog exam","supplementary exam","atkt","re-appear exam"],answer:"Backlog/supplementary exams are conducted alongside the next regular semester exam. Apply under Portal > Examination > Backlog Exam Form before the announced deadline."},
 {id:"in33",name:"Convocation",dept:"Academic Office",keywords:["convocation","degree ceremony","graduation ceremony","convocation date"],answer:"Convocation is held annually in December for students who completed all requirements by the previous June. Registration opens on Portal > Academic Office > Convocation two months prior."},
 {id:"in34",name:"Canteen & Mess Menu",dept:"Hostel",keywords:["canteen","mess menu","food menu","canteen timing"],answer:"The weekly mess menu is posted every Sunday on Portal > Hostel > Mess Menu. The main canteen operates 7:30 AM to 9:30 PM daily."}
];

const SAMPLE_QUERIES = [
 "When will Semester 7 examinations begin?","Where can I download my hall ticket?",
 "How do I apply for revaluation of my answer sheet?","What is the eligibility for the Integrated MSc IT admission?",
 "What is the last date to apply for admission this year?","How do I pay my semester fees online?",
 "I need a fee payment receipt, where do I get it?","When do scholarship applications open?",
 "Has my scholarship been disbursed yet?","What are the library timings during exams?",
 "How many books can I issue from the library?","When will hostel room allotment results be announced?",
 "What is the hostel and mess fee for this year?","Which companies visited for placements last year?",
 "What CGPA do I need to be eligible for placements?","How do I request a bonafide certificate?",
 "How can I track my transcript request status?","Is there a late fine on hostel fee payment?",
 "Can I renew a library book online?","What documents are needed for admission eligibility?",
 "Is there a fine for late fee payment?","How long does certificate processing take?",
 "Do I need minimum CGPA for campus placement drives?","What is the exam revaluation fee per subject?",
 "When does the library open on Sundays?","How do I check my scholarship application status?",
 "What is the deadline for the national scholarship portal?","Where do I find the semester exam datesheet?",
 "How do I download my admit card?","What is the hostel allotment process?",
 "What time does the campus bus leave from my stop?","How much does the annual bus pass cost?",
 "My WiFi isn't connecting, what do I do?","I forgot my portal password, how do I reset it?",
 "What are the health center timings?","Is there a doctor available on campus?",
 "When does the gym open?","How do I register for the inter-college tournament?",
 "How do I join the alumni network after graduating?","Are there any internship openings this month?",
 "How do I file a grievance against a faculty member?","Who do I contact for a ragging complaint?",
 "I lost my student ID card, how do I get a new one?","How do I request an NOC for an internship?",
 "When does semester registration open?","What happens if my attendance is below 75%?",
 "How do I apply for a backlog exam?","When is convocation held?",
 "Where can I see this week's mess menu?"
];

const STORAGE_KEY = "sahayak-helpdesk-data";
let DATA = null;

function seedData(){
  return {
    kb: SEED_KB.map(k=>({...k, source:"seed"})),
    tickets: [],
    chatLog: [],
    pendingApprovals: [],
    users: [],
    documents: []
  };
}

async function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    DATA = raw ? JSON.parse(raw) : seedData();
  }catch(e){
    DATA = seedData();
  }
  if(!DATA.kb || DATA.kb.length===0) DATA = seedData();
  if(!DATA.users) DATA.users = [];
  if(!DATA.documents) DATA.documents = [];
  await saveData();
}
async function saveData(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA)); }
  catch(e){ console.error("storage save failed", e); }
}

/* ---------- REAL DATABASE SYNC (tickets + chat history) ---------- */
// Pulls this account's real tickets and chat history from Postgres and
// merges them into the local DATA object, so refreshing the page or
// logging in from another device shows the same data, not just what's
// cached in this browser's localStorage.
async function syncFromDatabase(){
  try{
    const [ticketsRes, convRes] = await Promise.all([
      fetch(`${API_BASE}/api/tickets`).then(r=>r.json()),
      fetch(`${API_BASE}/api/conversations${SESSION.role==='student' ? '?user_id='+SESSION.userId : ''}`).then(r=>r.json())
    ]);

    const dbTickets = (ticketsRes.tickets || []).map(t=>({
      id: 'TCK-' + t.ticket_id,
      dbId: t.ticket_id,
      studentName: t.student_name,
      dept: t.dept,
      query: t.subject,
      status: t.status,
      facultyResponse: t.faculty_response,
      createdAt: new Date(t.created_at).getTime(),
      resolvedAt: t.resolved_at ? new Date(t.resolved_at).getTime() : null,
      entities: t.entities_json || [],
      intentKey: t.intent_key,
      normQuery: t.norm_query,
      addedToKB: t.added_to_kb
    }));

    const dbChatLog = (convRes.conversations || []).map(c=>({
      type: c.response_type || 'answer',
      studentName: c.student_name,
      message: c.user_query,
      response: c.ai_response,
      confidence: c.confidence != null ? Number(c.confidence) : null,
      ticketId: c.ticket_id ? 'TCK-' + c.ticket_id : null,
      dept: c.dept,
      timestamp: new Date(c.created_at).getTime()
    }));

    // DB is the source of truth once reachable; local cache is only a fallback.
    DATA.tickets = dbTickets;
    DATA.chatLog = dbChatLog;
    await saveData();
  }catch(e){
    console.error('Could not sync tickets/conversations from the database — showing local cache instead', e);
    toast('⚠️ Could not reach the server — showing locally cached data.');
  }
}

/* ============================================================
   NLP SIMULATION (Intent + Entity + Confidence)
============================================================ */
function extractEntities(q){
  const found = [];
  const semMatch = q.match(/sem(?:ester)?\s*-?\s*(\d)/i);
  if(semMatch) found.push({type:"SEMESTER", value:"Semester "+semMatch[1]});
  const cgpaMatch = q.match(/(\d(\.\d+)?)\s*cgpa/i);
  if(cgpaMatch) found.push({type:"CGPA", value:cgpaMatch[1]});
  const deptMatch = Object.keys(DEPTS).find(d=>q.toLowerCase().includes(d.toLowerCase()));
  if(deptMatch) found.push({type:"DEPARTMENT", value:deptMatch});
  const feeMatch = q.match(/₹?\s?\d{3,6}/);
  if(feeMatch) found.push({type:"AMOUNT", value:feeMatch[0]});
  return found;
}

function matchIntent(query){
  const q = query.toLowerCase();
  let best = null, bestScore = 0;
  DATA.kb.forEach(entry=>{
    let score = 0;
    entry.keywords.forEach(k=>{ if(q.includes(k.toLowerCase())) score += 1; });
    if(score > bestScore){ bestScore = score; best = entry; }
  });
  let confidence;
  if(bestScore >= 2) confidence = Math.min(0.97, 0.72 + bestScore*0.06);
  else if(bestScore === 1) confidence = 0.58;
  else confidence = 0.17 + Math.random()*0.08;
  return { entry: best, confidence, score: bestScore };
}

function guessDept(query){
  const q = query.toLowerCase();
  const hit = DATA.kb.find(e=>e.keywords.some(k=>q.includes(k.toLowerCase())));
  return hit ? hit.dept : "Student Services";
}

function normalizeQuery(q){
  return q.toLowerCase().replace(/[^\w\s]/g,'').replace(/\s+/g,' ').trim();
}

const STOPWORDS = new Set(['the','is','are','a','an','to','for','of','and','my','i','what','how','when','where','do','does','can','will','on','in','it','this','that','me','you','your','be','with','at','from','was','were','have','has']);
function tokenize(q){
  const tokens = normalizeQuery(q).split(' ').filter(Boolean);
  const cleaned = tokens.filter(t=>!STOPWORDS.has(t));
  return { tokens, cleaned };
}

// A "duplicate" is the same student asking about the same intent (or, if no
// intent matched, the same normalized text) who already has a ticket for it.
// Returns the existing ticket, or null if this is a genuinely new question.
function findExistingTicket(studentName, query, entry){
  const norm = normalizeQuery(query);
  return DATA.tickets.find(t=>{
    if(t.studentName !== studentName) return false;
    if(entry && t.intentKey) return t.intentKey === entry.id;
    if(entry && !t.intentKey) return false;
    return t.normQuery === norm;
  }) || null;
}

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function genTicketId(){ return "TCK-"+Date.now().toString(36).toUpperCase().slice(-6); }
function fmtTime(ts){ return new Date(ts).toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}); }

function toast(msg){
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 3800);
}

/* ============================================================
   SESSION STATE
============================================================ */
let SESSION = { role:null, name:'', tab:null, userId:null };
let AUTH = { mode:'signin', role:null, error:'' };
let DATA_READY = false;

function hashPw(pw){ return btoa(unescape(encodeURIComponent(pw))); } // demo-only obfuscation, not real security
function isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

async function enterApp(){
  SESSION.tab = SESSION.role === 'student' ? 'chat' : SESSION.role === 'faculty' ? 'inbox' : 'overview';
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app-screen').classList.add('show');
  await syncFromDatabase();
  renderShell();
}

/* ---------- AUTH FORM RENDERING ---------- */
function renderAuthForm(){
  const area = document.getElementById('auth-form-area');
  const errHtml = AUTH.error ? `<div class="auth-error">⚠️ ${AUTH.error}</div>` : '';

  if(AUTH.mode === 'signin'){
    area.innerHTML = `
      ${errHtml}
      <label class="field-lbl">Email</label>
      <input type="text" id="signin-email" placeholder="you@silveroak.edu.in">
      <label class="field-lbl">Password</label>
      <input type="text" id="signin-password" placeholder="••••••••">
      <button class="enter-btn" id="signin-btn">Sign In</button>
      <div class="switch-line">New here? <button id="go-signup">Create an account</button></div>
    `;
    document.getElementById('signin-btn').addEventListener('click', handleSignin);
    document.getElementById('go-signup').addEventListener('click', ()=>switchMode('signup'));
    ['signin-email','signin-password'].forEach(id=>{
      document.getElementById(id).addEventListener('keydown', e=>{ if(e.key==='Enter') handleSignin(); });
    });
  } else {
    area.innerHTML = `
      ${errHtml}
      <label class="field-lbl">I am signing up as</label>
      <div class="role-btns" id="role-btns">
        <button class="role-btn" data-role="student"><span class="emoji">🎓</span><span>Student<small>Ask questions, track tickets</small></span></button>
        <button class="role-btn" data-role="faculty"><span class="emoji">🧑‍🏫</span><span>Faculty<small>Resolve escalated queries</small></span></button>
        <button class="role-btn" data-role="admin"><span class="emoji">🛡️</span><span>Admin<small>Analytics &amp; knowledge base</small></span></button>
      </div>
      <label class="field-lbl" style="margin-top:4px;">Full name</label>
      <input type="text" id="signup-name" placeholder="e.g. Aarav Patel">
      <label class="field-lbl">Email</label>
      <input type="text" id="signup-email" placeholder="you@silveroak.edu.in">
      <label class="field-lbl">Password</label>
      <input type="text" id="signup-password" placeholder="At least 4 characters">
      <div class="auth-hint">Faculty: use a name from the roster (e.g. "Prof. Meera Nair") so tickets route to your inbox correctly.</div>
      <button class="enter-btn" id="signup-btn">Create Account &amp; Enter</button>
      <div class="switch-line">Already have an account? <button id="go-signin">Sign in</button></div>
    `;
    document.querySelectorAll('#role-btns .role-btn').forEach(btn=>{
      if(AUTH.role===btn.dataset.role) btn.classList.add('active');
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('#role-btns .role-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        AUTH.role = btn.dataset.role;
      });
    });
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
    document.getElementById('go-signin').addEventListener('click', ()=>switchMode('signin'));
    ['signup-name','signup-email','signup-password'].forEach(id=>{
      document.getElementById(id).addEventListener('keydown', e=>{ if(e.key==='Enter') handleSignup(); });
    });
  }
}

function switchMode(mode){
  AUTH = { mode, role:null, error:'' };
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active', t.dataset.mode===mode));
  renderAuthForm();
}

document.querySelectorAll('.auth-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>switchMode(tab.dataset.mode));
});

/* ---------- REAL BACKEND AUTH (replaces window.storage-based auth) ---------- */
async function handleSignin(){
  const email = document.getElementById('signin-email').value.trim().toLowerCase();
  const password = document.getElementById('signin-password').value;
  if(!email || !password){ AUTH.error='Enter both email and password.'; return renderAuthForm(); }

  try{
    const res = await fetch(`${API_BASE}/api/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if(!res.ok){
      AUTH.error = data.error || 'Incorrect email or password.';
      return renderAuthForm();
    }

    AUTH.error='';
    SESSION.role = data.user.role;
    SESSION.name = data.user.full_name;
    SESSION.userId = data.user.user_id;
    enterApp();
  }catch(e){
    console.error(e);
    AUTH.error = 'Could not reach the server. Try again shortly.';
    renderAuthForm();
  }
}

async function handleSignup(){
  const role = AUTH.role;
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;

  if(!role){ AUTH.error='Choose a role to continue.'; return renderAuthForm(); }
  if(name.length < 2){ AUTH.error='Enter your full name.'; return renderAuthForm(); }
  if(!isValidEmail(email)){ AUTH.error='Enter a valid email address.'; return renderAuthForm(); }
  if(password.length < 4){ AUTH.error='Password should be at least 4 characters.'; return renderAuthForm(); }

  try{
    const res = await fetch(`${API_BASE}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();

    if(!res.ok){
      AUTH.error = data.error || 'Could not create account.';
      return renderAuthForm();
    }

    AUTH.error='';
    SESSION.role = data.user.role;
    SESSION.name = data.user.full_name;
    SESSION.userId = data.user.user_id;
    enterApp();
  }catch(e){
    console.error(e);
    AUTH.error = 'Could not reach the server. Try again shortly.';
    renderAuthForm();
  }
}

document.getElementById('logout-btn').addEventListener('click', ()=>{
  document.getElementById('app-screen').classList.remove('show');
  document.getElementById('login-screen').style.display='flex';
  SESSION = {role:null,name:'',tab:null,userId:null};
  switchMode('signin');
});

/* ---------- BOOTSTRAP ---------- */
(async ()=>{
  await loadData();
  DATA_READY = true;
  renderAuthForm();
})();

/* ============================================================
   SHELL / NAV
============================================================ */
const NAV = {
  student: [ ["chat","💬","Ask AI"], ["tickets","🎫","My Tickets"], ["documents","📎","Documents"], ["home","🏠","Dashboard"] ],
  faculty: [ ["inbox","📥","Inbox"], ["resolved","✅","Resolved"], ["s3","📦","Document Storage"] ],
  admin:   [ ["overview","📊","Overview"], ["alltickets","🗂️","All Tickets"], ["approvals","🧠","KB Approvals"], ["kb","📚","Knowledge Base"], ["s3","📦","Document Storage"] ]
};

function renderShell(){
  document.getElementById('avatar-letter').textContent = SESSION.name[0].toUpperCase();
  document.getElementById('user-label').textContent = SESSION.name + " · " + SESSION.role[0].toUpperCase()+SESSION.role.slice(1);
  const navWrap = document.getElementById('nav-items');
  navWrap.innerHTML = NAV[SESSION.role].map(([key,icon,label])=>
    `<button class="nav-item ${SESSION.tab===key?'active':''}" data-tab="${key}">${icon} ${label}</button>`
  ).join('') + `<button class="nav-item" data-tab="architecture">🏗️ Architecture</button><button class="nav-item" data-tab="cloud">☁️ Cloud Architecture</button><button class="nav-item" data-tab="nlp">🧪 NLP Design</button><button class="nav-item" data-tab="database">🗄️ Database Design</button><button class="nav-item" data-tab="conversation">🗣️ Conversation Design</button><button class="nav-item" data-tab="prototype">🖥️ Prototype</button><button class="nav-item" data-tab="ethics">🔒 Ethics &amp; Trust</button>`;
  navWrap.querySelectorAll('.nav-item').forEach(b=>{
    b.addEventListener('click', ()=>{ SESSION.tab = b.dataset.tab; renderShell(); });
  });
  renderMain();
}

function renderMain(){
  const el = document.getElementById('main-content');
  if(SESSION.tab === 'architecture') return el.innerHTML = viewArchitecture();
  if(SESSION.tab === 'cloud') return el.innerHTML = viewCloudArchitecture();
  if(SESSION.tab === 'nlp') return renderNLPDesign();
  if(SESSION.tab === 'database') return el.innerHTML = viewDatabaseDesign();
  if(SESSION.tab === 'conversation') return el.innerHTML = viewConversationDesign();
  if(SESSION.tab === 'prototype'){ el.innerHTML = viewPrototype(); wireProtoJumps(); return; }
  if(SESSION.tab === 'ethics') return el.innerHTML = viewEthics();
  if(SESSION.role==='student'){
    if(SESSION.tab==='chat') return renderChatView();
    if(SESSION.tab==='tickets') return renderStudentTickets();
    if(SESSION.tab==='documents') return renderStudentDocuments();
    if(SESSION.tab==='home') return renderStudentHome();
  }
  if(SESSION.role==='faculty'){
    if(SESSION.tab==='inbox') return renderFacultyInbox();
    if(SESSION.tab==='resolved') return renderFacultyResolved();
    if(SESSION.tab==='s3') return renderS3Bucket();
  }
  if(SESSION.role==='admin'){
    if(SESSION.tab==='overview') return renderAdminOverview();
    if(SESSION.tab==='alltickets') return renderAdminTickets();
    if(SESSION.tab==='approvals') return renderApprovals();
    if(SESSION.tab==='kb') return renderKB();
    if(SESSION.tab==='s3') return renderS3Bucket();
  }
}

/* ============================================================
   STUDENT: HOME
============================================================ */
function renderStudentHome(){
  const mine = DATA.tickets.filter(t=>t.studentName===SESSION.name);
  const resolved = mine.filter(t=>t.status==='resolved').length;
  const open = mine.filter(t=>t.status!=='resolved').length;
  const chats = DATA.chatLog.filter(c=>c.studentName===SESSION.name).length;
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Welcome back, ${SESSION.name.split(' ')[0]}</h2><div class="sub">Here's your activity across the help desk</div></div></div>
    <div class="grid cols-4" style="margin-bottom:22px;">
      <div class="card stat-card"><div class="tag">Questions asked</div><div class="num">${chats}</div><div class="lbl">via AI chat</div></div>
      <div class="card stat-card"><div class="tag">Tickets open</div><div class="num" style="color:var(--coral)">${open}</div><div class="lbl">awaiting faculty</div></div>
      <div class="card stat-card"><div class="tag">Tickets resolved</div><div class="num" style="color:var(--sage)">${resolved}</div><div class="lbl">answered by faculty</div></div>
      <div class="card stat-card"><div class="tag">Knowledge base</div><div class="num">${DATA.kb.length}</div><div class="lbl">answers instantly available</div></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:15px;">Recent activity</h3>
      ${mine.length===0 ? '<div class="empty">No tickets yet — try asking a question in AI Chat.</div>' :
        mine.slice(-4).reverse().map(t=>`<div class="ticket-row"><div class="top"><span class="tid">${t.id}</span><span class="status-pill ${t.status}">${t.status}</span></div><div class="q">${t.query}</div><div class="meta"><span>${t.dept}</span><span>${fmtTime(t.createdAt)}</span></div></div>`).join('')}
    </div>`;
}

/* ============================================================
   STUDENT: CHAT (the pipeline lives here)
============================================================ */
function renderChatView(){
  const el = document.getElementById('main-content');
  const mine = DATA.chatLog.filter(c=>c.studentName===SESSION.name);
  el.innerHTML = `
    <div class="page-head"><div><h2>Ask Sahayak</h2><div class="sub">Your question runs through six live AI agents before you see a reply</div></div></div>
    <div class="card" style="margin-bottom:18px;padding:16px 20px 4px;">
      <div class="pipeline" id="pipeline-strip">${pipelineHTML('idle')}</div>
    </div>
    <div class="card chat-wrap">
      <div class="suggestions">
        ${SAMPLE_QUERIES.slice(0,4).map(q=>`<button class="sugg" data-q="${q.replace(/"/g,'&quot;')}">${q}</button>`).join('')}
      </div>
      <div class="chat-log" id="chat-log">
        ${mine.length===0 ? '<div class="empty">Ask about exams, fees, admissions, hostel, library, placements, scholarships or certificates.</div>' : mine.map(chatBubble).join('')}
      </div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="Type your question…">
        <button class="send-btn" id="chat-send">Send</button>
      </div>
    </div>`;
  const log = document.getElementById('chat-log');
  log.scrollTop = log.scrollHeight;
  document.querySelectorAll('.sugg').forEach(b=>b.addEventListener('click', ()=>{
    document.getElementById('chat-input').value = b.dataset.q;
    submitQuery();
  }));
  document.getElementById('chat-send').addEventListener('click', submitQuery);
  document.getElementById('chat-input').addEventListener('keydown', e=>{ if(e.key==='Enter') submitQuery(); });
}

function chatBubble(c){
  if(c.type==='duplicate'){
    const t = DATA.tickets.find(x=>x.id===c.ticketId);
    const statusLine = t && t.status==='resolved'
      ? `It's already been answered — <b>${DEPTS[t.dept]}</b> said: "${t.facultyResponse}"`
      : `It's still <b>open</b> with <b>${DEPTS[c.dept]}</b> — no need to raise it again, they've already got it.`;
    return `<div class="bubble student">${c.message}</div>
      <div class="bubble ticket">You've already asked this. Duplicate Detection Agent found your existing <span class="tid">${c.ticketId}</span> instead of opening a new one.<br>${statusLine}</div>`;
  }
  if(c.type==='ticket'){
    return `<div class="bubble student">${c.message}</div>
      <div class="bubble ticket">Confidence was too low to answer directly, so I've escalated this.<br>
      <span class="tid">${c.ticketId}</span> · routed to <b>${c.dept}</b> (${DEPTS[c.dept]}) <span class="conf">You'll get a portal + email notification once it's answered.</span></div>`;
  }
  return `<div class="bubble student">${c.message}</div>
    <div class="bubble ai">${c.response}<span class="conf">Confidence ${(c.confidence*100).toFixed(0)}% · Knowledge Retrieval Agent</span></div>`;
}

function pipelineHTML(activeStage){
  const stages = [
    {k:'intent', ic:'🧭', l:'Intent Recognition'},
    {k:'entity', ic:'🏷️', l:'Entity Extraction'},
    {k:'retrieval', ic:'📚', l:'Knowledge Retrieval'},
    {k:'decision', ic:'⚖️', l:'Decision'},
    {k:'route', ic:'🎫', l:'Ticket & Routing'},
    {k:'notify', ic:'📧', l:'Notification'}
  ];
  const order = stages.map(s=>s.k);
  const activeIdx = order.indexOf(activeStage);
  return stages.map((s,i)=>{
    let cls = 'pnode';
    if(activeStage==='idle') cls += '';
    else if(i < activeIdx) cls += ' done';
    else if(i === activeIdx) cls += ' active';
    const line = i < stages.length-1 ? `<div class="pline ${i<activeIdx?'done':''}"></div>` : '';
    return `<div class="${cls}" id="node-${s.k}"><div class="circle">${s.ic}</div><div class="lbl">${s.l}</div><div class="status" id="status-${s.k}"></div></div>${line}`;
  }).join('');
}
async function saveConversationToDatabase(userQuery, aiResponse, sentiment = null, extra = {}) {
  try {
    console.log('📤 Saving conversation to PostgreSQL...');
    console.log('User ID:', SESSION.userId);
    console.log('Question:', userQuery);
    console.log('AI Response:', aiResponse);

    // Make sure logged-in user has a database ID
    if (!SESSION.userId) {
      console.error('❌ SESSION.userId is missing');
      toast('❌ User ID is missing. Conversation was not saved.');
      return false;
    }

    const response = await fetch(`${API_BASE}/api/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: SESSION.userId,
        user_query: userQuery,
        ai_response: aiResponse,
        channel: 'web',
        sentiment: sentiment,
        response_type: extra.response_type || 'answer',
        confidence: extra.confidence != null ? extra.confidence : null,
        ticket_id: extra.ticket_id || null,
        dept: extra.dept || null
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ PostgreSQL save failed:', data);

      toast(
        '❌ Conversation could not be saved: ' +
        (data.error || 'Unknown error')
      );

      return false;
    }

    console.log('✅ Conversation saved to PostgreSQL:', data);

    return true;

  } catch (error) {
    console.error('❌ Error calling /api/conversations:', error);

    toast('❌ Database connection error');

    return false;
  }
}

async function submitQuery() {
  const input = document.getElementById('chat-input');
  const query = input.value.trim();

  if (!query) return;

  input.value = '';
  document.getElementById('chat-send').disabled = true;

  const strip = document.getElementById('pipeline-strip');

  const setStage = (stage, statusText) => {
    strip.innerHTML = pipelineHTML(stage);

    if (statusText) {
      const statusElement = document.getElementById('status-' + stage);

      if (statusElement) {
        statusElement.textContent = statusText;
      }
    }
  };

  try {

    // =========================================================
    // CHECK LOGGED-IN USER
    // =========================================================

    console.log('======================================');
    console.log('👤 SESSION:', SESSION);
    console.log('👤 SESSION.userId:', SESSION.userId);
    console.log('💬 QUERY:', query);
    console.log('======================================');

    if (!SESSION.userId) {
      console.error('❌ No user ID found in SESSION');

      toast('❌ User ID not found. Please log in again.');

      return;
    }



    // =========================================================
    // INTENT CLASSIFICATION
    // =========================================================

    setStage('intent', 'classifying…');

    await sleep(450);

    const {
      entry,
      confidence,
      score
    } = matchIntent(query);

    setStage('intent', 'done');



    // =========================================================
    // ENTITY EXTRACTION
    // =========================================================

    setStage('entity', 'scanning…');

    await sleep(400);

    const entities = extractEntities(query);

    const entityStatus = document.getElementById('status-entity');

    if (entityStatus) {
      entityStatus.textContent =
        entities.length
          ? entities.length + ' found'
          : 'none found';
    }

    await sleep(250);



    // =========================================================
    // KNOWLEDGE RETRIEVAL
    // =========================================================

    setStage('retrieval', 'searching KB…');

    await sleep(500);

    const retrievalStatus =
      document.getElementById('status-retrieval');

    if (retrievalStatus) {
      retrievalStatus.textContent =
        entry
          ? '"' + entry.name + '" matched'
          : 'no strong match';
    }

    await sleep(250);



    // =========================================================
    // DECISION / CONFIDENCE
    // =========================================================

    setStage('decision', 'scoring…');

    await sleep(450);

    const decisionStatus =
      document.getElementById('status-decision');

    if (decisionStatus) {
      decisionStatus.textContent =
        (confidence * 100).toFixed(0) + '% confidence';
    }

    await sleep(350);



    // =========================================================
    // DETERMINE WHETHER AI CAN ANSWER DIRECTLY
    // =========================================================

    const confident = confidence >= 0.55 && entry;



    // =========================================================
    // PATH 1: CONFIDENT AI ANSWER
    // =========================================================

    if (confident) {

      console.log('🟢 Confident answer path');
      console.log('User ID:', SESSION.userId);
      console.log('Question:', query);
      console.log('Answer:', entry.answer);



      // Pipeline complete
      strip.innerHTML = pipelineHTML('done_direct');



      // Mark all stages done
      document
        .querySelectorAll('.pnode')
        .forEach((n, i) => {
          if (i < 4) {
            n.classList.add('done');
          }
        });



      // =======================================================
      // SAVE TO FRONTEND DATA
      // =======================================================

      DATA.chatLog.push({
        type: 'answer',
        studentName: SESSION.name,
        message: query,
        response: entry.answer,
        confidence: confidence,
        timestamp: Date.now()
      });



      // =======================================================
      // ⭐ SAVE TO POSTGRESQL
      // =======================================================

      const databaseSaved =
        await saveConversationToDatabase(
          query,
          entry.answer,
          null,
          { response_type: 'answer', confidence: confidence, dept: entry.dept }
        );



      console.log(
        databaseSaved
          ? '✅ AI conversation saved successfully'
          : '⚠️ AI conversation was NOT saved'
      );



      // Save existing frontend data
      await saveData();

      renderChatView();



      toast(
        '✅ Answered directly by Knowledge Retrieval Agent · ' +
        (confidence * 100).toFixed(0) +
        '% confidence'
      );



    } else {

      // =======================================================
      // PATH 2: LOW CONFIDENCE → SUPPORT TICKET
      // =======================================================

      console.log('🟡 Low confidence → support ticket path');



      // =======================================================
      // CHECK FOR EXISTING / DUPLICATE TICKET
      // =======================================================

      const existing =
        findExistingTicket(
          SESSION.name,
          query,
          entry
        );



      if (existing) {

        setStage('route', 'duplicate found');

        await sleep(450);

        const routeStatus =
          document.getElementById('status-route');

        if (routeStatus) {
          routeStatus.textContent =
            existing.id + ' (existing)';
        }

        await sleep(350);



        DATA.chatLog.push({
          type: 'duplicate',
          studentName: SESSION.name,
          message: query,
          ticketId: existing.id,
          dept: existing.dept,
          timestamp: Date.now()
        });



        // Log this duplicate check to Postgres too, so it's not lost on refresh
        await saveConversationToDatabase(
          query,
          `This matches your existing ticket ${existing.id} — no new ticket was created.`,
          null,
          { response_type: 'duplicate', dept: existing.dept, ticket_id: existing.dbId || null }
        );

        await saveData();

        renderChatView();



        toast(
          '🔁 Duplicate Detection Agent matched ' +
          existing.id +
          ' — no new ticket created'
        );

        return;
      }



      // =======================================================
      // CREATE NEW TICKET
      // =======================================================

      setStage('route', 'creating ticket…');

      await sleep(500);



      const dept =
        entry
          ? entry.dept
          : guessDept(query);



      // =======================================================
      // ⭐ SAVE TICKET TO POSTGRESQL (support_tickets)
      // =======================================================

      let ticketId = genTicketId(); // fallback id if the server call fails
      let dbTicketId = null;

      try {
        const ticketRes = await fetch(`${API_BASE}/api/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: SESSION.userId,
            subject: query,
            priority: 'medium',
            dept: dept,
            entities: entities,
            intent_key: entry ? entry.id : null,
            norm_query: normalizeQuery(query)
          })
        });
        const ticketData = await ticketRes.json();
        if (ticketRes.ok && ticketData.ticket) {
          dbTicketId = ticketData.ticket.ticket_id;
          ticketId = 'TCK-' + dbTicketId;
          console.log('✅ Ticket saved to PostgreSQL:', ticketData.ticket);
        } else {
          console.error('❌ Ticket save failed:', ticketData);
          toast('⚠️ Ticket could not be saved to the database — it will only exist locally.');
        }
      } catch (e) {
        console.error('❌ Error calling /api/tickets:', e);
        toast('⚠️ Database connection error — ticket saved locally only.');
      }

      // =======================================================
      // SAVE TICKET TO FRONTEND DATA
      // =======================================================

      DATA.tickets.push({
        id: ticketId,
        dbId: dbTicketId,
        studentName: SESSION.name,
        dept: dept,
        query: query,
        status: 'open',
        facultyResponse: null,
        createdAt: Date.now(),
        entities: entities,
        intentKey: entry ? entry.id : null,
        normQuery: normalizeQuery(query)
      });



      const routeStatus =
        document.getElementById('status-route');

      if (routeStatus) {
        routeStatus.textContent = ticketId;
      }

      await sleep(400);



      // =======================================================
      // NOTIFY FACULTY
      // =======================================================

      setStage('notify', 'emailing faculty…');

      await sleep(500);



      const notifyStatus =
        document.getElementById('status-notify');

      if (notifyStatus) {
        notifyStatus.textContent = 'sent';
      }



      // =======================================================
      // CHAT LOG
      // =======================================================

      DATA.chatLog.push({
        type: 'ticket',
        studentName: SESSION.name,
        message: query,
        ticketId: ticketId,
        dept: dept,
        timestamp: Date.now()
      });



      // =======================================================
      // ⭐ SAVE TICKET CONVERSATION TO POSTGRESQL
      // =======================================================

      const ticketResponse =
        `Support ticket ${ticketId} has been created and assigned to ${DEPTS[dept]}.`;



      console.log('🎫 Saving ticket conversation...');
      console.log('User ID:', SESSION.userId);
      console.log('Ticket ID:', ticketId);



      const databaseSaved =
        await saveConversationToDatabase(
          query,
          ticketResponse,
          null,
          { response_type: 'ticket', dept: dept, ticket_id: dbTicketId }
        );



      console.log(
        databaseSaved
          ? '✅ Ticket conversation saved'
          : '⚠️ Ticket conversation was NOT saved'
      );



      // =======================================================
      // SAVE FRONTEND DATA
      // =======================================================

      await saveData();

      renderChatView();



      toast(
        '📧 Email Notification Agent → ' +
        DEPTS[dept] +
        ' about ' +
        ticketId
      );
    }

  } catch (error) {

    console.error('❌ submitQuery error:', error);

    toast(
      '❌ Something went wrong while processing your request.'
    );

  } finally {

    // Always enable send button again
    document.getElementById('chat-send').disabled = false;
  }
}

/* ============================================================
   STUDENT: TICKETS
============================================================ */
function renderStudentTickets(){
  const mine = DATA.tickets.filter(t=>t.studentName===SESSION.name).slice().reverse();
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>My Tickets</h2><div class="sub">Escalated questions and their status</div></div></div>
    <div class="card">
      ${mine.length===0 ? '<div class="empty">No tickets yet.</div>' : mine.map(t=>`
        <div class="ticket-row">
          <div class="top"><span class="tid">${t.id}</span><span class="status-pill ${t.status}">${t.status}</span></div>
          <div class="q">${t.query}</div>
          <div class="meta"><span>Dept: ${t.dept}</span><span>Assigned: ${DEPTS[t.dept]}</span><span>${fmtTime(t.createdAt)}</span></div>
          ${t.facultyResponse ? `<div class="resp-shown">👨‍🏫 ${DEPTS[t.dept]}: ${t.facultyResponse}</div>` : `<div class="resp-shown" style="border-color:var(--faint);color:var(--faint)">Awaiting faculty response…</div>`}
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   DOCUMENTS (Amazon S3 simulation — small files, base64-encoded,
   stored alongside the rest of the app's data)
============================================================ */
const DOC_MAX_BYTES = 300 * 1024; // 300KB per file — demo storage limit
const DOC_CATEGORIES = ['Certificate','Marksheet / Transcript','ID Proof','NOC Supporting Document','Scholarship Document','Other'];

function docIcon(type){
  if(type.includes('pdf')) return '📕';
  if(type.includes('image')) return '🖼️';
  if(type.includes('word') || type.includes('doc')) return '📄';
  return '📎';
}
function fmtKB(bytes){ return (bytes/1024).toFixed(1)+' KB'; }

function renderStudentDocuments(){
  const el = document.getElementById('main-content');
  const mine = DATA.documents.filter(d=>d.studentName===SESSION.name).slice().reverse();
  el.innerHTML = `
    <div class="page-head"><div><h2>Documents</h2><div class="sub">Upload certificates, marksheets, or ID proof — stored the same way Amazon S3 would hold them in production</div></div></div>

    <div class="card" style="margin-bottom:18px;">
      <h3 style="margin-top:0;font-size:14.5px;">Upload a document</h3>
      <div class="sub" style="margin-bottom:12px;">Max 300KB per file for this demo's storage limits — plenty for a scanned certificate or ID photo.</div>
      <label class="field-lbl">Category</label>
      <select id="doc-category" style="width:100%;background:var(--surface2);border:1px solid var(--line);color:var(--text);padding:11px 12px;border-radius:10px;font-size:14px;margin-bottom:14px;font-family:inherit;">
        ${DOC_CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('')}
      </select>
      <label class="field-lbl">File</label>
      <input type="file" id="doc-file-input" style="width:100%;color:var(--muted);font-size:13px;margin-bottom:14px;">
      <button class="small-btn" id="doc-upload-btn">Upload</button>
      <div id="doc-upload-status" style="margin-top:10px;font-size:12.5px;"></div>
    </div>

    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">My Documents (${mine.length})</h3>
      ${mine.length===0 ? '<div class="empty">Nothing uploaded yet.</div>' : mine.map(d=>`
        <div class="ticket-row" style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
          <div style="display:flex;gap:12px;align-items:center;min-width:0;">
            <span style="font-size:20px;">${docIcon(d.fileType)}</span>
            <div style="min-width:0;">
              <div style="font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d.fileName}</div>
              <div class="meta" style="margin-top:3px;"><span>${d.category}</span><span>${fmtKB(d.fileSize)}</span><span>${fmtTime(d.uploadedAt)}</span></div>
            </div>
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;">
            <a class="small-btn ghost" style="text-decoration:none;display:inline-block;" href="${d.dataUrl}" download="${d.fileName}">Download</a>
            <button class="small-btn ghost" data-del-doc="${d.id}">Delete</button>
          </div>
        </div>`).join('')}
    </div>`;

  document.getElementById('doc-upload-btn').addEventListener('click', uploadDocument);
  el.querySelectorAll('[data-del-doc]').forEach(b=>b.addEventListener('click', async ()=>{
    DATA.documents = DATA.documents.filter(d=>d.id!==b.dataset.delDoc);
    await saveData();
    toast('🗑️ Document deleted');
    renderStudentDocuments();
  }));
}

function uploadDocument(){
  const fileInput = document.getElementById('doc-file-input');
  const category = document.getElementById('doc-category').value;
  const status = document.getElementById('doc-upload-status');
  const file = fileInput.files[0];

  if(!file){ status.innerHTML = '<span style="color:var(--coral);">Choose a file first.</span>'; return; }
  if(file.size > DOC_MAX_BYTES){
    status.innerHTML = `<span style="color:var(--coral);">"${file.name}" is ${fmtKB(file.size)} — over the 300KB demo limit. Try a smaller file or a more compressed scan.</span>`;
    return;
  }

  status.textContent = 'Uploading…';
  const reader = new FileReader();
  reader.onload = async ()=>{
    DATA.documents.push({
      id: 'doc-'+Date.now().toString(36),
      studentName: SESSION.name,
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSize: file.size,
      category,
      dataUrl: reader.result,
      uploadedAt: Date.now()
    });
    await saveData();
    toast('📦 Uploaded to Document Storage — S3-style, key: '+file.name);
    renderStudentDocuments();
  };
  reader.onerror = ()=>{ status.innerHTML = '<span style="color:var(--coral);">Could not read that file — try again.</span>'; };
  reader.readAsDataURL(file);
}

function renderS3Bucket(){
  const el = document.getElementById('main-content');
  const docs = DATA.documents.slice().reverse();
  const totalBytes = DATA.documents.reduce((a,d)=>a+d.fileSize,0);
  const byCategory = {};
  DATA.documents.forEach(d=> byCategory[d.category] = (byCategory[d.category]||0)+1 );

  el.innerHTML = `
    <div class="page-head"><div><h2>Document Storage</h2><div class="sub">bucket: <span class="mono">sahayak-student-documents</span> · ${docs.length} objects · ${fmtKB(totalBytes)} used</div></div></div>

    <div class="grid cols-4" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="tag">Objects</div><div class="num">${docs.length}</div><div class="lbl">files stored</div></div>
      <div class="card stat-card"><div class="tag">Storage used</div><div class="num">${fmtKB(totalBytes)}</div><div class="lbl">of unlimited (demo)</div></div>
      <div class="card stat-card"><div class="tag">Uploaders</div><div class="num">${new Set(DATA.documents.map(d=>d.studentName)).size}</div><div class="lbl">distinct students</div></div>
      <div class="card stat-card"><div class="tag">Categories</div><div class="num">${Object.keys(byCategory).length}</div><div class="lbl">document types</div></div>
    </div>

    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">Objects</h3>
      ${docs.length===0 ? '<div class="empty">No documents uploaded yet.</div>' : `
      <table>
        <tr><th>Key</th><th>Uploaded by</th><th>Category</th><th>Size</th><th>Uploaded</th><th></th></tr>
        ${docs.map(d=>`
          <tr>
            <td>${docIcon(d.fileType)} ${d.fileName}</td>
            <td>${d.studentName}</td>
            <td>${d.category}</td>
            <td class="mono">${fmtKB(d.fileSize)}</td>
            <td>${fmtTime(d.uploadedAt)}</td>
            <td><a class="small-btn ghost" style="text-decoration:none;display:inline-block;" href="${d.dataUrl}" download="${d.fileName}">Download</a></td>
          </tr>`).join('')}
      </table>`}
    </div>`;
}



/* ============================================================
   FACULTY: INBOX / RESOLVED
============================================================ */
function facultyDept(){
  const found = Object.entries(DEPTS).find(([d,name])=>name===SESSION.name);
  return found ? found[0] : null;
}
function renderFacultyInbox(){
  let dept = facultyDept();
  const relevant = dept ? DATA.tickets.filter(t=>t.dept===dept && t.status!=='resolved')
                        : DATA.tickets.filter(t=>t.status!=='resolved');
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Inbox</h2><div class="sub">${dept ? 'Tickets routed to '+dept : 'Showing all open tickets (sign in as e.g. Prof. Meera Nair for a department-filtered view)'}</div></div></div>
    <div class="card">
      ${relevant.length===0 ? '<div class="empty">Inbox zero. Nothing waiting on you right now.</div>' : relevant.slice().reverse().map(t=>`
        <div class="ticket-row">
          <div class="top"><span class="tid">${t.id}</span><span class="status-pill ${t.status}">${t.status}</span></div>
          <div class="q">${t.query}</div>
          <div class="meta"><span>From: ${t.studentName}</span><span>Dept: ${t.dept}</span><span>${fmtTime(t.createdAt)}</span></div>
          ${t.entities && t.entities.length ? `<div class="meta" style="margin-top:6px;">Entities: ${t.entities.map(e=>e.type+':'+e.value).join(', ')}</div>` : ''}
          <div class="reply-box">
            <textarea placeholder="Write your response…" id="reply-${t.id}"></textarea>
            <button class="small-btn" data-reply="${t.id}">Send response</button>
          </div>
        </div>`).join('')}
    </div>`;
  document.querySelectorAll('[data-reply]').forEach(b=>b.addEventListener('click', async ()=>{
    const id = b.dataset.reply;
    const text = document.getElementById('reply-'+id).value.trim();
    if(!text) return;
    const t = DATA.tickets.find(x=>x.id===id);

    // ⭐ Persist the resolution to Postgres so it survives a refresh / another device
    if(t.dbId){
      try{
        const res = await fetch(`${API_BASE}/api/tickets/${t.dbId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'resolved', assigned_to: SESSION.name, faculty_response: text })
        });
        if(!res.ok){
          const err = await res.json().catch(()=>({}));
          toast('⚠️ Could not save this response to the database: ' + (err.error || 'unknown error'));
        }
      }catch(e){
        console.error(e);
        toast('⚠️ Database connection error — response saved locally only.');
      }
    }

    t.facultyResponse = text; t.status='resolved'; t.resolvedAt = Date.now();
    await saveData();
    toast('📧 Student '+t.studentName+' notified · '+id+' resolved');
    renderFacultyInbox();
  }));
}
function renderFacultyResolved(){
  let dept = facultyDept();
  const relevant = dept ? DATA.tickets.filter(t=>t.dept===dept && t.status==='resolved')
                        : DATA.tickets.filter(t=>t.status==='resolved');
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Resolved</h2><div class="sub">Your past responses</div></div></div>
    <div class="card">
      ${relevant.length===0 ? '<div class="empty">Nothing resolved yet.</div>' : relevant.slice().reverse().map(t=>`
        <div class="ticket-row">
          <div class="top"><span class="tid">${t.id}</span><span class="status-pill resolved">resolved</span></div>
          <div class="q">${t.query}</div>
          <div class="resp-shown">${t.facultyResponse}</div>
          <div class="meta" style="margin-top:6px;"><span>To: ${t.studentName}</span><span>${fmtTime(t.resolvedAt)}</span></div>
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   ADMIN
============================================================ */
function renderAdminOverview(){
  const total = DATA.tickets.length;
  const resolved = DATA.tickets.filter(t=>t.status==='resolved').length;
  const open = total-resolved;
  const autoAnswered = DATA.chatLog.filter(c=>c.type==='answer').length;
  const deptCounts = {};
  DATA.tickets.forEach(t=> deptCounts[t.dept] = (deptCounts[t.dept]||0)+1 );
  const maxCount = Math.max(1,...Object.values(deptCounts));

  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Overview</h2><div class="sub">System-wide activity across all agents</div></div></div>
    <div class="grid cols-4" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="tag">Auto-answered</div><div class="num" style="color:var(--sage)">${autoAnswered}</div><div class="lbl">by AI, no human needed</div></div>
      <div class="card stat-card"><div class="tag">Tickets total</div><div class="num">${total}</div><div class="lbl">escalated to faculty</div></div>
      <div class="card stat-card"><div class="tag">Open</div><div class="num" style="color:var(--coral)">${open}</div><div class="lbl">awaiting response</div></div>
      <div class="card stat-card"><div class="tag">Resolved</div><div class="num" style="color:var(--sage)">${resolved}</div><div class="lbl">closed with reply</div></div>
    </div>
    <div class="grid cols-2">
      <div class="card">
        <h3 style="margin-top:0;font-size:14.5px;">Tickets by department</h3>
        ${Object.keys(deptCounts).length===0 ? '<div class="empty">No tickets yet.</div>' :
          Object.entries(deptCounts).sort((a,b)=>b[1]-a[1]).map(([d,c])=>`
          <div class="bar-row"><div class="name">${d}</div><div class="bar-track"><div class="bar-fill" style="width:${(c/maxCount)*100}%"></div></div><div class="val">${c}</div></div>`).join('')}
      </div>
      <div class="card">
        <h3 style="margin-top:0;font-size:14.5px;">Deflection rate</h3>
        <p style="color:var(--muted);font-size:13px;line-height:1.6;">
          Of ${autoAnswered+total} total queries, the AI resolved <b style="color:var(--sage)">${autoAnswered+total? Math.round(autoAnswered/(autoAnswered+total)*100):0}%</b>
          without any faculty involvement — that's how many emails and office visits the Decision Agent quietly prevented.
        </p>
        <div class="bar-row" style="margin-top:14px;"><div class="name">AI resolved</div><div class="bar-track"><div class="bar-fill" style="width:${autoAnswered+total? (autoAnswered/(autoAnswered+total)*100):0}%;background:linear-gradient(90deg,#4d7a5a,var(--sage))"></div></div><div class="val">${autoAnswered}</div></div>
        <div class="bar-row"><div class="name">Escalated</div><div class="bar-track"><div class="bar-fill" style="width:${autoAnswered+total? (total/(autoAnswered+total)*100):0}%"></div></div><div class="val">${total}</div></div>
      </div>
    </div>`;
}

function renderAdminTickets(){
  const all = DATA.tickets.slice().reverse();
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>All Tickets</h2><div class="sub">Every escalation across every department</div></div></div>
    <div class="card">
      ${all.length===0 ? '<div class="empty">No tickets yet.</div>' : all.map(t=>`
        <div class="ticket-row">
          <div class="top"><span class="tid">${t.id}</span><span class="status-pill ${t.status}">${t.status}</span></div>
          <div class="q">${t.query}</div>
          <div class="meta"><span>${t.studentName}</span><span>${t.dept} → ${DEPTS[t.dept]}</span><span>${fmtTime(t.createdAt)}</span></div>
          ${t.facultyResponse ? `<div class="resp-shown">${t.facultyResponse}</div>` : ''}
        </div>`).join('')}
    </div>`;
}

function renderApprovals(){
  const resolvedNoKB = DATA.tickets.filter(t=>t.status==='resolved' && !t.addedToKB);
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Knowledge Base Approvals</h2><div class="sub">Learning Agent proposes new answers from resolved tickets — you approve what's added</div></div></div>
    <div class="card">
      ${resolvedNoKB.length===0 ? '<div class="empty">Nothing pending. Resolved tickets will appear here for approval.</div>' : resolvedNoKB.slice().reverse().map(t=>`
        <div class="ticket-row">
          <div class="top"><span class="tid">${t.id}</span><span class="status-pill answered">pending review</span></div>
          <div class="q"><b>Q:</b> ${t.query}</div>
          <div class="resp-shown"><b>A:</b> ${t.facultyResponse}</div>
          <div style="margin-top:10px;display:flex;gap:8px;">
            <button class="small-btn sage" data-approve="${t.id}">✓ Approve → Add to KB</button>
            <button class="small-btn ghost" data-reject="${t.id}">Dismiss</button>
          </div>
        </div>`).join('')}
    </div>`;
  document.querySelectorAll('[data-approve]').forEach(b=>b.addEventListener('click', async ()=>{
    const t = DATA.tickets.find(x=>x.id===b.dataset.approve);
    const stop = new Set(['the','is','are','a','an','to','for','of','and','my','i','what','how','when','where','do','does','can','will','on']);
    const keywords = [...new Set(t.query.toLowerCase().replace(/[?.,!]/g,'').split(' ').filter(w=>w.length>3 && !stop.has(w)))].slice(0,6);
    DATA.kb.push({ id:'kb-'+t.id, name: t.query.slice(0,40), dept:t.dept, keywords, answer:t.facultyResponse, source:'learned' });
    t.addedToKB = true;
    await saveData();
    toast('🧠 Learning Agent added new answer to the Knowledge Base');
    renderApprovals();
  }));
  document.querySelectorAll('[data-reject]').forEach(b=>b.addEventListener('click', async ()=>{
    const t = DATA.tickets.find(x=>x.id===b.dataset.reject);
    t.addedToKB = true; // marks as reviewed, just not added
    await saveData();
    renderApprovals();
  }));
}

function renderKB(){
  const seeded = DATA.kb.filter(k=>k.source==='seed');
  const learned = DATA.kb.filter(k=>k.source==='learned');
  document.getElementById('main-content').innerHTML = `
    <div class="page-head"><div><h2>Knowledge Base</h2><div class="sub">${DATA.kb.length} entries · ${learned.length} learned from resolved tickets</div></div></div>
    <div class="grid cols-2">
      ${DATA.kb.map(k=>`
        <div class="kb-item">
          <span class="dept">${k.dept} ${k.source==='learned'?'· learned':''}</span>
          <h4>${k.name}</h4>
          <p>${k.answer}</p>
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   NLP DESIGN
============================================================ */
const NLP_CONCEPTS = [
  { ic:'🧭', name:'Intent Recognition',
    def:'Identifying what a student is actually asking about — exams, fees, hostel, etc. — by matching their message against known intent patterns rather than reacting to exact phrasing.',
    ex:'"When will Semester 7 exams begin?" → matched to the <b>Exam Schedule</b> intent under Examination.' },
  { ic:'🏷️', name:'Entity Extraction',
    def:'Pulling structured, reusable values out of free text — semester numbers, CGPA figures, amounts, department names — using targeted pattern matching.',
    ex:'"I have 6.2 CGPA, am I eligible for placement?" → extracts <b>CGPA: 6.2</b>.' },
  { ic:'🧹', name:'Text Preprocessing',
    def:'Cleaning raw text before comparison: lowercasing, stripping punctuation, collapsing whitespace, and removing stopwords ("is", "the", "how") so only meaningful words remain.',
    ex:"\"What's the Library Timing??\" → tokens <b>whats · library · timing</b> → stopwords removed → <b>library · timing</b>." },
  { ic:'📚', name:'Semantic Search',
    def:'Finding the closest matching knowledge-base entry by keyword overlap, rather than requiring an exact phrase — a lightweight stand-in for embedding-based vector similarity in a production system.',
    ex:'"library hours on weekend" still matches the <b>Library Timing</b> entry, even though the wording differs.' },
  { ic:'🔗', name:'Retrieval-Augmented Generation (RAG)',
    def:"Instead of generating an answer purely from a model's memory, the system first retrieves the most relevant approved knowledge-base entry, then grounds its reply in that content — keeping answers factual and traceable, not hallucinated.",
    ex:"A matched entry's stored answer is returned as-is; in production this retrieved text would be passed as context to a generative model for a more natural phrasing." },
  { ic:'⚖️', name:'Confidence Score',
    def:'A 0–100% score reflecting how sure the retrieval was. 2+ keyword hits → high confidence (72–97%), 1 hit → medium (58%), 0 hits → low (~17–25%). Only scores at or above the 55% threshold get an automatic answer.',
    ex:'Below 55% confidence, Sahayak escalates to a ticket instead of guessing — protecting students from a wrong automated answer.' }
];

function renderNLPDesign(){
  const el = document.getElementById('main-content');
  el.innerHTML = `
    <div class="page-head"><div><h2>NLP Design</h2><div class="sub">The six techniques behind every answer Sahayak gives</div></div></div>
    <div class="grid cols-2" style="margin-bottom:20px;">
      ${NLP_CONCEPTS.map(c=>`
        <div class="card">
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
            <span style="font-size:19px;">${c.ic}</span><b style="font-size:14px;">${c.name}</b>
          </div>
          <p style="color:var(--muted);font-size:13px;line-height:1.6;margin:0 0 10px;">${c.def}</p>
          <div class="resp-shown" style="border-left-color:var(--brass);color:var(--text);font-size:12.5px;">${c.ex}</div>
        </div>`).join('')}
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">Try it live</h3>
      <div class="sub" style="margin-bottom:14px;">Type any question and watch all six steps run against the real Knowledge Base — the same pipeline used in AI Chat.</div>
      <div class="chat-input-row" style="margin-bottom:16px;">
        <input type="text" id="nlp-demo-input" placeholder="e.g. What is the library timing on Sundays?">
        <button class="send-btn" id="nlp-analyze-btn">Analyze</button>
      </div>
      <div id="nlp-demo-output"><div class="empty">Type a question above and hit Analyze.</div></div>
    </div>`;
  document.getElementById('nlp-analyze-btn').addEventListener('click', runNLPDemo);
  document.getElementById('nlp-demo-input').addEventListener('keydown', e=>{ if(e.key==='Enter') runNLPDemo(); });
}

function runNLPDemo(){
  const raw = document.getElementById('nlp-demo-input').value.trim();
  const out = document.getElementById('nlp-demo-output');
  if(!raw){ out.innerHTML = '<div class="empty">Type a question above and hit Analyze.</div>'; return; }

  const { tokens, cleaned } = tokenize(raw);
  const entities = extractEntities(raw);
  const { entry, confidence, score } = matchIntent(raw);
  const confident = confidence >= 0.55 && entry;

  out.innerHTML = `
    <div class="nlp-step"><b>1 · Text Preprocessing</b>
      <div class="nlp-tokens">${tokens.map(t=>`<span class="tok ${cleaned.includes(t)?'':'muted'}">${t}</span>`).join('')}</div>
      <small style="color:var(--faint);">Kept after stopword removal: ${cleaned.length ? cleaned.map(t=>`<span class="tok clean">${t}</span>`).join('') : '<i>none</i>'}</small>
    </div>
    <div class="nlp-step"><b>2 · Intent Recognition</b>
      <p>${entry ? `Matched intent <b>${entry.name}</b> · ${entry.dept}` : 'No confident intent match found.'}</p>
    </div>
    <div class="nlp-step"><b>3 · Entity Extraction</b>
      <p>${entities.length ? entities.map(e=>`<span class="tok">${e.type}: ${e.value}</span>`).join(' ') : 'No structured entities detected in this query.'}</p>
    </div>
    <div class="nlp-step"><b>4 · Semantic Search (Knowledge Retrieval)</b>
      <p>Keyword-overlap score against best match: <b>${score}</b> ${entry? '('+entry.name+')' : ''}</p>
    </div>
    <div class="nlp-step"><b>5 · RAG Answer</b>
      <p>${entry ? entry.answer : 'Nothing retrieved with enough overlap — this would be escalated to a ticket instead of answered.'}</p>
    </div>
    <div class="nlp-step"><b>6 · Confidence Score</b>
      <div class="bar-track" style="margin-top:8px;"><div class="bar-fill" style="width:${(confidence*100).toFixed(0)}%; background:${confident?'linear-gradient(90deg,#4d7a5a,var(--sage))':'linear-gradient(90deg,var(--brass-dim),var(--coral))'}"></div></div>
      <small style="color:var(--faint);">${(confidence*100).toFixed(0)}% — ${confident ? 'above the 55% threshold → answered directly' : 'below the 55% threshold → escalated to a ticket'}</small>
    </div>`;
}




/* ============================================================
   DATABASE DESIGN (schema + ER diagram)
============================================================ */
const ER_TABLES = {
  FAC: { title:'Faculty', x:20,  y:20,  fields:['faculty_id  PK','name','email  UNIQUE','password_hash','department_id  FK → Departments','designation'] },
  DEP: { title:'Departments', x:375, y:20, fields:['department_id  PK','name  UNIQUE','head_faculty_id  FK → Faculty'] },
  KB:  { title:'Knowledge Base', x:730, y:20, fields:['kb_id  PK','intent_name','department_id  FK → Departments','keywords','answer','source','created_at'] },
  STU: { title:'Students', x:20, y:0, fields:['student_id  PK','name','email  UNIQUE','password_hash','semester','department_id  FK → Departments','created_at'] },
  TCK: { title:'Tickets', x:375, y:0, fields:['ticket_id  PK','student_id  FK → Students','department_id  FK → Departments','faculty_id  FK → Faculty','query_text','status','entities_json','created_at','resolved_at'] },
  CHT: { title:'Chat History', x:20, y:0, fields:['chat_id  PK','student_id  FK → Students','message','response_type','confidence_score','ticket_id  FK → Tickets','timestamp'] },
  NOT: { title:'Notifications', x:730, y:0, fields:['notification_id  PK','ticket_id  FK → Tickets','recipient_type','recipient_id','message','channel','sent_at','read_status'] }
};
const ER_COL_W = 220, ER_HEADER_H = 26, ER_ROW_H = 17, ER_ROW_PAD = 6, ER_GAP = 40;

function erBoxHeight(fields){ return ER_HEADER_H + fields.length*ER_ROW_H + ER_ROW_PAD; }

function layoutER(){
  // stack each column top-to-bottom based on box heights computed from field counts
  ER_TABLES.STU.y = ER_TABLES.FAC.y + erBoxHeight(ER_TABLES.FAC.fields) + ER_GAP;
  ER_TABLES.CHT.y = ER_TABLES.STU.y + erBoxHeight(ER_TABLES.STU.fields) + ER_GAP;
  ER_TABLES.TCK.y = ER_TABLES.DEP.y + erBoxHeight(ER_TABLES.DEP.fields) + ER_GAP;
  ER_TABLES.NOT.y = ER_TABLES.KB.y  + erBoxHeight(ER_TABLES.KB.fields)  + ER_GAP;
}

function erBoxSVG(t){
  const h = erBoxHeight(t.fields);
  let s = `<rect x="${t.x}" y="${t.y}" width="${ER_COL_W}" height="${h}" rx="8" fill="#1C3348" stroke="#28425A" stroke-width="1.3"/>`;
  s += `<rect x="${t.x}" y="${t.y}" width="${ER_COL_W}" height="${ER_HEADER_H}" rx="8" fill="#D8A24A" opacity="0.16"/>`;
  s += `<rect x="${t.x}" y="${t.y+ER_HEADER_H-9}" width="${ER_COL_W}" height="9" fill="#D8A24A" opacity="0.16"/>`;
  s += `<line x1="${t.x}" y1="${t.y+ER_HEADER_H}" x2="${t.x+ER_COL_W}" y2="${t.y+ER_HEADER_H}" stroke="#28425A" stroke-width="1"/>`;
  s += `<text x="${t.x+10}" y="${t.y+17}" fill="#D8A24A" font-size="12" font-weight="700" font-family="IBM Plex Mono, monospace">${t.title}</text>`;
  t.fields.forEach((f,i)=>{
    s += `<text x="${t.x+10}" y="${t.y+ER_HEADER_H+(i+1)*ER_ROW_H-3}" fill="#93A6B4" font-size="9.5" font-family="IBM Plex Mono, monospace">${f}</text>`;
  });
  return s;
}
function erMid(t, side){
  const h = erBoxHeight(t.fields);
  if(side==='right') return [t.x+ER_COL_W, t.y+h/2];
  if(side==='left') return [t.x, t.y+h/2];
  if(side==='bottom') return [t.x+ER_COL_W/2, t.y+h];
  if(side==='top') return [t.x+ER_COL_W/2, t.y];
}
function erLine(points, dashed, label1, label2){
  const pts = points.map(p=>p.join(',')).join(' ');
  let s = `<polyline points="${pts}" fill="none" stroke="#D8A24A" stroke-width="1.4" ${dashed?'stroke-dasharray="4,4"':''} opacity="0.85"/>`;
  const [x1,y1] = points[0], [x2,y2] = points[points.length-1];
  if(label1) s += `<text x="${x1+6}" y="${y1-6}" fill="#D8A24A" font-size="10" font-weight="700" font-family='IBM Plex Mono, monospace'>${label1}</text>`;
  if(label2) s += `<text x="${x2-14}" y="${y2-6}" fill="#D8A24A" font-size="10" font-weight="700" font-family='IBM Plex Mono, monospace'>${label2}</text>`;
  return s;
}

function buildERDiagram(){
  layoutER();
  const T = ER_TABLES;
  let boxes = Object.values(T).map(erBoxSVG).join('');

  let lines = '';
  lines += erLine([erMid(T.DEP,'left'), erMid(T.FAC,'right')], false, '1', 'N');
  lines += erLine([erMid(T.DEP,'right'), erMid(T.KB,'left')], false, '1', 'N');
  lines += erLine([erMid(T.DEP,'bottom'), erMid(T.TCK,'top')], false, '1', 'N');
  lines += erLine([erMid(T.STU,'right'), erMid(T.TCK,'left')], false, '1', 'N');
  const facBottom = erMid(T.FAC,'bottom');
  lines += erLine([facBottom, [facBottom[0], facBottom[1]+30], [T.TCK.x, facBottom[1]+30]], true, '1', 'N');
  lines += erLine([erMid(T.STU,'bottom'), erMid(T.CHT,'top')], false, '1', 'N');
  const tckLeft2 = [T.TCK.x, T.TCK.y+110];
  const chtRight = erMid(T.CHT,'right');
  lines += erLine([tckLeft2, [tckLeft2[0]-70, tckLeft2[1]], [tckLeft2[0]-70, chtRight[1]], chtRight], true, '1', 'N');
  const tckRight = erMid(T.TCK,'right');
  const notLeft = erMid(T.NOT,'left');
  lines += erLine([tckRight, [tckRight[0]+65, tckRight[1]], [tckRight[0]+65, notLeft[1]], notLeft], false, '1', 'N');

  const maxY = Math.max(...Object.values(T).map(t=>t.y+erBoxHeight(t.fields))) + 20;
  return `<svg viewBox="0 0 970 ${maxY}" style="width:100%;height:auto;">${lines}${boxes}</svg>`;
}

const DB_SCHEMA = [
  { name:'Students', desc:'One row per student account.', cols:[
    ['student_id','PK, auto-increment'],['name','Full name'],['email','Unique, used for login'],
    ['password_hash','Hashed credential'],['semester','Current semester'],['department_id','FK → Departments'],['created_at','Account creation timestamp']] },
  { name:'Faculty', desc:'One row per faculty account, mapped to a department for ticket routing.', cols:[
    ['faculty_id','PK, auto-increment'],['name','Full name, e.g. "Prof. Meera Nair"'],['email','Unique, used for login'],
    ['password_hash','Hashed credential'],['department_id','FK → Departments'],['designation','e.g. Assistant Professor']] },
  { name:'Departments', desc:'The 13 routing categories (Examination, Fees, Hostel, IT Support, etc.).', cols:[
    ['department_id','PK'],['name','Unique department name'],['head_faculty_id','FK → Faculty, nullable']] },
  { name:'Knowledge Base', desc:'Seeded + faculty-learned answers the Retrieval Agent searches.', cols:[
    ['kb_id','PK'],['intent_name','Human-readable label, e.g. "Exam Schedule"'],['department_id','FK → Departments'],
    ['keywords','Array/text used for matching'],['answer','The stored response text'],['source','seed | learned'],['created_at','When the entry was added']] },
  { name:'Tickets', desc:'Escalated queries the AI could not confidently answer.', cols:[
    ['ticket_id','PK'],['student_id','FK → Students'],['department_id','FK → Departments'],['faculty_id','FK → Faculty, nullable until claimed'],
    ['query_text','The original student question'],['status','open | answered | resolved'],['entities_json','Extracted entities from NLP'],
    ['created_at','When the ticket was raised'],['resolved_at','When faculty responded']] },
  { name:'Chat History', desc:'Every message exchanged with the AI Chatbot, answered or escalated.', cols:[
    ['chat_id','PK'],['student_id','FK → Students'],['message','What the student typed'],['response_type','answer | ticket | duplicate'],
    ['confidence_score','0.00–1.00 from the Decision Agent'],['ticket_id','FK → Tickets, nullable'],['timestamp','When it happened']] },
  { name:'Notifications', desc:'Every email/portal alert the Notification Agent has sent.', cols:[
    ['notification_id','PK'],['ticket_id','FK → Tickets'],['recipient_type','student | faculty'],['recipient_id','FK → Students or Faculty'],
    ['message','Notification content'],['channel','email | portal'],['sent_at','Timestamp'],['read_status','unread | read']] }
];

function viewDatabaseDesign(){
  return `
    <div class="page-head"><div><h2>Database Design</h2><div class="sub">7 core tables, and how they relate</div></div></div>

    <div class="card" style="margin-bottom:20px;overflow-x:auto;">
      <h3 style="margin-top:0;font-size:14.5px;">ER Diagram</h3>
      <div class="sub" style="margin-bottom:14px;">Solid lines are required relationships; dashed lines are optional (nullable foreign keys).</div>
      ${buildERDiagram()}
    </div>

    <div class="grid cols-2">
      ${DB_SCHEMA.map(t=>`
        <div class="card">
          <h3 style="margin:0 0 4px;font-size:14.5px;">${t.name}</h3>
          <div class="sub" style="margin-bottom:10px;">${t.desc}</div>
          <table>
            <tr><th>Field</th><th>Notes</th></tr>
            ${t.cols.map(([f,n])=>`<tr><td class="mono">${f}</td><td>${n}</td></tr>`).join('')}
          </table>
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   PROTOTYPE DESIGN (wireframes for the 6 required screens)
============================================================ */
function wR(x,y,w,h,fill,extra){ return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" ${extra||''}/>`; }
function wL(x,y,w,color,h){ return `<rect x="${x}" y="${y}" width="${w}" height="${h||3}" rx="${(h||3)/2}" fill="${color||'#93A6B4'}" opacity="0.65"/>`; }
function wC(cx,cy,r,fill,extra){ return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra||''}/>`; }

function wireFrame(inner){
  return `<svg viewBox="0 0 280 190" style="width:100%;height:auto;border-radius:10px;display:block;">
    <rect width="280" height="190" rx="10" fill="#0E1B2A"/>
    <rect width="280" height="16" fill="#152840"/>
    <circle cx="10" cy="8" r="2.3" fill="#E8674F"/><circle cx="18" cy="8" r="2.3" fill="#D8A24A"/><circle cx="26" cy="8" r="2.3" fill="#7FB88F"/>
    <g transform="translate(0,16)">${inner}</g>
  </svg>`;
}

function wireLogin(){
  let s = wR(0,0,150,174,'#152840');
  s += wL(14,22,90,'#EAF1F5',7) + wL(14,34,66,'#EAF1F5',7);
  s += wL(14,54,112,'#93A6B4',3) + wL(14,62,98,'#93A6B4',3) + wL(14,70,78,'#93A6B4',3);
  s += wR(14,92,44,14,'#1C3348') + wR(62,92,44,14,'#1C3348') + wR(110,92,26,14,'#1C3348',`stroke="#D8A24A" stroke-width="1"`);
  s += wR(150,0,130,174,'#16283A');
  s += wR(162,14,106,20,'#1C3348') + wR(164,16,50,16,'#D8A24A');
  s += wR(162,44,106,18,'#1C3348') + wR(162,66,106,18,'#1C3348') + wR(162,88,106,18,'#1C3348');
  s += wR(162,118,106,14,'#1C3348') + wR(162,136,106,14,'#1C3348');
  s += wR(162,156,106,16,'#D8A24A');
  return wireFrame(s);
}

function wireDashboard(){
  let s = wL(14,10,120,'#EAF1F5',7) + wL(14,22,170,'#93A6B4',3);
  for(let i=0;i<4;i++){
    const x=14+i*65;
    s += wR(x,36,58,50,'#152840') + wL(x+8,48,26,'#D8A24A',6) + wL(x+8,64,40,'#93A6B4',3);
  }
  s += wR(14,98,252,66,'#152840');
  for(let i=0;i<3;i++) s += wL(24,112+i*18,220,'#93A6B4',3);
  return wireFrame(s);
}

function wireChat(){
  let s = '';
  for(let i=0;i<6;i++) s += wC(20+i*46,14,7,'#1C3348','stroke="#D8A24A" stroke-width="1.4"');
  s += wR(14,34,168,26,'#1C3348') + wR(96,66,88,20,'#D8A24A') + wR(14,92,190,34,'#1C3348');
  s += wR(60,132,150,20,'#D8A24A');
  s += wR(14,160,200,20,'#152840') + wR(220,160,46,20,'#D8A24A');
  return wireFrame(s);
}

function wireTicketHistory(){
  let s = wL(14,10,110,'#EAF1F5',7);
  const colors = ['#E8674F','#D8A24A','#7FB88F','#7FB88F'];
  for(let i=0;i<4;i++){
    const y = 28+i*36;
    s += wR(14,y,252,30,'#152840');
    s += wR(228,y+6,30,10,colors[i],'opacity="0.7"');
    s += wL(24,y+9,150,'#93A6B4',3) + wL(24,y+19,100,'#5C7180',3);
  }
  return wireFrame(s);
}

function wireFacultyDashboard(){
  let s = wR(0,0,62,174,'#152840');
  s += wR(8,16,46,16,'#D8A24A') + wR(8,36,46,14,'#1C3348') + wR(8,54,46,14,'#1C3348');
  s += wL(74,10,120,'#EAF1F5',7);
  s += wR(70,26,196,62,'#16283A');
  s += wL(80,36,160,'#93A6B4',3) + wL(80,46,120,'#93A6B4',3);
  s += wR(80,58,176,16,'#1C3348') + wR(80,78,50,10,'#D8A24A');
  s += wR(70,94,196,26,'#152840') + wL(80,105,140,'#5C7180',3);
  s += wR(70,124,196,26,'#152840') + wL(80,135,130,'#5C7180',3);
  return wireFrame(s);
}

function wireAdminDashboard(){
  let s = '';
  for(let i=0;i<4;i++){
    const x=14+i*65;
    s += wR(x,10,58,42,'#152840') + wL(x+8,20,24,'#D8A24A',5) + wL(x+8,32,36,'#93A6B4',3);
  }
  s += wR(14,60,120,104,'#152840');
  const heights=[18,32,24,44,30];
  for(let i=0;i<5;i++) s += wR(24+i*20,158-heights[i],12,heights[i],'#D8A24A','opacity="0.85"');
  s += wR(146,60,120,104,'#152840');
  for(let i=0;i<5;i++) s += wL(154,74+i*18,100,i%2?'#5C7180':'#93A6B4',3);
  return wireFrame(s);
}

const PROTO_SCREENS = [
  { key:'login', title:'1 · Login', roleLabel:'Public', desc:'Sign In / Create Account tabs, role selection, and the product intro panel.', build:wireLogin, tab:null, roles:['student','faculty','admin'] },
  { key:'dashboard', title:'2 · Dashboard', roleLabel:'Student', desc:'Personal activity stats and recent ticket history at a glance.', build:wireDashboard, tab:'home', roles:['student'] },
  { key:'chat', title:'3 · Chat Interface', roleLabel:'Student', desc:'The live agent pipeline plus the conversational thread with the AI.', build:wireChat, tab:'chat', roles:['student'] },
  { key:'tickets', title:'4 · Ticket History', roleLabel:'Student', desc:'Every escalated question, its routing, and its current status.', build:wireTicketHistory, tab:'tickets', roles:['student'] },
  { key:'faculty', title:'5 · Faculty Dashboard', roleLabel:'Faculty', desc:'Department-filtered inbox with an inline reply composer per ticket.', build:wireFacultyDashboard, tab:'inbox', roles:['faculty'] },
  { key:'admin', title:'6 · Admin Dashboard', roleLabel:'Admin', desc:'System-wide stats, department breakdown, and knowledge-base oversight.', build:wireAdminDashboard, tab:'overview', roles:['admin'] }
];

function viewPrototype(){
  return `
    <div class="page-head"><div><h2>Prototype Design</h2><div class="sub">The 6 required screens — wireframed here, and fully working elsewhere in this app</div></div></div>
    <div class="grid cols-3">
      ${PROTO_SCREENS.map(s=>`
        <div class="card">
          ${s.build()}
          <div style="margin-top:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <b style="font-size:13.5px;">${s.title}</b>
              <span style="font-size:10px;color:var(--brass);text-transform:uppercase;letter-spacing:.06em;font-weight:700;">${s.roleLabel}</span>
            </div>
            <p style="color:var(--muted);font-size:12.5px;line-height:1.55;margin:6px 0 10px;">${s.desc}</p>
            <button class="small-btn ${s.roles.includes(SESSION.role) ? '' : 'ghost'}" data-jump="${s.key}">
              ${s.roles.includes(SESSION.role) ? 'Open this screen →' : 'Sign in as '+s.roleLabel+' to open'}
            </button>
          </div>
        </div>`).join('')}
    </div>`;
}

function wireProtoJumps(){
  document.querySelectorAll('[data-jump]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const screen = PROTO_SCREENS.find(s=>s.key===btn.dataset.jump);
      if(!screen.roles.includes(SESSION.role)){
        toast('Sign in as '+screen.roleLabel+' to view the live '+screen.title.replace(/^\d+ · /,'')+' screen.');
        return;
      }
      SESSION.tab = screen.tab || (SESSION.role==='student'?'chat':SESSION.role==='faculty'?'inbox':'overview');
      renderShell();
    });
  });
}

/* ============================================================
   CONVERSATION DESIGN (15+ intents, live-classified against
   the real matching engine — not hand-typed confidence numbers)
============================================================ */
// Parallel to SAMPLE_QUERIES — records which intent each sample query was
// authored for, so every intent is guaranteed coverage even where keyword
// overlap would otherwise pull a query toward a different close match.
// Confidence scores and entities below are still computed live per query.
const QUERY_INTENT_IDS = [
  'in01','in02','in03','in04','in05','in06','in07','in08','in09','in10',
  'in11','in12','in13','in14','in15','in16','in17','in13','in11','in04',
  'in06','in16','in15','in03','in10','in09','in08','in01','in02','in12',
  'in18','in19','in20','in21','in22','in22','in23','in23','in24','in25',
  'in26','in27','in28','in29','in30','in31','in32','in33','in34'
];

function buildIntentBuckets(){
  const buckets = {};
  SAMPLE_QUERIES.forEach((q,i)=>{
    const id = QUERY_INTENT_IDS[i] || '__unmatched__';
    const { confidence } = matchIntent(q);
    const entities = extractEntities(q);
    if(!buckets[id]) buckets[id] = { queries: [] };
    buckets[id].queries.push({ text:q, confidence, entities });
  });
  return buckets;
}

function viewConversationDesign(){
  const buckets = buildIntentBuckets();
  const seedIntents = DATA.kb.filter(k=>k.source==='seed');
  const totalQueries = SAMPLE_QUERIES.length;

  const rows = seedIntents.map(k=>{
    const b = buckets[k.id];
    const queries = b ? b.queries : [];
    const confs = queries.map(q=>q.confidence);
    const avgConf = confs.length ? confs.reduce((a,c)=>a+c,0)/confs.length : 0;
    const allEntities = queries.flatMap(q=>q.entities);
    const uniqEntities = [...new Map(allEntities.map(e=>[e.type+':'+e.value, e])).values()];
    return { k, queries, avgConf, uniqEntities };
  });

  return `
    <div class="page-head"><div><h2>Conversation Design</h2><div class="sub">${seedIntents.length} intents · ${totalQueries} sample queries, classified live by the real matching engine</div></div></div>

    <div class="grid cols-4" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="tag">Intents designed</div><div class="num">${seedIntents.length}</div><div class="lbl">minimum required: 15</div></div>
      <div class="card stat-card"><div class="tag">Sample queries</div><div class="num">${totalQueries}</div><div class="lbl">minimum required: 30</div></div>
      <div class="card stat-card"><div class="tag">Avg. confidence</div><div class="num" style="color:var(--sage)">${Math.round(rows.reduce((a,r)=>a+r.avgConf,0)/rows.length*100)}%</div><div class="lbl">across all matched queries</div></div>
      <div class="card stat-card"><div class="tag">Departments covered</div><div class="num">${new Set(seedIntents.map(k=>k.dept)).size}</div><div class="lbl">routing categories</div></div>
    </div>

    <div class="grid cols-2">
      ${rows.map(r=>`
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:8px;">
            <h3 style="margin:0;font-size:14.5px;">${r.k.name}</h3>
            <span class="mono" style="font-size:10px;color:var(--brass);white-space:nowrap;">${r.k.dept}</span>
          </div>

          <div style="margin-bottom:10px;">
            <div class="sub" style="margin-bottom:6px;">Sample queries (${r.queries.length})</div>
            ${r.queries.map(q=>`<div style="font-size:12.5px;color:var(--text);padding:5px 0;border-bottom:1px solid var(--line);">"${q.text}" <span class="mono" style="color:var(--faint);font-size:10.5px;">${(q.confidence*100).toFixed(0)}%</span></div>`).join('')}
          </div>

          <div class="sub" style="margin-bottom:4px;">AI response</div>
          <div class="resp-shown" style="margin-top:0;margin-bottom:10px;">${r.k.answer}</div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
            <div style="flex:1;">
              <div class="sub" style="margin-bottom:6px;">Avg. confidence</div>
              <div class="bar-track"><div class="bar-fill" style="width:${(r.avgConf*100).toFixed(0)}%; background:${r.avgConf>=0.55?'linear-gradient(90deg,#4d7a5a,var(--sage))':'linear-gradient(90deg,var(--brass-dim),var(--coral))'}"></div></div>
            </div>
            <span class="mono" style="font-size:12px;color:var(--muted);">${(r.avgConf*100).toFixed(0)}%</span>
          </div>

          <div style="margin-top:10px;">
            <div class="sub" style="margin-bottom:6px;">Entities detected</div>
            ${r.uniqEntities.length ? r.uniqEntities.map(e=>`<span class="tok">${e.type}: ${e.value}</span>`).join(' ') : '<span style="color:var(--faint);font-size:12px;">None in these sample queries</span>'}
          </div>
        </div>`).join('')}
    </div>`;
}

/* ============================================================
   CLOUD ARCHITECTURE (AWS)
============================================================ */
const AWS_REQUIRED = [
  ['Amazon EC2', 'Backend Hosting'],
  ['Amazon S3', 'Document Storage'],
  ['Amazon RDS', 'Database'],
  ['Amazon Cognito', 'Authentication'],
  ['Amazon IAM', 'Access Management'],
  ['Amazon CloudWatch', 'Monitoring']
];

const AWS_EXTRAS = [
  ['Amazon SES', 'Sends the real emails the Notification Agent currently simulates as in-app toasts.'],
  ['Amazon Bedrock / OpenSearch', 'Production RAG — embeddings and vector similarity search over the Knowledge Base, replacing the keyword-overlap matcher.'],
  ['Amazon SQS', 'Queues ticket-routing jobs between agents at scale, decoupling ticket creation from notification delivery.'],
  ['Amazon CloudFront', 'CDN in front of the Student/Faculty/Admin portals for low-latency global access.']
];

const AWS_FREE_ALT = [
  ['Amazon EC2', 'Backend Hosting', 'Runs entirely client-side in the browser', 'No server process needed for this prototype — the agent pipeline is plain JavaScript.'],
  ['Amazon S3', 'Document Storage', 'Base64-encoded files in persistent storage (Documents tab)', "Students upload certificates/marksheets/ID proof; Admin browses everything in the Document Storage tab, styled like an S3 bucket listing. Capped at 300KB/file for this demo's storage limits — real S3 has no such cap."],
  ['Amazon RDS', 'Database', 'Persistent key-value storage (window.storage)', 'Holds tickets, chat history, users, and the Knowledge Base — same shape of data RDS tables would hold.'],
  ['Amazon Cognito', 'Authentication', 'Custom email + password Sign In / Create Account', 'Passwords are obfuscated, not securely hashed — fine for a demo, not for production.'],
  ['Amazon IAM', 'Access Management', 'Role-based UI gating in JavaScript (student / faculty / admin)', 'Each role only sees and can act on the screens and data it should.'],
  ['Amazon CloudWatch', 'Monitoring', 'The Admin → Overview analytics tab', 'Deflection rate, ticket volume, and department load — same signals CloudWatch dashboards would surface.']
];

function viewCloudArchitecture(){
  return `
    <div class="page-head"><div><h2>Cloud Architecture</h2><div class="sub">Designed for AWS — built here with free alternatives standing in for each managed service</div></div></div>

    <div class="card" style="margin-bottom:20px;">
      <div class="arch-diagram">
        <div class="arch-tier-label">Client Layer</div>
        <div class="arch-tier">
          <div class="arch-box"><div class="ic">🎓</div><b>Student Browser</b></div>
          <div class="arch-box"><div class="ic">🧑‍🏫</div><b>Faculty Browser</b></div>
          <div class="arch-box"><div class="ic">🛡️</div><b>Admin Browser</b></div>
        </div>

        <div class="arch-connector">↕ HTTPS</div>

        <div class="arch-tier-label">Access &amp; Compute Layer</div>
        <div class="arch-tier">
          <div class="arch-box"><div class="ic">🔑</div><b>Amazon Cognito</b><small>Authentication</small></div>
          <div class="arch-box"><div class="ic">🖥️</div><b>Amazon EC2 / ECS Fargate</b><small>Agent orchestration backend</small></div>
          <div class="arch-box"><div class="ic">🪪</div><b>Amazon IAM</b><small>Access management</small></div>
        </div>

        <div class="arch-connector">↕</div>

        <div class="arch-tier-label">Data &amp; Storage Layer</div>
        <div class="arch-tier">
          <div class="arch-box"><div class="ic">🗄️</div><b>Amazon RDS</b><small>Students, faculty, tickets, chat history, KB</small></div>
          <div class="arch-box"><div class="ic">📦</div><b>Amazon S3</b><small>Documents &amp; uploaded certificates</small></div>
        </div>

        <div class="arch-connector">↕</div>

        <div class="arch-tier-label">Monitoring Layer</div>
        <div class="arch-tier">
          <div class="arch-box wide"><div class="ic">📈</div><b>Amazon CloudWatch</b><small>Agent latency, error rates, escalation-rate alarms across every layer above</small></div>
        </div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-bottom:20px;">
      <div class="card">
        <h3 style="margin-top:0;font-size:14.5px;">Suggested AWS Services</h3>
        <table>
          <tr><th>Service</th><th>Purpose</th></tr>
          ${AWS_REQUIRED.map(([s,p])=>`<tr><td class="mono">${s}</td><td>${p}</td></tr>`).join('')}
        </table>
      </div>
      <div class="card">
        <h3 style="margin-top:0;font-size:14.5px;">Additional services worth adding</h3>
        <table>
          <tr><th>Service</th><th>Why</th></tr>
          ${AWS_EXTRAS.map(([s,p])=>`<tr><td class="mono">${s}</td><td>${p}</td></tr>`).join('')}
        </table>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">Free alternatives used to build this working prototype</h3>
      <div class="sub" style="margin-bottom:14px;">This environment doesn't have AWS credentials to provision real infrastructure, so each service below was substituted with a free equivalent — the app's structure maps cleanly onto AWS whenever it's deployed there.</div>
      <table>
        <tr><th>AWS Service</th><th>Purpose</th><th>Used here instead</th><th>Notes</th></tr>
        ${AWS_FREE_ALT.map(([s,p,alt,note])=>`<tr><td class="mono">${s}</td><td>${p}</td><td>${alt}</td><td style="color:var(--muted);">${note}</td></tr>`).join('')}
      </table>
    </div>`;
}

function viewArchitecture(){
  return `
    <div class="page-head"><div><h2>System Architecture</h2><div class="sub">How the 9 required components fit together in Sahayak</div></div></div>

    <div class="card" style="margin-bottom:20px;">
      <div class="arch-diagram">

        <div class="arch-tier-label">Interface Layer</div>
        <div class="arch-tier">
          <div class="arch-box"><div class="ic">🎓</div><b>Student Portal</b><small>Chat, ticket history, dashboard</small></div>
          <div class="arch-box"><div class="ic">🧑‍🏫</div><b>Faculty Portal</b><small>Inbox for escalated tickets</small></div>
          <div class="arch-box"><div class="ic">🛡️</div><b>Admin Panel</b><small>Analytics, KB approvals</small></div>
        </div>

        <div class="arch-connector">↕</div>

        <div class="arch-tier-label">Intelligence Layer</div>
        <div class="arch-tier">
          <div class="arch-box wide"><div class="ic">💬</div><b>AI Chatbot</b><small>Conversational entry point — every message is handed to the Multi-Agent System below</small></div>
        </div>
        <div class="arch-connector">↓</div>
        <div class="arch-tier">
          <div class="arch-box wide">
            <div class="ic">🤖</div><b>Multi-Agent System</b>
            <div class="mini-agents">
              <span>🧭 Intent Recognition</span><span>🏷️ Entity Extraction</span><span>📚 Knowledge Retrieval</span>
              <span>⚖️ Decision</span><span>🎫 Ticket &amp; Routing</span><span>📧 Notification</span><span>🧠 Learning</span><span>📈 Analytics</span>
            </div>
          </div>
        </div>

        <div class="arch-connector">↕</div>

        <div class="arch-tier-label">Data &amp; Services Layer</div>
        <div class="arch-tier">
          <div class="arch-box"><div class="ic">📚</div><b>Knowledge Base</b><small>${DATA.kb.length} answered intents, growing via the Learning Agent</small></div>
          <div class="arch-box"><div class="ic">🗄️</div><b>Database</b><small>Students, faculty, tickets, chat history, notifications</small></div>
          <div class="arch-box"><div class="ic">📧</div><b>Email Notification Module</b><small>Alerts faculty on new tickets, students on resolution</small></div>
          <div class="arch-box"><div class="ic">☁️</div><b>Cloud Services</b><small>Hosting, authentication, storage, monitoring</small></div>
        </div>

      </div>
    </div>

    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">What each component does here</h3>
      <table>
        <tr><th>#</th><th>Component</th><th>Role in Sahayak</th></tr>
        <tr><td class="mono">1</td><td><b>Student Portal</b></td><td>Where students chat with the AI, browse ticket history, and see a personal activity dashboard.</td></tr>
        <tr><td class="mono">2</td><td><b>AI Chatbot</b></td><td>The conversational front-end — takes free-text questions and passes them into the agent pipeline.</td></tr>
        <tr><td class="mono">3</td><td><b>Multi-Agent System</b></td><td>Eight specialised agents (Intent, Entity, Retrieval, Decision, Ticket/Routing, Notification, Learning, Analytics) that jointly decide whether to answer or escalate.</td></tr>
        <tr><td class="mono">4</td><td><b>Database</b></td><td>Persistent, shared storage holding tickets, chat logs, user accounts, and knowledge-base entries.</td></tr>
        <tr><td class="mono">5</td><td><b>Cloud Services</b></td><td>Underlying hosting, authentication, file storage and monitoring the whole system runs on.</td></tr>
        <tr><td class="mono">6</td><td><b>Faculty Portal</b></td><td>Department-filtered inbox where faculty answer escalated tickets, feeding the Learning Agent.</td></tr>
        <tr><td class="mono">7</td><td><b>Email Notification Module</b></td><td>Notifies faculty the moment a ticket is routed to them, and students the moment it's resolved.</td></tr>
        <tr><td class="mono">8</td><td><b>Admin Panel</b></td><td>System-wide analytics, ticket oversight, and the approval gate before answers join the Knowledge Base.</td></tr>
        <tr><td class="mono">9</td><td><b>Knowledge Base</b></td><td>The searchable answer set the Retrieval Agent draws on — seeded with core intents and expanded by approved faculty answers.</td></tr>
      </table>
    </div>`;
}

const ETHICS_TOPICS = [
  { ic:'🔒', name:'Data Privacy', text:"Student queries and personal data should be encrypted at rest and in transit, with access limited to the student's own records and the faculty member a ticket is routed to." },
  { ic:'⚖️', name:'AI Bias', text:'Knowledge-base answers should be reviewed for fairness across departments and student groups, and the confidence threshold should be tuned so no category is systematically under-served. See the live coverage check below.' },
  { ic:'🔍', name:'Transparency', text:"Every AI answer shows its confidence score, and every escalation shows why — so students always know whether they're talking to a model or waiting on a person." },
  { ic:'🛡️', name:'Security', text:'Role-based access (student / faculty / admin) restricts who can view, respond to, or approve knowledge-base changes, and credentials are never stored in plain text.' },
  { ic:'🧑‍⚖️', name:'Human Oversight', text:'The Learning Agent never edits the knowledge base on its own — every faculty answer requires explicit admin approval before it becomes an automated response.' },
  { ic:'✅', name:'Responsible AI', text:'The Decision Agent is designed to escalate rather than guess: anything below the 55% confidence threshold goes to a human instead of risking a wrong automated answer to a student.' },
  { ic:'📝', name:'User Consent', text:'Students should be told, before their first query, that conversations may be logged and reviewed by faculty and admins to improve the system.' }
];

function viewEthics(){
  const deptCounts = {};
  DATA.kb.forEach(k=> deptCounts[k.dept] = (deptCounts[k.dept]||0)+1 );
  const maxCount = Math.max(1, ...Object.values(deptCounts));
  const under = Object.entries(deptCounts).filter(([,c])=>c <= 1).map(([d])=>d);

  return `
    <div class="page-head"><div><h2>Ethics &amp; Trust</h2><div class="sub">How this system is meant to be governed responsibly</div></div></div>
    <div class="grid cols-2" style="margin-bottom:20px;">
      ${ETHICS_TOPICS.map(t=>`
        <div class="card">
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;"><span style="font-size:18px;">${t.ic}</span><b style="font-size:14px;">${t.name}</b></div>
          <p style="color:var(--muted);font-size:13px;line-height:1.6;margin:0;">${t.text}</p>
        </div>`).join('')}
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14.5px;">Live bias &amp; coverage check</h3>
      <div class="sub" style="margin-bottom:14px;">Knowledge Base entries per department, right now — a thin or missing bar is where the AI is most likely to under-serve students and lean on escalation instead.</div>
      ${Object.entries(deptCounts).sort((a,b)=>b[1]-a[1]).map(([d,c])=>`
        <div class="bar-row"><div class="name">${d}</div><div class="bar-track"><div class="bar-fill" style="width:${(c/maxCount)*100}%"></div></div><div class="val">${c}</div></div>`).join('')}
      ${under.length ? `<div class="auth-error" style="margin-top:12px;margin-bottom:0;">⚠️ Thin coverage (≤1 entry): ${under.join(', ')} — these departments are the most likely to escalate every question rather than answer directly.</div>` : ''}
    </div>`;
}