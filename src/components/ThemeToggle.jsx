import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="theme-toggle-icon"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.4 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
      
      <motion.div
        className="theme-toggle-bg"
        initial={false}
        animate={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #6C63FF, #00D4FF)' 
            : 'linear-gradient(135deg, #FF6B9D, #FFB347)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;