import { useEffect, useRef, useState } from 'react';

/**
 * Observe once: returns [ref, inView]. inView flips true the first time
 * the element enters the viewport and stays true. Falls back to true
 * when IntersectionObserver is unavailable so content is never hidden.
 */
export function useInViewOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}
