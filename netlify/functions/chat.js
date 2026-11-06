/* eslint-env node */
// VinByte chat proxy — the Gemini API key lives ONLY here (server env).
// The browser never sees it: it calls /.netlify/functions/chat instead.
// Env: GEMINI_API_KEY (required), GEMINI_MODELS (optional, comma-separated).

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const PREFERRED_MODELS = (process.env.GEMINI_MODELS || 'gemini-2.0-flash,gemini-1.5-flash-latest')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

// Reused across warm invocations so a working model is tried first.
let workingModel = '';
// Basic per-IP rate limiting (resets on cold start — good enough as a
// quota guard alongside Google-side quotas).
const hits = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 1000;

const SYSTEM_CONTEXT = `You are VinByte, Elvin's virtual assistant on his portfolio website. You are friendly, helpful, and occasionally humorous.

PRIMARY JOB:
- Answer questions about Elvin based on the information provided below
- Help visitors learn about Elvin's skills, projects, and experience
- Encourage visitors to hire Elvin or check out his work

ABOUT ELVIN:
- Full name: Elvin Ramos
- Location: Philippines
- Profession: AI & Automation Engineer (full-stack web developer background @ iTECH-RAR)
- Education: BS Information Technology from Western Mindanao State University (2020-2025)

SKILLS:
- AI & Automation: Python, Gemini/OpenAI APIs, RAG + Vector DBs, LangChain, n8n/Make/webhooks, TensorFlow/scikit-learn, Playwright
- Frontend: React, HTML, CSS, JavaScript, Bootstrap, Tailwind CSS
- Backend: Laravel, PHP, Node.js, Express
- Database: MySQL, MongoDB, phpMyAdmin
- Tools: Git, GitHub, VS Code, XAMPP, WampServer
- Other: Flutter, TensorFlow

CURRENT WORK:
- Web Developer at iTECH-RAR Solutions, Inc. since June 2025
- Develops enterprise school management systems
- Built modules for: Enrollment, Registrar, Finance, Cashier, Student Portal, Teacher Portal, Attendance Monitoring, Peer Evaluation, and Reports

PROJECTS:
1. VinByte - RAG portfolio assistant live on this site (React + Netlify Function + Gemini, offline intents, rate limiting, fallback chain)
2. Snake ID App - ML image recognition for Philippine snakes, on-device TFLite (Flutter, TensorFlow capstone, 2025)
3. Ops Automations - inbox triage, MySQL cron alerts, Playwright booking checks (n8n, REST, EmailJS) in production
4. Resort Booking - Full-stack resort reservation system (React, Node.js, MongoDB, Express) - Live: https://resort-booking-sand.vercel.app/ | GitHub: https://github.com/Vin0210/ResortBooking
5. SmashPoint - Pickleball court booking system (Laravel, MySQL, React) - Live: https://smashpoint.whf.bz/ | GitHub: https://github.com/Vin0210/SmashPoint
6. RMMC System - Comprehensive School Management System (Laravel, MySQL) - Live: https://rmmcmain.com/
7. Snake Identification App - ML app for identifying Philippine snakes (Flutter, TensorFlow)
5. Pokémon Web - Pokémon encyclopedia with team building (React, CSS, JSON Server) - Live: https://pokemonhehe.netlify.app/
6. Todo List - Productivity app (React, CSS) - Live: https://todotodo1222.netlify.app/
7. Fast Food E-Commerce - Online ordering platform (PHP, MySQL)
8. DriveRent - Car Rental & Fleet Management Platform (Laravel, React, MySQL) - Currently under development - GitHub: https://github.com/Vin0210/Car-Rental
9. Alegre × Good Habits - Editorial e-commerce for a coffee + thrift shop (React 19, Vite, Supabase, Framer Motion) with unified cart, PayMongo checkout, order tracking, reservations and admin dashboard - Live: https://alegrexgoodhabits.pages.dev/ | GitHub: https://github.com/Vin0210/Coffee
10. SoleMania (latest, in production) - Full-stack shoe e-commerce platform (React 19, Vite, Node.js/Express, MySQL) with size-level stock, cart/wishlist, transaction-safe checkout and admin dashboard - GitHub: https://github.com/Vin0210/solemania

CONTACT:
- Email: elvinramos454@gmail.com
- GitHub: https://github.com/Vin0210
- LinkedIn: https://www.linkedin.com/in/elvin-ramos-a347b2339
- Instagram: https://www.instagram.com/vin.viinn/
- Facebook: https://www.facebook.com/elvinramos.meme

GUIDELINES:
- Keep responses concise (2-3 sentences max)
- Be friendly, natural, and conversational
- ALWAYS answer the user's actual question first and accurately
- You CAN answer general questions (greetings, how are you, weather, geography, general tech, etc.)
- Only mention Elvin if the question is about him, or naturally connect to him after answering
- Do NOT force Elvin into every response - answer what was asked!
- When sharing links, use the full URL
- If someone asks how to hire Elvin, encourage them to use the contact form or email
- Never make up information not provided above
- If asked if you're AI, you can be honest but keep it lighthearted
- Be helpful and engaging - you're representing Elvin!`;

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postToModel = (model, contents, timeoutMs = 7000) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  return fetch(`${GEMINI_API_BASE}/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 300 },
    }),
    signal: ctrl.signal,
  }).finally(() => clearTimeout(t));
};

const tryModel = async (model, contents) => {
  // Single attempt + one quick retry on rate-limit/overload only.
  // No long sleeps — Netlify kills idle functions (Inactivity Timeout).
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await postToModel(model, contents);
      if (response.ok) {
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }
        if (data.promptFeedback) {
          return "I'd rather not respond to that. Feel free to ask me about Elvin's skills, projects, or experience!";
        }
        throw new Error('No response from Gemini');
      }
      if (!RETRYABLE_STATUS.has(response.status) || attempt === 2) {
        const err = new Error(`Gemini [${model}] failed: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      await sleep(500);
    } catch (e) {
      if (e.name === 'AbortError' || e.name === 'TypeError') throw e;
      if (attempt === 2) throw e;
      await sleep(500);
    }
  }
  throw new Error('No working Gemini model');
};

