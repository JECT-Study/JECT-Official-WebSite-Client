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

type ToastHandlerFn = (title: ReactNode, options?: ToastOptions) => void;

export interface ToastHandler {
  basic: ToastHandlerFn;
  positive: ToastHandlerFn;
  destructive: ToastHandlerFn;
  notifying: ToastHandlerFn;
}

export interface UseToastProviderProps {
  toastLimit?: number;
}

export interface ToastOptions {
  description?: ReactNode;
  duration?: number;
}
