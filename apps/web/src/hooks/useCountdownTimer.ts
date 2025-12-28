import { useEffect, useState } from "react";

interface UseCountdownTimerReturn {
  seconds: number;
  isActive: boolean;
  start: (seconds: number) => void;
}

export function useCountdownTimer(): UseCountdownTimerReturn {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const start = (s: number) => setSeconds(s);

  return { seconds, isActive: seconds > 0, start };
}
