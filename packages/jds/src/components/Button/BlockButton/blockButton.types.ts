import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { IconName } from "../../Icon";

export const BLOCK_BUTTON_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const BLOCK_BUTTON_HIERARCHY_OPTIONS = ["accent", "primary", "secondary"] as const;
export const BLOCK_BUTTON_VARIANT_OPTIONS = ["solid", "outlined", "hollow"] as const;
export const BLOCK_BUTTON_FEEDBACK_OPTIONS = ["positive", "destructive"] as const;

export type BlockButtonSize = (typeof BLOCK_BUTTON_SIZE_OPTIONS)[number];
export type BlockButtonHierarchy = (typeof BLOCK_BUTTON_HIERARCHY_OPTIONS)[number];
export type BlockButtonVariant = (typeof BLOCK_BUTTON_VARIANT_OPTIONS)[number];
export type BlockButtonFeedback = (typeof BLOCK_BUTTON_FEEDBACK_OPTIONS)[number];

export interface BaseBlockButtonProps extends ComponentPropsWithoutRef<"button"> {
  "data-part"?: never;
  children: ReactNode;
  size?: BlockButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export type BlockButtonProps = BaseBlockButtonProps &
  (
    | { hierarchy?: BlockButtonHierarchy; variant?: BlockButtonVariant; feedback?: never }
    | { feedback?: BlockButtonFeedback; hierarchy?: never; variant?: never }
  );
