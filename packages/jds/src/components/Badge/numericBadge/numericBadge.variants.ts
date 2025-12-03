import type { Theme } from "@emotion/react";

import type {
  BadgeStyleWithoutBorder,
  BasicHierarchy,
  FeedbackVariant,
  NumericBadgeStyle,
} from "../badge.types";

type NumericBadgeBasicStyle = {
  solid: Record<BasicHierarchy, BadgeStyleWithoutBorder>;
  empty: Record<BasicHierarchy, BadgeStyleWithoutBorder>;
};

export const numericBadgeBasicStylesMap = (theme: Theme): NumericBadgeBasicStyle => ({
  solid: {
    accent: {
      bg: theme.color.semantic.accent.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
    },
    primary: {
      bg: theme.color.semantic.fill.bold,
      color: theme.color.semantic.object.inverse.boldest,
    },
    secondary: {
      bg: theme.color.semantic.fill.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
    },
    tertiary: {
      bg: theme.color.semantic.fill.subtler,
      color: theme.color.semantic.object.alternative,
    },
  },
  empty: {
    accent: {
      bg: "none",
      color: theme.color.semantic.accent.normal,
    },
    primary: {
      bg: "none",
      color: theme.color.semantic.object.bolder,
    },
    secondary: {
      bg: "none",
      color: theme.color.semantic.object.neutral,
    },
    tertiary: {
      bg: "none",
      color: theme.color.semantic.object.alternative,
    },
  },
});

export const numericBadgeBasicMutedStylesMap = (
  theme: Theme,
): Record<NumericBadgeStyle, BadgeStyleWithoutBorder> => ({
  solid: {
    bg: theme.color.semantic.fill.subtlest,
    color: theme.color.semantic.object.subtle,
  },
  empty: {
    bg: "none",
    color: theme.color.semantic.object.subtle,
  },
});

type ContentBadgeFeedbackStyle = {
  solid: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
  empty: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
};

export const numericBadgeFeedbackStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.semantic.feedback.positive.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.neutral,
      color: theme.color.semantic.object.inverse.boldest,
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
    },
  },
  empty: {
    positive: {
      bg: "none",
      color: theme.color.semantic.feedback.positive.normal,
    },
    destructive: {
      bg: "none",
      color: theme.color.semantic.feedback.destructive.normal,
    },
    notifying: {
      bg: "none",
      color: theme.color.semantic.feedback.notifying.normal,
    },
  },
});

export const numericBadgeFeedbacksMutedStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtler,
      color: theme.color.semantic.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtler,
      color: theme.color.semantic.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtler,
      color: theme.color.semantic.feedback.notifying.alpha.subtle,
    },
  },
  empty: {
    positive: {
      bg: "none",
      color: theme.color.semantic.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: "none",
      color: theme.color.semantic.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: "none",
      color: theme.color.semantic.feedback.notifying.alpha.subtle,
    },
  },
});
