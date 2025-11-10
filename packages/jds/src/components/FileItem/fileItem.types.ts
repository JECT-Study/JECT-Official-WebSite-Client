import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButtonBasicProps } from '../Button/IconButton';

export interface FileItemWrapButtonProps {
  $disabled: boolean;
  $readonly: boolean;
  $hasError: boolean;
}

export interface FileItemLabelProps {
  $disabled: boolean;
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
