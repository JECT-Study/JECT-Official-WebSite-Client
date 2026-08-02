import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { visuallyHidden } from "utils";

import { Toast } from "./Toast";
import { stackContainer } from "./toast.css";
import type { ToastHandler } from "./toast.types";
import { toastController } from "./toastController";
import { useToastProvider } from "./useToastProvider";

import { useLiveRegionAnnouncements } from "@/hooks/useLiveRegionAnnouncements";

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

interface ToastContextType {
  toast: ToastHandler;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children, duration }: ToastProviderProps) => {
  const { toasts, toast: handler, removeToast } = useToastProvider();
  const [isMounted, setIsMounted] = useState(false);
  const { statusAnnouncement, alertAnnouncement } = useLiveRegionAnnouncements(toasts);

  useEffect(() => {
    toastController.setHandler(handler);
    return () => toastController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: handler, removeToast }}>
      {children}

      {/* 스크린리더 전용 live region: feedback에 맞는 영역에서 최신 토스트만 낭독 */}
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {statusAnnouncement}
      </div>
      <div className={visuallyHidden} role='alert' aria-live='assertive' aria-atomic='true'>
        {alertAnnouncement}
      </div>

      {/* 시각용 스택: 자동 낭독은 live region이 담당하므로, 상호작용 요소가 없는 스택은 중복 탐색을 막기 위해 숨김 */}
      {isMounted &&
        createPortal(
          <div className={stackContainer} aria-hidden='true'>
            {toasts.map(toast => (
              <Toast
                key={toast.id}
                onRemove={() => removeToast(toast.id)}
                {...toast}
                duration={toast.duration ?? duration}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");

  return context;
};
