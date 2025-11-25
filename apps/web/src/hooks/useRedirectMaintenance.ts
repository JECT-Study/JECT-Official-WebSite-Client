import { toZonedTime } from "date-fns-tz";
import { useEffect, useRef } from "react";

import { PATH } from "@/constants/path";
import router from "@/router";
import type { PathValues } from "@/types/ui/path";

const TIME_THRESHOLD = 10 * 60 * 1000;

const useRedirectMaintenance = (startHours: number, endHours: number, redirectPath: PathValues) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkAndRedirect = () => {
      const now = new Date();
      const kstDate = toZonedTime(now, "Asia/Seoul");
      const nextKstTime = new Date(kstDate);
      const hours = kstDate.getHours();
      const isInMaintenance = hours >= startHours && hours < endHours;
      const isOnMaintenancePage = location.pathname === redirectPath;

      if (!isOnMaintenancePage && isInMaintenance) {
        const currentPath = location.pathname;

        sessionStorage.setItem("recoverPath", currentPath);
        void router.navigate(redirectPath);
      } else if (!isInMaintenance && isOnMaintenancePage) {
        const recoverPath = sessionStorage.getItem("recoverPath") ?? PATH.main;

        sessionStorage.removeItem("recoverPath");
        void router.navigate(recoverPath);
      }

      if (hours < startHours) {
        nextKstTime.setHours(startHours, 0, 0, 0);
      } else if (hours >= endHours) {
        nextKstTime.setDate(nextKstTime.getDate() + 1);
        nextKstTime.setHours(startHours, 0, 0, 0);
      } else {
        nextKstTime.setHours(endHours, 0, 0, 0);
      }

      const delay = nextKstTime.getTime() - kstDate.getTime();

      const timerTime = TIME_THRESHOLD < delay ? delay - TIME_THRESHOLD : delay;

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
