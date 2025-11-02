import { LimitedQueueProviderBaseItem } from '@/hooks/useLimitedQueueProvider';
import { ReactNode } from 'react';

export type ToastVariant = 'positive' | 'destructive';
export type ToastStyle = 'basic' | ToastVariant;

export interface ToastBaseProps {
  title: ReactNode;
  caption?: ReactNode;
}

export type ToastBase = ToastBaseProps & LimitedQueueProviderBaseItem;

export interface ToastBasicProps extends ToastBase {
  onRemove?: () => void;
}

export interface ToastFeedbackProps extends ToastBase {
  variant?: ToastVariant;
  onRemove?: () => void;
}

export interface ToastItem extends ToastBase {
  type: ToastStyle;
}

export interface ToastHandler {
  basic: (title: string, caption?: string) => void;
  positive: (title: string, caption?: string) => void;
  destructive: (title: string, caption?: string) => void;
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
