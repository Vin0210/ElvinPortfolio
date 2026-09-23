import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEME_REVEAL_MS } from './ThemeContext';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import './ThemeToggle.css';

// Choreography: the page circle reveal runs THEME_REVEAL_MS. The icon
// flip starts mid-sweep so its spin overlaps the reveal's finish, and
// the particle pop fires just as the reveal lands — one matched motion.
const FLIP_AT_MS = THEME_REVEAL_MS / 2;
const BURST_AT_MS = THEME_REVEAL_MS - 50;

const supportsVT = () =>
  typeof document !== 'undefined' && !!document.startViewTransition;

const RAYS = Array.from({ length: 8 });
const STARS = [
  { left: '2%', top: '12%' },
  { left: '78%', top: '6%' },
  { left: '70%', top: '68%' },
];
const BURST = Array.from({ length: 8 });

/** Smiling sun: round body + kawaii face, rays spin around it. */
const SunScene = () => (
  <span className="toggle-scene" aria-hidden="true">
    <span className="rays">
      {RAYS.map((_, i) => (
        <span key={i} className="ray" style={{ '--i': i }} />
      ))}
    </span>
    <span className="sun-body">
      <span className="face">
        <span className="eye" />
        <span className="eye" />
      </span>
      <span className="smile" />
      <span className="cheek cheek-left" />
      <span className="cheek cheek-right" />
    </span>
  </span>
);

/** Sleepy moon: crescent + closed happy eyes, twinkling stars, floating Zzz. */
const MoonScene = () => (
  <span className="toggle-scene" aria-hidden="true">
    {STARS.map((s, i) => (
      <span key={i} className="twinkle-star" style={{ ...s, '--d': `${i * 0.55}s` }} />
    ))}
    <span className="moon-body">
      <span className="sleepy-eyes">
        <span className="sleepy-eye" />
        <span className="sleepy-eye" />
      </span>
      <span className="sleepy-smile" />
    </span>
    <span className="zzz">
      <span className="z z1">z</span>
      <span className="z z2">z</span>
    </span>
  </span>
);

/** Tiny dot explosion on click — transform/opacity only, removed after. */
const Burst = () => (
  <span className="burst" aria-hidden="true">
    {BURST.map((_, i) => (
      <span key={i} className="burst-dot" style={{ '--a': `${i * 45}deg` }} />
    ))}
  </span>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = usePrefersReducedMotion();

  // The icon the button *shows*. It trails the real theme so the
  // spin-swap hits mid-sweep of the page reveal instead of flashing
  // instantly (live-DOM animation during a View Transition is hidden
  // behind the browser's snapshots, so an instant swap is never seen).
  const [shownTheme, setShownTheme] = useState(theme);
  const shownIsDark = shownTheme === 'dark';

  const [burstKey, setBurstKey] = useState(0);
  const burstTimer = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !supportsVT()) {
      setShownTheme(theme);
      return;
    }
    const id = setTimeout(() => setShownTheme(theme), FLIP_AT_MS);
    return () => clearTimeout(id);
  }, [theme, prefersReducedMotion]);

  useEffect(() => () => clearTimeout(burstTimer.current), []);

  const handleClick = (e) => {
    if (prefersReducedMotion || !supportsVT()) {
      setBurstKey((k) => k + 1);
    } else {
      // Fire the pop as the reveal lands so it's actually visible —
      // anything painted mid-reveal hides behind the VT snapshots.
      clearTimeout(burstTimer.current);
      burstTimer.current = setTimeout(
        () => setBurstKey((k) => k + 1),
        BURST_AT_MS
      );
    }
    toggleTheme(e);
  };

  return (
    <motion.button
      className="theme-toggle"
      data-theme-state={theme}
      onClick={handleClick}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.8, rotate: -10 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'wake the sun up' : 'let the moon nap'}
    >
      {!prefersReducedMotion && burstKey > 0 && <Burst key={burstKey} />}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={shownTheme}
          className="theme-toggle-icon"
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { scale: 0, rotate: -180, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { scale: 1, rotate: 0, opacity: 1 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { scale: 0, rotate: 180, opacity: 0 }
          }
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          {shownIsDark ? <MoonScene /> : <SunScene />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
