import { TOAST_QUEUE_FALLBACK_TIMEOUT, TOAST_QUEUE_LIMIT } from "./toast.constants";
import type { ToastItem, ToastOptions } from "./toast.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useToastProvider = () => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<ToastItem>({
    limit: TOAST_QUEUE_LIMIT,
    fallbackTimeout: TOAST_QUEUE_FALLBACK_TIMEOUT,
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
