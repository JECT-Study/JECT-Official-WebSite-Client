import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FeedbackVariant, BadgeSize, BasicHierarchy } from "../badge.types";

export const NUMERIC_BADGE_STYLE_OPTIONS = ["solid", "alpha", "hollow"] as const;
export type NumericBadgeStyle = (typeof NUMERIC_BADGE_STYLE_OPTIONS)[number];

export interface BaseNumericBadgeProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export type NumericBadgeProps = BaseNumericBadgeProps &
  (
    | { hierarchy?: BasicHierarchy; feedback?: never }
    | { feedback?: FeedbackVariant; hierarchy?: never }
  );
