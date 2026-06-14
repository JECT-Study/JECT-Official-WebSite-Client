import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Toast } from "./Toast";
import { stackContainer } from "./toast.css";
import type { ToastHandler } from "./toast.types";
import { toastController } from "./toastController";
import { useToastProvider } from "./useToastProvider";

interface ToastContextType {
  toast: ToastHandler;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, toast: handler, removeToast } = useToastProvider({});
  const [isMounted, setIsMounted] = useState(false);

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
      {isMounted &&
        createPortal(
          <div className={stackContainer} role='status' aria-live='polite' aria-atomic='true'>
            {toasts.map(toast => (
              <Toast key={toast.id} onRemove={() => removeToast(toast.id)} {...toast} />
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
