import { ReactNode } from 'react';

export type ToastFeedback = 'positive' | 'destructive';
export type ToastStyle = 'basic' | ToastFeedback;

export interface ToastBaseProps {
  title: ReactNode;
  caption?: ReactNode;
  closeButtonFn?: () => void;
}

export interface ToastFeedbackProps extends ToastBaseProps {
  feedback?: ToastFeedback;
}

export interface ToastDivProps {
  toastStyle: ToastStyle;
}

export interface ToastFeedbackIconProps {
  feedback: ToastFeedback;
}
