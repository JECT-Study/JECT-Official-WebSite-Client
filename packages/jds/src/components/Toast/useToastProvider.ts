import type { ToastItem, UseToastProviderProps } from "./toast.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<ToastItem>({ limit: toastLimit });

  const handler = {
    basic: (title: string, description?: string) =>
      addItem({ feedback: "none", title, description }),
    positive: (title: string, description?: string) =>
      addItem({ feedback: "positive", title, description }),
    destructive: (title: string, description?: string) =>
      addItem({ feedback: "destructive", title, description }),
    notifying: (title: string, description?: string) =>
      addItem({ feedback: "notifying", title, description }),
  };

  return { toasts: items, toast: handler, removeToast: removeItem };
};
