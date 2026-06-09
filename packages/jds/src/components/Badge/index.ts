export * from "./contentBadge/ContentBadge";
export * from "./dotBadge/DotBadge";
export * from "./numericBadge/NumericBadge";

export type {
  BadgeSize,
  BadgeStyle,
  BadgeStyleWithoutBorder,
  BasicHierarchy,
  FeedbackVariant,
} from "./badge.types";
export type { ContentBadgeStyle, ThemeVariant } from "./contentBadge/contentBadge.types";
export type { NumericBadgeStyle } from "./numericBadge/numericBadge.types";

export {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "./badge.types";
export {
  CONTENT_BADGE_STYLE_OPTIONS,
  THEME_VARIANT_OPTIONS,
} from "./contentBadge/contentBadge.types";
export { NUMERIC_BADGE_STYLE_OPTIONS } from "./numericBadge/numericBadge.types";

export type {
  ContentBadgeBasicProps,
  ContentFeedbackBadgeProps,
  ContentThemeBadgeProps,
} from "./contentBadge/contentBadge.types";

export type { DotBadgeFeedbackProps } from "./dotBadge/dotBadge.types";

export type {
  NumericBadgeBasicProps,
  NumericBasicBadgeProps,
} from "./numericBadge/numericBadge.types";
