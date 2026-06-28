import type { LabelButtonBasicProps } from "../Button/LabelButton";

import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type SnackbarFeedback = "none" | "positive" | "destructive" | "notifying";
export type SnackbarFeedbackVariant = Exclude<SnackbarFeedback, "none">;
export type SnackbarLabelButtonProps = Omit<LabelButtonBasicProps, "hierarchy" | "size">;

export interface SnackbarOptions {
  description?: string;
  duration?: number;
  labelButtonProps?: SnackbarLabelButtonProps;
  withCloseButton?: boolean;
}

export interface SnackbarBaseProps extends SnackbarOptions {
  title: string;
}

export type SnackbarBase = SnackbarBaseProps & LimitedQueueProviderBaseItem;

export interface SnackbarProps extends SnackbarBase {
  feedback?: SnackbarFeedback;
  onRemove?: () => void;
}

export interface SnackbarItem extends SnackbarBase {
  feedback: SnackbarFeedback;
}

type SnackbarHandlerFn = (title: string, options?: SnackbarOptions) => void;

export interface SnackbarHandler {
  basic: SnackbarHandlerFn;
  positive: SnackbarHandlerFn;
  destructive: SnackbarHandlerFn;
  notifying: SnackbarHandlerFn;
}

export interface UseSnackbarProviderProps {
  snackbarLimit?: number;
}