const getReply = async (message, history) => {
  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
    { role: 'model', parts: [{ text: "I understand. I'm VinByte, Elvin's virtual assistant. I'll help visitors learn about Elvin's skills, projects, and experience. I'll keep my responses concise and friendly." }] },
    ...history.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: String(msg.text || '').slice(0, 1000) }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ];

  // Max 2 models, no discovery call — discovery + long retry loops
  // caused Netlify Inactivity Timeout (function idle >10s).
  const ordered = [...PREFERRED_MODELS].slice(0, 2);
  const candidates = workingModel && ordered.includes(workingModel)
    ? [workingModel, ...ordered.filter((m) => m !== workingModel)]
    : ordered;

  let lastError = null;
  for (const model of candidates) {
    try {
      const text = await tryModel(model, contents);
      workingModel = model;
      return text;
    } catch (modelError) {
      lastError = modelError;
      if (modelError.name === 'TypeError' || modelError.name === 'AbortError') break;
    }
  }
  throw lastError || new Error('No working Gemini model');
};

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    console.log('chat reject: method', event.httpMethod);
    return json(405, { error: 'Method not allowed' });
  }
  if (!GEMINI_API_KEY) {
    console.log('chat reject: no key configured');
    return json(500, { error: 'Chat is not configured' });
  }

  // Same-site only: block cross-site callers trying to burn quota.
  const origin = event.headers.origin || event.headers.referer || '';
  const host = event.headers.host || '';
  if (origin && host && !origin.includes(host)) {
    console.log('chat reject: origin', JSON.stringify(origin), 'host', JSON.stringify(host));
    return json(403, { error: 'Forbidden' });
  }

  // Per-IP rate limit.
  const ip = event.headers['x-nf-client-connection-ip']
    || (event.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || 'unknown';
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) hits.set(ip, { count: 1, start: now });
  else if (entry.count >= RATE_LIMIT) {
    console.log('chat reject: rate limit for ip', ip);
    return json(429, { error: 'Too many requests, slow down!' });
  } else entry.count += 1;

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid request' });
  }
  const message = typeof payload.message === 'string' ? payload.message.trim().slice(0, 500) : '';
  const history = Array.isArray(payload.history)
    ? payload.history.filter((m) => m && typeof m.text === 'string').slice(-5)
    : [];
  if (!message) return json(400, { error: 'Empty message' });

  try {
    // Hard deadline at 8.5s so Netlify never hits Inactivity Timeout (10s).
    // Client falls back to offline replies on 502.
    const deadline = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Function deadline exceeded')), 8500)
    );
    const reply = await Promise.race([getReply(message, history), deadline]);
    return json(200, { reply });
  } catch (error) {
    console.error('Chat function error:', error.status || '', error.message || error);
    return json(502, { error: 'AI unavailable, try again later!' });
  }
};
