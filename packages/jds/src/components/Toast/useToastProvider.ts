import { ReactNode } from "react";

import type { ToastItem, ToastOptions, UseToastProviderProps } from "./toast.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useToastProvider = ({ toastLimit = 3 }: UseToastProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<ToastItem>({ limit: toastLimit });

  const handler = {
    basic: (title: ReactNode, options?: ToastOptions) =>
      addItem({ feedback: "none", title, ...options }),
    positive: (title: ReactNode, options?: ToastOptions) =>
      addItem({ feedback: "positive", title, ...options }),
    destructive: (title: ReactNode, options?: ToastOptions) =>
      addItem({ feedback: "destructive", title, ...options }),
    notifying: (title: ReactNode, options?: ToastOptions) =>
      addItem({ feedback: "notifying", title, ...options }),
  };

  return { toasts: items, toast: handler, removeToast: removeItem };
};
