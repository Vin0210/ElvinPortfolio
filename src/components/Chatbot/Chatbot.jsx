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

  const openChat = () => {
    setIsOpen(true);
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [createMessage(WELCOME_MESSAGE, 'bot')];
    });
  };

  const sendMessage = useCallback(
    (rawText) => {
      const text = rawText.trim();
      if (!text || isTyping) return;

      setMessages((prev) => [...prev, createMessage(text, 'user')]);
      setInputValue('');
      setIsTyping(true);

      typingTimeoutRef.current = setTimeout(
        () => {
          const reply = findResponse(text);
          setIsTyping(false);
          setMessages((prev) => [...prev, createMessage(reply, 'bot')]);
        },
        800 + Math.random() * 700
      );
    },
    [isTyping]
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
