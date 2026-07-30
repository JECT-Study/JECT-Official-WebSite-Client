import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { visuallyHidden } from "utils";

import { Toast } from "./Toast";
import { stackContainer } from "./toast.css";
import type { ToastHandler } from "./toast.types";
import { toastController } from "./toastController";
import { useToastProvider } from "./useToastProvider";

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

  const [statusAnnouncement, setStatusAnnouncement] = useState("");
  const [alertAnnouncement, setAlertAnnouncement] = useState("");

  const statusAnnouncementSpaceToggleRef = useRef(false);
  const alertAnnouncementSpaceToggleRef = useRef(false);
  const announcedToastIdsRef = useRef<Set<string>>(new Set());

  const latestToast = toasts.length > 0 ? toasts[toasts.length - 1] : null;

  const latestToastId = latestToast?.id;
  const latestToastTitle = latestToast?.title;
  const latestToastDescription = latestToast?.description;
  const latestToastFeedback = latestToast?.feedback;

  useEffect(() => {
    toastController.setHandler(handler);
    return () => toastController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!latestToastId) {
      setStatusAnnouncement("");
      setAlertAnnouncement("");
      return;
    }

    /**
     * [A11y] 최신 토스트가 먼저 제거되면 이미 낭독한 이전 토스트가
     * 다시 latest가 될 수 있습니다. 신규 id만 live region에 반영해
     * 같은 토스트가 반복 낭독되지 않도록 합니다.
     */
    if (announcedToastIdsRef.current.has(latestToastId)) return;
    announcedToastIdsRef.current.add(latestToastId);

    const baseText = [latestToastTitle, latestToastDescription].filter(Boolean).join(" ");

    /**
     * [A11y] VoiceOver는 live region에 이전과 동일한 문자열이 다시 들어오면
     * 새 알림으로 인식하지 않아 낭독을 건너뛰는 경우가 있습니다.
     * 사용자에게 들리지 않는 zero-width space(\u200B)를 1개/2개로 번갈아 붙여
     * 화면에 보이는 문구는 유지하면서 각 live region의 DOM 텍스트 변경을 확실히 만듭니다.
     * status와 alert가 toggle을 공유하면 교차 알림 이후 동일 문구의
     * state가 같아질 수 있으므로, live region별 toggle을 독립적으로 관리합니다.
     */
    if (latestToastFeedback === "destructive") {
      alertAnnouncementSpaceToggleRef.current = !alertAnnouncementSpaceToggleRef.current;
      const invisibleSpace = alertAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setAlertAnnouncement(`${baseText}${invisibleSpace}`);
    } else {
      statusAnnouncementSpaceToggleRef.current = !statusAnnouncementSpaceToggleRef.current;
      const invisibleSpace = statusAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
      setStatusAnnouncement(`${baseText}${invisibleSpace}`);
    }
  }, [latestToastId, latestToastTitle, latestToastDescription, latestToastFeedback]);

  useEffect(() => {
    // 큐에서 제거된 토스트 id를 정리해 낭독 완료 목록이 계속 누적되지 않도록 한다.
    const activeToastIds = new Set(toasts.map(toast => toast.id));

    announcedToastIdsRef.current.forEach(id => {
      if (!activeToastIds.has(id)) announcedToastIdsRef.current.delete(id);
    });
  }, [toasts]);

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
