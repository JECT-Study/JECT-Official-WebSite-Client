import { ReactNode } from 'react';
import { BlockButtonBasicProps } from '../Button/BlockButton';

export type SnackbarVariant = 'positive' | 'destructive';
export type SnackbarStyle = 'basic' | SnackbarVariant;

export interface SnackbarButtonsProps {
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
}

export interface SnackbarBaseProps {
  id: string;
  title: ReactNode;
  caption?: ReactNode;
  prefixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  suffixButtonProps?: Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;
  onRemove?: () => void;
}

export interface SnackbarVariantProps extends SnackbarBaseProps {
  variant?: SnackbarVariant;
}

export interface SnackbarDivProps {
  snackbarStyle: SnackbarStyle;
}

export interface SnackbarFeedbackIconProps {
  variant: SnackbarVariant;
}

export interface UseSnackbarProviderProps {
  snackbarLimit?: number;
}

type SnackbarButtonProps = Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;

export interface SnackbarItem {
  id?: string;
  type: SnackbarStyle;
  title: string;
  caption?: string;
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

export interface SnackbarHandlerParam {
  title: string;
  caption?: string;
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

export interface SnackbarHandler {
  basic: (snackbarFnParam: SnackbarHandlerParam) => void;
  positive: (snackbarFnParam: SnackbarHandlerParam) => void;
  destructive: (snackbarFnParam: SnackbarHandlerParam) => void;
}
