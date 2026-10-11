import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import type { IconName } from "../../Icon";

export const BLOCK_BUTTON_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const BLOCK_BUTTON_HIERARCHY_OPTIONS = ["accent", "primary", "secondary"] as const;
export const BLOCK_BUTTON_VARIANT_OPTIONS = ["solid", "outlined", "hollow"] as const;
export const BLOCK_BUTTON_FEEDBACK_OPTIONS = ["positive", "destructive"] as const;

export type BlockButtonSize = (typeof BLOCK_BUTTON_SIZE_OPTIONS)[number];
export type BlockButtonHierarchy = (typeof BLOCK_BUTTON_HIERARCHY_OPTIONS)[number];
export type BlockButtonVariant = (typeof BLOCK_BUTTON_VARIANT_OPTIONS)[number];
export type BlockButtonFeedback = (typeof BLOCK_BUTTON_FEEDBACK_OPTIONS)[number];

export interface BaseBlockButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "disabled"
> {
  "data-part"?: never;
  size?: BlockButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

interface BlockButtonBasicProps {
  hierarchy?: BlockButtonHierarchy;
  variant?: BlockButtonVariant;
  feedback?: never;
}

interface BlockButtonFeedbackProps {
  feedback?: BlockButtonFeedback;
  hierarchy?: never;
  variant?: never;
}

interface BlockButtonNativeProps {
  asChild?: false;
  disabled?: boolean;
  children: ReactNode;
}

interface BlockButtonCustomProps {
  asChild: true;
  disabled?: never;
  children: ReactElement;
}

/**
 * `asChild`와 `disabled`는 동시에 사용할 수 없다.
 *
 * asChild로 라우팅 컴포넌트를 전달하면 이동을 자식 요소가 제어하므로,
 * 비활성 상태는 asChild 없이 `<BlockButton disabled>`로 표현한다.
 */
export type BlockButtonProps = BaseBlockButtonProps &
  (BlockButtonBasicProps | BlockButtonFeedbackProps) &
  (BlockButtonNativeProps | BlockButtonCustomProps);
