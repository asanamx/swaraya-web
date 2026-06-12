'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp
 * Animates a number from `start` to `end` when `trigger` becomes true.
 * Uses requestAnimationFrame for smooth motion.
 */
export default function useCountUp(end, { start = 0, duration = 1800, trigger = true, easing } = {}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);
  const startTsRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    cancelAnimationFrame(rafRef.current);
    startTsRef.current = null;

    const ease = easing || ((t) => 1 - Math.pow(1 - t, 3)); // easeOutCubic

    const step = (ts) => {
      if (startTsRef.current == null) startTsRef.current = ts;
      const elapsed = ts - startTsRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = ease(t);
      const current = start + (end - start) * eased;
      setValue(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, trigger]);

  return value;
}
