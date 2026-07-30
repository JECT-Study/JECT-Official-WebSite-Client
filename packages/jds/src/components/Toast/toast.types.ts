import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type ToastFeedback = "none" | "positive" | "destructive" | "notifying";
export type ToastFeedbackVariant = Exclude<ToastFeedback, "none">;

export interface ToastBaseProps {
  title: string;
  description?: string;
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

type ToastHandlerFn = (title: string, options?: ToastOptions) => void;

export interface ToastHandler {
  basic: ToastHandlerFn;
  positive: ToastHandlerFn;
  destructive: ToastHandlerFn;
  notifying: ToastHandlerFn;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
}
