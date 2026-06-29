import { TOAST_TIMER } from "./Toast";
import type { ToastItem, ToastOptions, UseToastProviderProps } from "./toast.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<ToastItem>({
    limit: toastLimit,
    fallbackTimeout: TOAST_TIMER.QUEUE_FALLBACK,
  });

  const handler = {
    basic: (title: string, options?: ToastOptions) =>
      addItem({ feedback: "none", title, ...options }),
    positive: (title: string, options?: ToastOptions) =>
      addItem({ feedback: "positive", title, ...options }),
    destructive: (title: string, options?: ToastOptions) =>
      addItem({ feedback: "destructive", title, ...options }),
    notifying: (title: string, options?: ToastOptions) =>
      addItem({ feedback: "notifying", title, ...options }),
  };

  return { toasts: items, toast: handler, removeToast: removeItem };
};
