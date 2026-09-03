import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import {
  BOT_NAME,
  BOT_ROLE,
  WELCOME_MESSAGE,
  QUICK_REPLIES,
  findResponse
} from './chatbotData';
import { generateResponse, isApiKeyConfigured } from './geminiService';
import './Chatbot.css';

let messageId = 0;
const createMessage = (text, sender) => ({
  id: ++messageId,
  text,
  sender
});

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const linkifyText = (text) =>
  text.split(URL_REGEX).map((part, index) =>
    part.match(/^https?:\/\//) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => () => clearTimeout(typingTimeoutRef.current), []);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.removeProperty('--keyboard-offset');
      return;
    }

    const vv = window.visualViewport;
    if (!vv) return;

    const updateOffset = () => {
      const overlap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty(
        '--keyboard-offset',
        `${Math.round(overlap)}px`
      );
    };

    vv.addEventListener('resize', updateOffset);
    vv.addEventListener('scroll', updateOffset);
    updateOffset();

    return () => {
      vv.removeEventListener('resize', updateOffset);
      vv.removeEventListener('scroll', updateOffset);
      document.documentElement.style.removeProperty('--keyboard-offset');
    };
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [createMessage(WELCOME_MESSAGE, 'bot')];
    });
  };

  const sendMessage = useCallback(
    async (rawText) => {
      const text = rawText.trim();
      if (!text || isTyping) return;

      const userMessage = createMessage(text, 'user');
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      try {
        let reply;

        if (isApiKeyConfigured()) {
          // Use Gemini API for real AI responses with timeout
          const conversationHistory = [...messages, userMessage];
          
          // Race between API call and timeout (5 seconds)
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('timeout')), 5000)
          );
          
          try {
            reply = await Promise.race([
              generateResponse(text, conversationHistory),
              timeoutPromise
            ]);
          } catch (timeoutError) {
            // API too slow, fall back to predefined responses
            console.log('API timeout, using fallback response');
            reply = findResponse(text);
          }
        } else {
          // Fallback to predefined responses
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
          reply = findResponse(text);
        }

        setIsTyping(false);
        setMessages((prev) => [...prev, createMessage(reply, 'bot')]);
      } catch (error) {
        console.error('Chat error:', error);
        setIsTyping(false);
        // Fallback to predefined responses on error
        const reply = findResponse(text);
        setMessages((prev) => [...prev, createMessage(reply, 'bot')]);
      }
    },
    [isTyping, messages]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (e) => {
    sendMessage(e.currentTarget.textContent);
  };

  return (
    <div className="chatbot">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">
                <Bot size={22} />
                <span className="chatbot-status-dot" />
              </div>
              <div className="chatbot-header-info">
                <span className="chatbot-name">{BOT_NAME}</span>
                <span className="chatbot-role">{BOT_ROLE}</span>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-bubble">{linkifyText(message.text)}</div>
                </div>
              ))}

              {isTyping && (
                <div className="message bot">
                  <div className="message-bubble typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-quick-replies">
              {QUICK_REPLIES.map((reply) => (
                <button key={reply} className="quick-reply" onClick={handleQuickReply}>
                  {reply}
                </button>
              ))}
            </div>

            <form className="chatbot-input-area" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                maxLength={300}
                aria-label="Chat message"
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-toggle"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default React.memo(Chatbot);
