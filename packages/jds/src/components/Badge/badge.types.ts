// BadgeStyle, BadgeStyleWithoutBorder - 기존 public type import 호환성을 위해 유지합니다.

export type BadgeStyle = {
  bg: string;
  color: string;
  border: string;
};

export type BadgeStyleWithoutBorder = Omit<BadgeStyle, "border">;

export const BADGE_SIZE_OPTIONS = ["lg", "md", "sm", "xs"] as const;
export type BadgeSize = (typeof BADGE_SIZE_OPTIONS)[number];

export const BASIC_HIERARCHY_OPTIONS = ["accent", "primary", "secondary", "tertiary"] as const;
export type BasicHierarchy = (typeof BASIC_HIERARCHY_OPTIONS)[number];

export const FEEDBACK_VARIANT_OPTIONS = ["positive", "destructive"] as const;
export type FeedbackVariant = (typeof FEEDBACK_VARIANT_OPTIONS)[number];
