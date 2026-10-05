// VinByte client — talks to the same-site Netlify Function, which holds
// the Gemini key server-side. No API key or model names in this bundle,
// so there is nothing for visitors (or scrapers) to steal.
// The function runs the model fallback chain + retries; here we just
// forward the message and fall back to offline replies on any failure.

const CHAT_URL = '/.netlify/functions/chat';

export const generateResponse = async (userMessage, conversationHistory = []) => {
  try {
    const history = (Array.isArray(conversationHistory) ? conversationHistory : [])
      .slice(-5)
      .filter((msg) => msg && typeof msg.text === 'string')
      .map((msg) => ({ sender: msg.sender === 'user' ? 'user' : 'model', text: msg.text }));

    const response = await fetch(CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history }),
    });

    if (!response.ok) {
      throw new Error(`Chat function error: ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data.reply === 'string' && data.reply.trim()) {
      return data.reply;
    }
    if (data && typeof data.error === 'string' && data.error.trim()) {
      return data.error;
    }

    throw new Error('Empty reply from chat function');
  } catch (error) {
    console.error('Chat client error:', error);

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return "I'm having network issues. Please check your connection and try again!";
    }

    return "I'm having trouble connecting right now. Please try again later, or you can reach Elvin directly through the contact form or email!";
  }
};

// No client-side key anymore — the function owns auth. Always try it;
// failures fall back to the built-in offline replies in Chatbot.jsx.
export const isApiKeyConfigured = () => true;
