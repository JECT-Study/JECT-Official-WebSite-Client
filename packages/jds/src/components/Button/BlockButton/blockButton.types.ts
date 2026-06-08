import type { IconName } from "components";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const BLOCK_BUTTON_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const BLOCK_BUTTON_HIERARCHY_OPTIONS = [
  "accent",
  "primary",
  "secondary",
  "tertiary",
] as const;
export const BLOCK_BUTTON_STYLE_OPTIONS = ["solid", "outlined", "empty"] as const;

export type BlockButtonSize = (typeof BLOCK_BUTTON_SIZE_OPTIONS)[number];
export type BlockButtonHierarchy = (typeof BLOCK_BUTTON_HIERARCHY_OPTIONS)[number];
export type BlockButtonStyle = (typeof BLOCK_BUTTON_STYLE_OPTIONS)[number];
export type FeedbackIntent = "positive" | "destructive";

export interface BaseBlockButtonProps extends ComponentPropsWithoutRef<"button"> {
  'data-part'?: never;
  children: ReactNode;
  size?: BlockButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export interface BlockButtonBasicProps extends BaseBlockButtonProps {
  variant?: BlockButtonStyle;
  hierarchy?: BlockButtonHierarchy;
}

export interface BlockButtonFeedbackProps extends BaseBlockButtonProps {
  intent?: FeedbackIntent;
}
