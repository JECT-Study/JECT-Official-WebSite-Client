import type { ReactNode } from "react";

import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type ToastFeedback = "none" | "positive" | "destructive" | "notifying";
export type ToastVariant = Exclude<ToastFeedback, "none">;

export interface ToastBaseProps {
  title: ReactNode;
  description?: ReactNode;
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
  basic: (title: string, description?: string) => void;
  positive: (title: string, description?: string) => void;
  destructive: (title: string, description?: string) => void;
  notifying: (title: string, description?: string) => void;
}

export interface UseToastProviderProps {
  toastLimit?: number;
}
