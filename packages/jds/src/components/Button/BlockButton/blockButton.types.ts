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
export type BlockButtonFeedback = "positive" | "destructive";

/** @deprecated `BlockButtonFeedback`를 사용하세요. */
export type FeedbackIntent = BlockButtonFeedback;

export interface BaseBlockButtonProps extends ComponentPropsWithoutRef<"button"> {
  'data-part'?: never;
  children: ReactNode;
  size?: BlockButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export type BlockButtonProps = BaseBlockButtonProps &
  (
    | { hierarchy?: BlockButtonHierarchy; variant?: BlockButtonStyle; feedback?: never }
    | { feedback?: BlockButtonFeedback; hierarchy?: never; variant?: never }
  );

// TODO(deprecation): 호출부 마이그레이션 완료 후 아래 deprecated 타입과 .Basic/.Feedback 별칭 제거
/** @deprecated `<BlockButton hierarchy variant>`를 사용하세요. */
export interface BlockButtonBasicProps extends BaseBlockButtonProps {
  variant?: BlockButtonStyle;
  hierarchy?: BlockButtonHierarchy;
}
/** @deprecated `<BlockButton feedback>`를 사용하세요. */
export interface BlockButtonFeedbackProps extends BaseBlockButtonProps {
  intent?: BlockButtonFeedback;
}
