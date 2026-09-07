import type { LimitedQueueProviderBaseItem } from "@/hooks/useLimitedQueueProvider";

export type SnackbarFeedback = "none" | "positive" | "destructive" | "notifying";
export type SnackbarFeedbackVariant = Exclude<SnackbarFeedback, "none">;

export interface SnackbarActionProps {
  label: string;
  onClick: () => void;
}

export interface SnackbarOptions {
  description?: string;
  duration?: number;
  withCloseButton?: boolean;
}

export interface SnackbarBaseProps extends SnackbarActionProps, SnackbarOptions {
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

type SnackbarHandlerFn = (
  title: string,
  label: SnackbarActionProps["label"],
  onClick: SnackbarActionProps["onClick"],
  options?: SnackbarOptions,
) => void;

export interface SnackbarHandler {
  basic: SnackbarHandlerFn;
  positive: SnackbarHandlerFn;
  destructive: SnackbarHandlerFn;
  notifying: SnackbarHandlerFn;
}
