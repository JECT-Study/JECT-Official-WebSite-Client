import { ReactNode } from 'react';
import { BlockButtonBasicProps } from '@/components';

export type ToastVariant = 'toast' | 'snackbar';
export type ToastFeedback = 'positive' | 'destructive';
export type ToastStyle = 'basic' | ToastFeedback;

export interface ToastButtonsProps {
  variant: ToastVariant;
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variant'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variant'>;
}

export interface ToastBaseProps {
  variant?: ToastVariant;
  caption?: ReactNode;
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variant'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variant'>;
  children: ReactNode;
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
