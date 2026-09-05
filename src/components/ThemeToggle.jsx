import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import './ThemeToggle.css';

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const THEME_BGS = {
  dark: '#0A0A1A',
  light: '#F8F9FA',
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = usePrefersReducedMotion();
  const animatingRef = useRef(false);
  const directionRef = useRef('expand');

  const handleClick = (e) => {
    if (prefersReducedMotion || animatingRef.current) {
      if (!animatingRef.current) toggleTheme();
      return;
    }
    animatingRef.current = true;

    // Alternate: grow the circle out, then shrink it back on the next toggle
    const direction = directionRef.current;
    directionRef.current = direction === 'expand' ? 'contract' : 'expand';

    const target = isDark ? 'light' : 'dark';
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const root = document.documentElement;

    // Freeze transitions so theme snapshots apply instantly
    root.classList.add('theme-switching');

    // Snapshot the current page into a fixed overlay
    const source = document.querySelector('.app');
    const clone = source.cloneNode(true);
    const wrap = document.createElement('div');
    wrap.className = 'theme-reveal-wrap';
    const scroller = document.createElement('div');
    scroller.className = 'theme-reveal-scroll';
    // Pin the snapshot to the real .app box (viewport coords) at its EXACT
    // size — even a few px wider would rewrap full-bleed text, change
    // heights, and shift everything below. The scrollbar strip is covered
    // by the wrap's own theme background instead.
    const box = source.getBoundingClientRect();
    scroller.style.position = 'absolute';
    scroller.style.left = `${box.left}px`;
    scroller.style.top = `${box.top}px`;
    scroller.style.width = `${box.width}px`;
    scroller.appendChild(clone);
    wrap.appendChild(scroller);

    // Preserve painted canvas bitmaps (cloneNode leaves canvases blank)
    try {
      const srcCanvases = source.querySelectorAll('canvas');
      const cloneCanvases = clone.querySelectorAll('canvas');
      srcCanvases.forEach((c, i) => {
        const dst = cloneCanvases[i];
        if (!dst || !c.width || !c.height) return;
        dst.width = c.width;
        dst.height = c.height;
        const ctx = dst.getContext('2d');
        if (ctx) ctx.drawImage(c, 0, 0);
      });
    } catch {
      // best effort only
    }

    const maxR = Math.hypot(window.innerWidth, window.innerHeight) + 80;
    const start = performance.now();
    const duration = 1000;

    if (direction === 'expand') {
      // Circle grows from the button: clone shows the NEW theme over the old page
      wrap.setAttribute('data-theme', target);
      wrap.style.background = THEME_BGS[target];
      wrap.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(wrap);

      const step = (ts) => {
        const t = Math.min((ts - start) / duration, 1);
        const r = maxR * easeInOutCubic(t);
        wrap.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          // Circle covers the screen: flip the real page underneath, then reveal
          toggleTheme();
          wrap.remove();
          // Keep transitions frozen until the context's morph window passes
          setTimeout(() => {
            root.classList.remove('theme-switching');
            animatingRef.current = false;
          }, 420);
        }
      };
      requestAnimationFrame(step);
    } else {
      // Circle shrinks back to the button: clone keeps the OLD theme,
      // the new page flips hidden underneath and is revealed by the retreat
      wrap.setAttribute('data-theme', isDark ? 'dark' : 'light');
      wrap.style.background = THEME_BGS[isDark ? 'dark' : 'light'];
      wrap.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`;
      document.body.appendChild(wrap);
      toggleTheme();

      const step = (ts) => {
        const t = Math.min((ts - start) / duration, 1);
        const r = maxR * (1 - easeInOutCubic(t));
        wrap.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          wrap.remove();
          root.classList.remove('theme-switching');
          animatingRef.current = false;
        }
      };
      requestAnimationFrame(step);
    }
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.85 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={`theme-toggle-bg ${isDark ? 'is-dark' : 'is-light'}`} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle-icon"
          initial={{ rotate: -120, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
