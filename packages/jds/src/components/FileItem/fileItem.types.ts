import type { ComponentPropsWithoutRef, ReactNode } from "react";

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

export interface FileItemProps extends ComponentPropsWithoutRef<"button"> {
  fileName: ReactNode;
  fileSize?: ReactNode;
  readonly?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: ReactNode;
  suffixButton?: ReactNode;
}
