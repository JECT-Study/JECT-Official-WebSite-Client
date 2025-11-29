import type { ReactNode } from "react";
import { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

import { Toast } from "./Toast";
import { ToastStackContainer } from "./toast.styles";
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

  useEffect(() => {
    toastController.setHandler(handler);
    return () => toastController.clearHandler();
  }, [handler]);

  return (
    <ToastContext.Provider value={{ toast: handler, removeToast }}>
      {children}
      {createPortal(
        <ToastStackContainer>
          {toasts.map(toast =>
            toast.type === "basic" ? (
              <Toast.Basic key={toast.id} onRemove={() => removeToast(toast.id)} {...toast} />
            ) : (
              <Toast.Feedback
                key={toast.id}
                variant={toast.type}
                onRemove={() => removeToast(toast.id)}
                {...toast}
              />
            ),
          )}
        </ToastStackContainer>,
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
