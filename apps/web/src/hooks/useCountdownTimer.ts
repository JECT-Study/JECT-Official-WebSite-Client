import { useEffect, useRef, useState } from "react";

interface UseCountdownTimerReturn {
  seconds: number;
  isActive: boolean;
  start: (seconds: number) => void;
}

export function useCountdownTimer(): UseCountdownTimerReturn {
  const [seconds, setSeconds] = useState(0);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!endTimeRef.current) return;

    const timer = setTimeout(() => {
      const remainingSeconds = Math.max(0, Math.ceil((endTimeRef.current! - Date.now()) / 1000));

      setSeconds(remainingSeconds);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const start = (s: number) => {
    endTimeRef.current = Date.now() + s * 1000;
    setSeconds(s);
  };

  return { seconds, isActive: seconds > 0, start };
}
