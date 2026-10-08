import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import type { IconName } from "../../Icon";

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

export interface BaseLabelButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "disabled"
> {
  "data-part"?: never;
  size?: LabelButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

interface LabelButtonNativeProps {
  asChild?: false;
  disabled?: boolean;
  children: ReactNode;
}

interface LabelButtonCustomProps {
  asChild: true;
  disabled?: never;
  children: ReactElement;
}

/**
 * `asChild`와 `disabled`는 동시에 사용할 수 없다.
 *
 * asChild로 라우팅 컴포넌트를 전달하면 이동을 자식 요소가 제어하므로,
 * 비활성 상태는 asChild 없이 `<LabelButton disabled>`로 표현한다.
 */
export type LabelButtonProps = BaseLabelButtonProps &
  (
    | { hierarchy?: LabelButtonHierarchy; feedback?: never }
    | { feedback?: LabelButtonFeedback; hierarchy?: never }
  ) &
  (LabelButtonNativeProps | LabelButtonCustomProps);
