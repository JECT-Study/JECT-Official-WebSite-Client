import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FeedbackVariant, BadgeSize, BasicHierarchy } from "../badge.types";

export const NUMERIC_BADGE_STYLE_OPTIONS = ["solid", "alpha", "hollow"] as const;
export type NumericBadgeStyle = (typeof NUMERIC_BADGE_STYLE_OPTIONS)[number];

export type BaseNumericBadgeProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
};

export type NumericBadgeProps = BaseNumericBadgeProps &
  (
    | { hierarchy?: BasicHierarchy; feedback?: never }
    | { feedback?: FeedbackVariant; hierarchy?: never }
  );

// TODO(deprecation): 호출부 마이그레이션 완료 후 아래 deprecated 타입과 .Basic/.Feedback 별칭 제거
/** @deprecated `<NumericBadge hierarchy badgeStyle>`를 사용하세요. */
export type NumericBadgeBasicProps = BaseNumericBadgeProps & {
  hierarchy?: BasicHierarchy;
};
/** @deprecated `<NumericBadge feedback badgeStyle>`를 사용하세요. */
export type NumericBadgeFeedbackProps = BaseNumericBadgeProps & {
  /** @deprecated `feedback`을 사용하세요. */
  variant?: FeedbackVariant;
};
