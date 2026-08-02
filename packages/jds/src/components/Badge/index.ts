export * from "./ContentBadge/ContentBadge";
export * from "./DotBadge/DotBadge";
export * from "./NumericBadge/NumericBadge";

export type { BadgeSize, BasicHierarchy, FeedbackVariant } from "./badge.types";
export type { ContentBadgeStyle, ThemeVariant } from "./ContentBadge/contentBadge.types";
export type { NumericBadgeStyle } from "./NumericBadge/numericBadge.types";

export {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "./badge.types";
export {
  CONTENT_BADGE_STYLE_OPTIONS,
  THEME_VARIANT_OPTIONS,
} from "./ContentBadge/contentBadge.types";
export { NUMERIC_BADGE_STYLE_OPTIONS } from "./NumericBadge/numericBadge.types";

export type { ContentBadgeProps } from "./ContentBadge/contentBadge.types";

export type { DotBadgeFeedbackProps, DotBadgeProps } from "./DotBadge/dotBadge.types";

export type {
  NumericBadgeBasicProps,
  NumericBadgeFeedbackProps,
  NumericBadgeProps,
} from "./NumericBadge/numericBadge.types";
