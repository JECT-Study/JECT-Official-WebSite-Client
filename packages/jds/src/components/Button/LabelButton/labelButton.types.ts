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

/** @deprecated `LabelButtonFeedback`를 사용하세요. */
export type LabelButtonIntent = LabelButtonFeedback;

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

// TODO(deprecation, #497): 호출부 마이그레이션 완료 후 아래 deprecated 타입과 .Basic/.Feedback 별칭 제거
/** @deprecated `<LabelButton hierarchy>`를 사용하세요. */
export type LabelButtonBasicProps = BaseLabelButtonProps & {
  hierarchy?: LabelButtonHierarchy;
};
/** @deprecated `<LabelButton feedback>`를 사용하세요. */
export type LabelButtonFeedbackProps = BaseLabelButtonProps & {
  intent?: LabelButtonFeedback;
};
