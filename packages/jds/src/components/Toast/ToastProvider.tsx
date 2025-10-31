import { createContext, useContext, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastStackContainer } from './toast.styles';
import { useToastProvider } from './useToastProvider';
import { ToastHandler } from './toast.types';

export const toast: ToastHandler = {
  basic: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
  positive: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
  destructive: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
};

interface ToastContextType {
  toast: ToastHandler;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, toast: handler, removeToast } = useToastProvider({});

  useEffect(() => {
    toast.basic = handler.basic;
    toast.positive = handler.positive;
    toast.destructive = handler.destructive;
  }, [handler]);

  return (
    <ToastContext.Provider value={{ toast: handler, removeToast }}>
      {children}
      {createPortal(
        <ToastStackContainer>
          {toasts.map(toast =>
            toast.type === 'basic' ? (
              <Toast.Basic
                id={toast.id!}
                key={toast.id}
                onRemove={() => removeToast(toast.id!)}
                {...toast}
              />
            ) : (
              <Toast.Feedback
                id={toast.id!}
                key={toast.id}
                variant={toast.type}
                onRemove={() => removeToast(toast.id!)}
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
  if (!context) throw new Error('useToast must be used within ToastProvider');

  return context;
};
