import { ReactNode } from 'react';
import { BlockButtonBasicProps } from '../Button/BlockButton';

export type SnackbarFeedback = 'positive' | 'destructive';
export type SnackbarStyle = 'basic' | SnackbarFeedback;

export interface SnackbarButtonsProps {
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
}

export interface SnackbarBaseProps {
  title: ReactNode;
  caption?: ReactNode;
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  closeButtonFn?: () => void;
  isExiting?: boolean;
}

export interface SnackbarFeedbackProps extends SnackbarBaseProps {
  feedback?: SnackbarFeedback;
}

export interface SnackbarDivProps {
  snackbarStyle: SnackbarStyle;
  isExiting: boolean;
}

export interface SnackbarFeedbackIconProps {
  feedback: SnackbarFeedback;
}
