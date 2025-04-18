import { useEffect, useRef } from 'react';

import router from '@/router';
import { PathValues } from '@/types/ui/path';

const TIME_THRESHOLD = 10 * 60 * 1000;

const useRedirectMaintenance = (startHours: number, endHours: number, redirectPath: PathValues) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const checkAndRedirect = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= startHours && hours < endHours) {
        return router.navigate(redirectPath);
      }

      const nextTime = new Date();

      if (hours < startHours) {
        nextTime.setHours(startHours, 0, 0, 0);
      } else if (hours >= endHours) {
        nextTime.setDate(nextTime.getDate() + 1);
        nextTime.setHours(startHours, 0, 0, 0);
      }

      const delay = nextTime.getTime() - now.getTime();

      const timerTime = TIME_THRESHOLD < delay ? delay / 2 : delay;

      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        void checkAndRedirect();
      }, timerTime);
    };

    void checkAndRedirect();

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [startHours, endHours, redirectPath]);
};

export default useRedirectMaintenance;
