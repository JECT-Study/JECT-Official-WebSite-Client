import type { MouseEvent, ReactNode } from "react";
import type { BadgeSize, BasicHierarchy, FeedbackVariant } from "../badge.types";

export const CONTENT_BADGE_STYLE_OPTIONS = ["solid", "alpha", "outlined"] as const;
export type ContentBadgeStyle = (typeof CONTENT_BADGE_STYLE_OPTIONS)[number];

export const THEME_VARIANT_OPTIONS = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "sky",
  "indigo",
  "purple",
  "pink",
] as const;
export type ThemeVariant = (typeof THEME_VARIANT_OPTIONS)[number];

export interface ContentBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  withIcon?: boolean;
  onIconClick?: (e: MouseEvent<Element>) => void;
  children: ReactNode;
}

export interface ContentFeedbackBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export interface ContentThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}
