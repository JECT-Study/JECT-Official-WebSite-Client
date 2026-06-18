import type { ReactNode } from "react";

import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type ToastFeedback = "none" | "positive" | "destructive" | "notifying";
export type ToastFeedbackVariant = Exclude<ToastFeedback, "none">;

export interface ToastBaseProps {
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
}

export type ToastBase = ToastBaseProps & LimitedQueueProviderBaseItem;

export interface ToastProps extends ToastBase {
  feedback?: ToastFeedback;
  onRemove?: () => void;
}

export interface ToastItem extends ToastBase {
  feedback: ToastFeedback;
}

export interface ToastHandler {
  basic: (title: string, options?: ToastOptions) => void;
  positive: (title: string, options?: ToastOptions) => void;
  destructive: (title: string, options?: ToastOptions) => void;
  notifying: (title: string, options?: ToastOptions) => void;
}

export interface UseToastProviderProps {
  toastLimit?: number;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
}
