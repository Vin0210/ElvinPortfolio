const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent';

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

CONTACT:
- Email: elvinramos0210@gmail.com
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

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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

    // Log the response status for debugging
    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response data:', data);
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    // Check for safety filter blocks
    if (data.promptFeedback) {
      console.warn('Gemini prompt feedback:', data.promptFeedback);
      return "I'd rather not respond to that. Feel free to ask me about Elvin's skills, projects, or experience!";
    }

    throw new Error('No response from Gemini');
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