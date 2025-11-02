import { ReactNode } from 'react';

export type ToastVariant = 'positive' | 'destructive';
export type ToastStyle = 'basic' | ToastVariant;

export interface ToastBaseProps {
  id: string;
  title: ReactNode;
  caption?: ReactNode;
  onRemove?: () => void;
  isClosing?: boolean;
}

export interface ToastFeedbackProps extends ToastBaseProps {
  variant?: ToastVariant;
}

export interface ToastDivProps {
  toastStyle: ToastStyle;
}

export interface ToastFeedbackIconProps {
  variant: ToastVariant;
}

export interface UseToastProviderProps {
  toastLimit?: number;
}

export interface ToastItem {
  id?: string;
  type: ToastStyle;
  title: string;
  caption?: string;
  isClosing?: boolean;
}

export interface ToastHandler {
  basic: (title: string, caption?: string) => void;
  positive: (title: string, caption?: string) => void;
  destructive: (title: string, caption?: string) => void;
}
