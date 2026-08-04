import type { IconName } from "components";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const LABEL_BUTTON_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const LABEL_BUTTON_HIERARCHY_OPTIONS = [
  "accent",
  "primary",
  "secondary",
  "tertiary",
] as const;
export const LABEL_BUTTON_FEEDBACK_OPTIONS = ["positive", "destructive"] as const;

export type LabelButtonSize = (typeof LABEL_BUTTON_SIZE_OPTIONS)[number];
export type LabelButtonHierarchy = (typeof LABEL_BUTTON_HIERARCHY_OPTIONS)[number];
export type LabelButtonFeedback = (typeof LABEL_BUTTON_FEEDBACK_OPTIONS)[number];

export type BaseLabelButtonProps = ComponentPropsWithoutRef<"button"> & {
  "data-part"?: never;
  children: ReactNode;
  size?: LabelButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
};

export type LabelButtonProps = BaseLabelButtonProps &
  (
    | { hierarchy?: LabelButtonHierarchy; feedback?: never }
    | { feedback?: LabelButtonFeedback; hierarchy?: never }
  );
