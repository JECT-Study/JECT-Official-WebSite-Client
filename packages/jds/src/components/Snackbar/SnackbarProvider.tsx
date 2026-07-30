import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { visuallyHidden } from "utils";

import { Snackbar } from "./Snackbar";
import { stackContainer } from "./snackbar.css";
import type { SnackbarHandler } from "./snackbar.types";
import { snackbarController } from "./snackbarController";
import { useSnackbarProvider } from "./useSnackbarProvider";

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

  const [statusAnnouncement, setStatusAnnouncement] = useState("");
  const [alertAnnouncement, setAlertAnnouncement] = useState("");

  const announcementSpaceToggleRef = useRef(false);
  const announcedSnackbarIdsRef = useRef<Set<string>>(new Set());

  const latestSnackbar = snackbars.length > 0 ? snackbars[snackbars.length - 1] : null;

  const latestSnackbarId = latestSnackbar?.id;
  const latestSnackbarTitle = latestSnackbar?.title;
  const latestSnackbarDescription = latestSnackbar?.description;
  const latestSnackbarFeedback = latestSnackbar?.feedback;

  useEffect(() => {
    snackbarController.setHandler(handler);
    return () => snackbarController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!latestSnackbarId) {
      setStatusAnnouncement("");
      setAlertAnnouncement("");
      return;
    }

    /**
     * [A11y] 최신 스낵바가 먼저 제거되면 이미 낭독한 이전 스낵바가
     * 다시 latest가 될 수 있습니다. 신규 id만 live region에 반영해
     * 같은 스낵바가 반복 낭독되지 않도록 합니다.
     */
    if (announcedSnackbarIdsRef.current.has(latestSnackbarId)) return;
    announcedSnackbarIdsRef.current.add(latestSnackbarId);

    const baseText = [latestSnackbarTitle, latestSnackbarDescription].filter(Boolean).join(" ");

    /**
     * [A11y] VoiceOver는 live region에 이전과 동일한 문자열이 다시 들어오면
     * 새 알림으로 인식하지 않아 낭독을 건너뛰는 경우가 있습니다.
     * 사용자에게 들리지 않는 zero-width space(\u200B)를 1개/2개로 번갈아 붙여
     * 화면에 보이는 문구는 유지하면서 DOM 텍스트 변경을 확실히 만듭니다.
     */
    announcementSpaceToggleRef.current = !announcementSpaceToggleRef.current;
    const invisibleSpace = announcementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";
    const announcement = `${baseText}${invisibleSpace}`;

    if (latestSnackbarFeedback === "destructive") {
      setAlertAnnouncement(announcement);
    } else {
      setStatusAnnouncement(announcement);
    }
  }, [latestSnackbarId, latestSnackbarTitle, latestSnackbarDescription, latestSnackbarFeedback]);

  useEffect(() => {
    // 큐에서 제거된 스낵바 id를 정리해 낭독 완료 목록이 계속 누적되지 않도록 한다.
    const activeSnackbarIds = new Set(snackbars.map(snackbar => snackbar.id));

    announcedSnackbarIdsRef.current.forEach(id => {
      if (!activeSnackbarIds.has(id)) announcedSnackbarIdsRef.current.delete(id);
    });
  }, [snackbars]);

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
