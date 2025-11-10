import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButtonBasicProps } from '../Button/IconButton';

export interface FileItemColorStateType {
  hasError?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export interface FileItemColorType {
  defaultColor: string;
  errorColor?: string;
  disabledColor?: string;
  readonlyColor?: string;
}

export interface FileItemWrapButtonProps {
  $disabled: boolean;
  $readonly: boolean;
  $hasError: boolean;
}

export interface FileItemIconProps {
  $readonly: boolean;
  $disabled: boolean;
  $hasError: boolean;
}

export interface FileItemLabelProps {
  $readonly: boolean;
  $disabled: boolean;
  $hasError: boolean;
}

export interface FileSizeProps {
  $disabled: boolean;
  $hasError: boolean;
}

export interface FileItemProps extends ComponentPropsWithoutRef<'button'> {
  fileName: ReactNode;
  fileSize?: ReactNode;
  hasError?: boolean;
  errorMessage?: ReactNode;
  readonly?: boolean;
  disabled?: boolean;
  buttonProps?: Omit<IconButtonBasicProps, 'size' | 'hierarchy' | 'icon'>;
}
