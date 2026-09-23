import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();


const FALLBACK_MS = 280;

export const THEME_REVEAL_MS = 650;
const REVEAL_MS = THEME_REVEAL_MS;

const THEME_BG = { light: '#FAF7F2', dark: '#14110E' };

function applyTheme(next) {
  localStorage.setItem('theme', next);
  document.documentElement.setAttribute('data-theme', next);

  document.documentElement.style.colorScheme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_BG[next]);
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
     
    }
    return 'light';
  });

  const themeRef = useRef(theme);
  themeRef.current = theme;
  const fallbackTimer = useRef(null);
  const transitioning = useRef(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => () => clearTimeout(fallbackTimer.current), []);

  const toggleTheme = useCallback((event) => {
    const current = themeRef.current;
    const next = current === 'dark' ? 'light' : 'dark';

    // Reduced motion: instant flip, no animation at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    // Guard against double-clicks mid-reveal.
    if (transitioning.current) return;


    if (!document.startViewTransition) {
      const root = document.documentElement;
      root.classList.add('theme-morphing');
      clearTimeout(fallbackTimer.current);
      setTheme(next);
      fallbackTimer.current = setTimeout(() => {
        root.classList.remove('theme-morphing');
      }, FALLBACK_MS);
      return;
    }

    
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    transitioning.current = true;
    let transition;
    try {
      transition = document.startViewTransition(() => {
      
        flushSync(() => {
          applyTheme(next);
          setTheme(next);
        });
      });
    } catch {
      
      transitioning.current = false;
      setTheme(next);
      return;
    }

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: REVEAL_MS,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {
        // ready rejects if the transition is skipped — nothing to animate
      });

    transition.finished
      .catch(() => {})
      .finally(() => {
        transitioning.current = false;
      });
  }, []);

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
