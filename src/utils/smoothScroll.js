const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const smoothScrollTo = (targetY) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (reduced || Math.abs(distance) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  // Duration scales with travel distance, clamped for long jumps
  const duration = Math.min(1400, Math.max(550, Math.abs(distance) * 0.45));

  const root = document.documentElement;
  root.style.scrollBehavior = 'auto';

  let start = null;
  let rafId = null;
  let cancelled = false;

  const interruptEvents = ['wheel', 'touchstart', 'keydown'];
  const cancel = () => { cancelled = true; };

  const cleanup = () => {
    root.style.scrollBehavior = '';
    interruptEvents.forEach((evt) => window.removeEventListener(evt, cancel));
    if (rafId) cancelAnimationFrame(rafId);
  };

  // Let the user take over at any moment
  interruptEvents.forEach((evt) =>
    window.addEventListener(evt, cancel, { passive: true })
  );

  const step = (ts) => {
    if (cancelled) {
      cleanup();
      return;
    }
    if (start === null) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      cleanup();
    }
  };

  rafId = requestAnimationFrame(step);
};

export const scrollToSection = (id, offset = 80) => {
  const element = document.getElementById(id);
  if (element) smoothScrollTo(element.offsetTop - offset);
};

export const scrollToTop = () => smoothScrollTo(0);
