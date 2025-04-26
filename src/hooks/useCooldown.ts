import { useState, useRef, useEffect, useCallback } from 'react';

export const useCooldown = (duration: number) => {
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    setIsActive(true);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setIsActive(false);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { isActive, start };
};
