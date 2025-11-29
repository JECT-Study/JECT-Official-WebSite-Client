import type { ReactNode } from "react";

import type { BlockButtonBasicProps } from "../Button/BlockButton";

import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type SnackbarVariant = "positive" | "destructive";
export type SnackbarStyle = "basic" | SnackbarVariant;
export type SnackbarButtonProps = Omit<BlockButtonBasicProps, "hierarchy" | "size" | "variants">;

export interface SnackbarButtonsProps {
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

export interface SnackbarBaseProps {
  title: ReactNode;
  caption?: ReactNode;
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

export type SnackbarBase = SnackbarBaseProps & LimitedQueueProviderBaseItem;

export interface SnackbarBasicProps extends SnackbarBase {
  onRemove?: () => void;
}

export interface SnackbarFeedbackProps extends SnackbarBase {
  variant?: SnackbarVariant;
  onRemove?: () => void;
}

export interface SnackbarItem extends SnackbarBase {
  type: SnackbarStyle;
}

export interface SnackbarHandler {
  basic: (snackbarFnParam: SnackbarBaseProps) => void;
  positive: (snackbarFnParam: SnackbarBaseProps) => void;
  destructive: (snackbarFnParam: SnackbarBaseProps) => void;
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
