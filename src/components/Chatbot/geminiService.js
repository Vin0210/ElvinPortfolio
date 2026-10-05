const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';


const PREFERRED_MODELS = (import.meta.env.VITE_GEMINI_MODELS || 'gemini-3.8-flash,gemini-2.0-flash,gemini-1.5-flash,gemini-1.5-flash-latest')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

const WORKING_MODEL_KEY = 'vinbyte-working-model';

const getCachedModel = () => {
  try {
    return localStorage.getItem(WORKING_MODEL_KEY) || '';
  } catch {
    return '';
  }
};

const setCachedModel = (model) => {
  try {
    localStorage.setItem(WORKING_MODEL_KEY, model);
  } catch {
    return;
  }
};

const discoverModels = async () => {
  const res = await fetch(`${GEMINI_API_BASE}/models?key=${GEMINI_API_KEY}`);
  if (!res.ok) return [];
  const data = await res.json();
  // Skip non-chat models (TTS/image/embeddings can't do multiturn chat —
  // e.g. gemini-2.5-flash-preview-tts 400s on conversation history).
  const NON_CHAT = /tts|image|embed|aqa/i;
  const usable = (data.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => String(m.name || '').replace(/^models\//, ''))
    .filter((name) => name && !NON_CHAT.test(name));
  
  const flash = usable.filter((m) => m.includes('flash'));
  const rest = usable.filter((m) => !m.includes('flash'));
  return [...flash, ...rest];
};

const getCandidateModels = async () => {
  const cached = getCachedModel();
  const ordered = [...PREFERRED_MODELS];
  let discovered = [];
  try {
    discovered = await discoverModels();
  } catch {
    discovered = [];
  }
  for (const m of discovered) {
    if (!ordered.includes(m)) ordered.push(m);
  }
 
  if (cached && ordered.includes(cached)) {
    return [cached, ...ordered.filter((m) => m !== cached)];
  }
  return ordered;
};

// Context about Elvin for the AI to provide accurate responses
const SYSTEM_CONTEXT = `You are VinByte, Elvin's virtual assistant on his portfolio website. You are friendly, helpful, and occasionally humorous.

PRIMARY JOB:
- Answer questions about Elvin based on the information provided below
- Help visitors learn about Elvin's skills, projects, and experience
- Encourage visitors to hire Elvin or check out his work

ABOUT ELVIN:
- Full name: Elvin Ramos
- Location: Philippines
- Profession: Web Developer
- Education: BS Information Technology from Western Mindanao State University (2020-2025)

SKILLS:
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
1. Resort Booking - Full-stack resort reservation system (React, Node.js, MongoDB, Express) - Live: https://resort-booking-sand.vercel.app/ | GitHub: https://github.com/Vin0210/ResortBooking
2. SmashPoint - Pickleball court booking system (Laravel, MySQL, React) - Live: https://smashpoint.whf.bz/ | GitHub: https://github.com/Vin0210/SmashPoint
3. RMMC System - Comprehensive School Management System (Laravel, MySQL) - Live: https://rmmcmain.com/
4. Snake Identification App - ML app for identifying Philippine snakes (Flutter, TensorFlow)
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

// Tries a single model. Throws on any failure so the caller can move
// on to the next model. Returns the reply text on success, including
// the safety-filter refusal (that's content-related, not model-related).
// Transient errors (429/5xx overload) get one retry after a short wait.
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postToModel = (model, contents) =>
  fetch(`${GEMINI_API_BASE}/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    }),
  });

const tryModel = async (model, contents) => {
  let response;
  let attempt = 0;
  for (;;) {
    attempt += 1;
    response = await postToModel(model, contents);
    console.log(`Gemini [${model}] response status (attempt ${attempt}):`, response.status);
    if (response.ok) break;
    if (attempt >= 2 || !RETRYABLE_STATUS.has(response.status)) {
      const errorText = await response.text();
      console.error(`Gemini [${model}] error response:`, errorText);
      const err = new Error(`API error: ${response.status} - ${errorText}`);
      err.status = response.status;
      throw err;
    }
    await sleep(1000 * attempt);
  }

  const data = await response.json();

  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  // Check for safety filter blocks
  if (data.promptFeedback) {
    console.warn(`Gemini [${model}] prompt feedback:`, data.promptFeedback);
    return "I'd rather not respond to that. Feel free to ask me about Elvin's skills, projects, or experience!";
  }

  throw new Error('No response from Gemini');
};

export const generateResponse = async (userMessage, conversationHistory = []) => {
  try {
    // Build conversation context
    const contents = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_CONTEXT }]
      },
      {
        role: 'model',
        parts: [{ text: "I understand. I'm VinByte, Elvin's virtual assistant. I'll help visitors learn about Elvin's skills, projects, and experience. I'll keep my responses concise and friendly." }]
      },
      // Add recent conversation history (last 5 messages for context)
      ...conversationHistory.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    // Try each candidate model in order until one works.
    const candidates = await getCandidateModels();
    let lastError = null;
    for (const model of candidates) {
      try {
        const text = await tryModel(model, contents);
        setCachedModel(model);
        return text;
      } catch (modelError) {
        console.warn(`Gemini model ${model} failed, trying next:`, modelError.message);
        lastError = modelError;
        // Network-level failure: retrying other models won't help.
        if (modelError.name === 'TypeError') break;
      }
    }
    throw lastError || new Error('No working Gemini model');
  } catch (error) {
    console.error('Gemini API error:', error);

    // More specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return "I'm having network issues. Please check your connection and try again!";
    }

    return "I'm having trouble connecting right now. Please try again later, or you can reach Elvin directly through the contact form or email!";
  }
};

export const isApiKeyConfigured = () => {
  return GEMINI_API_KEY && GEMINI_API_KEY.length > 10;
};
