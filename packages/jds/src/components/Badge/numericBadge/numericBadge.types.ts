import type { ReactNode } from "react";
import type { FeedbackVariant, BadgeSize, BasicHierarchy } from "../badge.types";

export const NUMERIC_BADGE_STYLE_OPTIONS = ["solid", "hollow"] as const;
export type NumericBadgeStyle = (typeof NUMERIC_BADGE_STYLE_OPTIONS)[number];

export interface NumericBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export interface NumericBasicBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}
