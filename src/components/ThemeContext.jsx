import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const MORPH_MS = 350;

let morphTimer;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    root.classList.add('theme-morphing');
    clearTimeout(morphTimer);
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
    morphTimer = setTimeout(() => {
      root.classList.remove('theme-morphing');
    }, MORPH_MS);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
