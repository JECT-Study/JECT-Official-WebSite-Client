import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastStyle } from './toast.types';
import { ToastStackContainer } from './toast.styles';

interface ToastItem {
  id?: number;
  type: ToastStyle;
  title: string;
  caption?: string;
}

interface ToastHandler {
  basic: (title: string, caption?: string) => void;
  positive: (title: string, caption?: string) => void;
  destructive: (title: string, caption?: string) => void;
}

export const toast: ToastHandler = {
  basic: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
  positive: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
  destructive: () => console.warn('ToastProvider가 아직 등록되지 않았습니다.'),
};

interface ToastContextType {
  toast: ToastHandler;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: ToastItem) => {
    const id = Date.now();
    const newToast = { id, ...toast };

    if (toasts.length >= 3) removeToast(toasts[0].id!);
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => removeToast(id), 3000);

    return id;
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handler: ToastHandler = {
    basic: (title: string, caption?: string) => addToast({ type: 'basic', title, caption }),
    positive: (title: string, caption?: string) => addToast({ type: 'positive', title, caption }),
    destructive: (title: string, caption?: string) =>
      addToast({ type: 'destructive', title, caption }),
  };

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
              <Toast.Basic key={toast.id} closeButtonFn={() => removeToast(toast.id!)} {...toast} />
            ) : (
              <Toast.Feedback
                key={toast.id}
                feedback={toast.type}
                closeButtonFn={() => removeToast(toast.id!)}
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
