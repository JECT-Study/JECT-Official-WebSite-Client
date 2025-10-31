import { ReactNode } from 'react';

export type ToastFeedback = 'positive' | 'destructive';
export type ToastStyle = 'basic' | ToastFeedback;

export interface ToastBaseProps {
  id: string;
  title: ReactNode;
  caption?: ReactNode;
  onRemove?: () => void;
}

export interface ToastFeedbackProps extends ToastBaseProps {
  variant?: ToastFeedback;
}

export interface ToastDivProps {
  toastStyle: ToastStyle;
}

export interface ToastFeedbackIconProps {
  variant: ToastFeedback;
}

export interface UseToastProviderProps {
  toastLimit?: number;
}

// Provider props
export interface ToastItem {
  id?: string;
  type: ToastStyle;
  title: string;
  caption?: string;
  isExiting?: boolean;
}

export interface ToastHandler {
  basic: (title: string, caption?: string) => void;
  positive: (title: string, caption?: string) => void;
  destructive: (title: string, caption?: string) => void;
}
