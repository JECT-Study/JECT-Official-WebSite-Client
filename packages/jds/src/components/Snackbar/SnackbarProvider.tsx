import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Snackbar } from "./Snackbar";
import { stackContainer, visuallyHidden } from "./snackbar.css";
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

  const [announcement, setAnnouncement] = useState("");
  const announcementSpaceToggleRef = useRef(false);

  const latestSnackbar = snackbars.length > 0 ? snackbars[snackbars.length - 1] : null;
  
  const latestSnackbarId = latestSnackbar?.id;
  const latestSnackbarTitle = latestSnackbar?.title;
  const latestSnackbarDescription = latestSnackbar?.description;

  useEffect(() => {
    snackbarController.setHandler(handler);
    return () => snackbarController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!latestSnackbarId) return;

    const baseText = [latestSnackbarTitle, latestSnackbarDescription].filter(Boolean).join(" ");

    /**
     * [A11y] VoiceOver는 live region에 이전과 동일한 문자열이 다시 들어오면
     * 새 알림으로 인식하지 않아 낭독을 건너뛰는 경우가 있습니다.
     * 사용자에게 들리지 않는 zero-width space(\u200B)를 1개/2개로 번갈아 붙여
     * 화면에 보이는 문구는 유지하면서 DOM 텍스트 변경을 확실히 만듭니다.
     */
    announcementSpaceToggleRef.current = !announcementSpaceToggleRef.current;
    const invisibleSpace = announcementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";

    setAnnouncement(`${baseText}${invisibleSpace}`);
  }, [latestSnackbarId, latestSnackbarTitle, latestSnackbarDescription]);

  return (
    <SnackbarContext.Provider value={{ snackbar: handler, removeSnackbar }}>
      {children}

      {/* 스크린리더 전용 live region: 최신 스낵바만 낭독 */}
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {announcement}
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
