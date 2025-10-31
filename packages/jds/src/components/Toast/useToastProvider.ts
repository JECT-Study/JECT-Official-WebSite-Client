import { useState, useCallback } from 'react';
import { ToastItem } from './ToastProvider';
import { UseToastProviderProps } from './toast.types';

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const closeToast = (id: string): Promise<void> => {
    return new Promise(resolve => {
      const toast = document.getElementById(id);
      if (!toast) return;
      if (toast.classList.contains('delete')) return;
      toast.classList.add('delete');

      toast.addEventListener('animationend', e => {
        if (e.target === toast) {
          removeToast(id);
          resolve();
        }
      });
    });
  };

  const addToast = useCallback(
    async (toast: ToastItem) => {
      const id = `toast-${Date.now()}`;
      const newToast = { id, ...toast };

      if (toasts.length >= toastLimit) {
        const firstActive = toasts[0];
        await closeToast(firstActive.id!);
      }

      setToasts(prev => [...prev, newToast]);

      return id;
    },
    [toasts, toastLimit],
  );

  const handler = {
    basic: (title: string, caption?: string) =>
      addToast({ type: 'basic', title, caption, isExiting: false }),
    positive: (title: string, caption?: string) =>
      addToast({ type: 'positive', title, caption, isExiting: false }),
    destructive: (title: string, caption?: string) =>
      addToast({ type: 'destructive', title, caption, isExiting: false }),
  };

  return { toasts, toast: handler, removeToast };
};
