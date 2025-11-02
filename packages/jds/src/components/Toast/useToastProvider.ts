import { useState, useCallback, useRef } from 'react';
import { ToastItem, UseToastProviderProps } from './toast.types';

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const removeResolvers = useRef<Map<string, () => void>>(new Map());

  const removeToast = useCallback((id: string) => {
    const resolver = removeResolvers.current.get(id);
    if (resolver) {
      resolver();
      removeResolvers.current.delete(id);
    }

    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id && !toast.isClosing ? { ...toast, isClosing: true } : toast,
      ),
    );
  }, []);

  const addToast = useCallback(
    async (toast: ToastItem) => {
      const id = `toast-${crypto.randomUUID()}`;
      const newToast = { id, ...toast };

      if (toasts.length >= toastLimit) {
        const firstActive = toasts[0];
        closeToast(firstActive.id!);

        await new Promise<void>(resolve => {
          removeResolvers.current.set(firstActive.id!, resolve);

          setTimeout(() => {
            if (removeResolvers.current.has(firstActive.id!)) {
              resolve();
              removeResolvers.current.delete(firstActive.id!);
            }
          }, 1500);
        });
      }

      setToasts(prev => [...prev, newToast]);

      return id;
    },
    [toasts, toastLimit],
  );

  const handler = {
    basic: (title: string, caption?: string) => addToast({ type: 'basic', title, caption }),
    positive: (title: string, caption?: string) => addToast({ type: 'positive', title, caption }),
    destructive: (title: string, caption?: string) =>
      addToast({ type: 'destructive', title, caption }),
  };

  return { toasts, toast: handler, removeToast };
};
