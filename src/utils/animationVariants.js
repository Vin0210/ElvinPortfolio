/**
 * Shared stagger variants for section headers (tag -> title -> subtitle).
 * Subtle fade + slide, ~100ms per child, ease-out (no bounce).
 */
export const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

export const headerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};