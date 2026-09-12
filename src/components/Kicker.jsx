import React, { useEffect, useState } from 'react';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';

const GLYPHS = ['#', '%', '@'];

/**
 * Section kicker with a deadpan mono flicker: the index scrambles for
 * ~260ms the first time it scrolls into view, then sits still.
 * Static text when reduced motion is preferred.
 */
const Kicker = ({ index, label }) => {
  const [ref, inView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(index);

  useEffect(() => {
    if (!inView || reduced) return;
    let alive = true;
    const pick = () => index.charAt(0) + GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    const timers = [
      setTimeout(() => alive && setShown(pick()), 60),
      setTimeout(() => alive && setShown(index), 150),
      setTimeout(() => alive && setShown(pick()), 190),
      setTimeout(() => alive && setShown(index), 270),
    ];
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced, index]);

  return (
    <p ref={ref} className="section-kicker">
      <span className="kicker-index">{shown}</span> / {label}
    </p>
  );
};

export default React.memo(Kicker);
