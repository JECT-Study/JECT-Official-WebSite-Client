import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { visuallyHidden } from "utils";

import { Snackbar } from "./Snackbar";
import { stackContainer } from "./snackbar.css";
import type { SnackbarHandler } from "./snackbar.types";
import { snackbarController } from "./snackbarController";
import { useSnackbarProvider } from "./useSnackbarProvider";

import { useLiveRegionAnnouncements } from "@/hooks/useLiveRegionAnnouncements";

interface SnackbarProviderProps {
  children: ReactNode;
  duration?: number;
}

interface SnackbarContextType {
  snackbar: SnackbarHandler;
  removeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children, duration }: SnackbarProviderProps) => {
  const { snackbars, snackbar: handler, removeSnackbar } = useSnackbarProvider();
  const [isMounted, setIsMounted] = useState(false);
  const { statusAnnouncement, alertAnnouncement } = useLiveRegionAnnouncements(
    snackbars,
    snackbar => snackbar.label,
  );

  useEffect(() => {
    snackbarController.setHandler(handler);
    return () => snackbarController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbar: handler, removeSnackbar }}>
      {children}

      {/* 스크린리더 전용 live region: feedback에 맞는 영역에서 최신 스낵바만 낭독 */}
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {statusAnnouncement}
      </div>
      <div className={visuallyHidden} role='alert' aria-live='assertive' aria-atomic='true'>
        {alertAnnouncement}
      </div>

      {/* 시각용 스택: 자동 낭독은 live region이 담당하되, 액션과 닫기 버튼에 접근할 수 있도록 접근성 트리에 유지 */}
      {isMounted &&
        createPortal(
          <div className={stackContainer}>
            {snackbars.map(snackbar => (
              <Snackbar
                key={snackbar.id}
                onRemove={() => removeSnackbar(snackbar.id)}
                {...snackbar}
                duration={snackbar.duration ?? duration}
              />
            ))}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");

  return context;
};
