import type { ToastItem, UseToastProviderProps } from "./toast.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<ToastItem>({ limit: toastLimit });

  const handler = {
    basic: (title: string, caption?: string) => addItem({ type: "basic", title, caption }),
    positive: (title: string, caption?: string) => addItem({ type: "positive", title, caption }),
    destructive: (title: string, caption?: string) =>
      addItem({ type: "destructive", title, caption }),
  };

  return { toasts: items, toast: handler, removeToast: removeItem };
};
