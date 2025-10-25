import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButtonBasicProps } from '../Button/IconButton';

export interface FileItemColorStateType {
  hasError?: boolean;
  isDownloadDisabled?: boolean;
  readonly?: boolean;
}

export interface FileItemColorType {
  defaultColor: string;
  errorColor?: string;
  disabledColor?: string;
  readonlyColor?: string;
}

export interface FileItemWrapButtonProps {
  $isDownloadDisabled: boolean;
  $readonly: boolean;
  $hasError: boolean;
}

export interface FileItemIconProps {
  $readonly: boolean;
  $isDownloadDisabled: boolean;
  $hasError: boolean;
}

export interface FileItemLabelProps {
  $readonly: boolean;
  $isDownloadDisabled: boolean;
  $hasError: boolean;
}

export interface FileSizeProps {
  $isDownloadDisabled: boolean;
  $hasError: boolean;
}

export interface FileItemProps extends ComponentPropsWithoutRef<'button'> {
  fileName: ReactNode;
  fileSize?: ReactNode;
  errorMessage?: ReactNode;
  readonly?: boolean;
  isDownloadDisabled?: boolean;
  buttonProps?: Omit<IconButtonBasicProps, 'size' | 'hierarchy' | 'icon'>;
}
