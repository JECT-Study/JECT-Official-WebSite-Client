import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButtonBasicProps } from '../Button/IconButton';

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
  errorMessage?: ReactNode;
  readonly?: boolean;
  downloadDisabled?: boolean;
  buttonProps?: Omit<IconButtonBasicProps, 'size' | 'hierarchy' | 'icon'>;
}
