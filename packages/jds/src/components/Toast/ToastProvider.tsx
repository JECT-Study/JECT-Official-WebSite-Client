import type { ReactNode } from "react";
import { isValidElement } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Toast } from "./Toast";
import { stackContainer, visuallyHidden } from "./toast.css";
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

const extractTextFromNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join("");
  }
  if (isValidElement(node) && node.props && "children" in node.props) {
    return extractTextFromNode(node.props.children as ReactNode);
  }
  return "";
};

export const ToastProvider = ({ children, duration }: ToastProviderProps) => {
  const { toasts, toast: handler, removeToast } = useToastProvider({});
  const [isMounted, setIsMounted] = useState(false);

  const latestToast = toasts.length > 0 ? toasts[toasts.length - 1] : null;
  const safeAnnouncement = latestToast
    ? [extractTextFromNode(latestToast.title), extractTextFromNode(latestToast.description)]
        .filter(Boolean)
        .join(" ")
    : "";

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

      {/* 스크린리더 전용 live region: 최신 토스트만 낭독 */}
      <div className={visuallyHidden} role='status' aria-live='polite'>
        {safeAnnouncement}
      </div>

      {isMounted &&
        createPortal(
          // 시각용 스택: live region과 중복 낭독 방지
          <div className={stackContainer}>
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
