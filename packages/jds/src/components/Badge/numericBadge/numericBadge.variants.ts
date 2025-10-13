import { Theme } from '@emotion/react';
import {
  BadgeStyleWithoutBorder,
  BasicHierarchy,
  FeedbackVariant,
  NumericBadgeStyle,
} from '../badge.types';

type NumericBadgeBasicStyle = {
  solid: Record<BasicHierarchy, BadgeStyleWithoutBorder>;
  empty: Record<BasicHierarchy, BadgeStyleWithoutBorder>;
};

export const numericBadgeBasicStylesMap = (theme: Theme): NumericBadgeBasicStyle => ({
  solid: {
    accent: {
      bg: theme.color.accent.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
    primary: {
      bg: theme.color.fill.bold,
      color: theme.color.object.inverse.boldest,
    },
    secondary: {
      bg: theme.color.fill.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
    tertiary: {
      bg: theme.color.fill.subtler,
      color: theme.color.object.alternative,
    },
  },
  empty: {
    accent: {
      bg: 'none',
      color: theme.color.accent.normal,
    },
    primary: {
      bg: 'none',
      color: theme.color.object.bolder,
    },
    secondary: {
      bg: 'none',
      color: theme.color.object.neutral,
    },
    tertiary: {
      bg: 'none',
      color: theme.color.object.alternative,
    },
  },
});

export const numericBadgeBasicMutedStylesMap = (
  theme: Theme,
): Record<NumericBadgeStyle, BadgeStyleWithoutBorder> => ({
  solid: {
    bg: theme.color.fill.subtlest,
    color: theme.color.object.subtle,
  },
  empty: {
    bg: 'none',
    color: theme.color.object.subtle,
  },
});

type ContentBadgeFeedbackStyle = {
  solid: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
  empty: Record<FeedbackVariant, BadgeStyleWithoutBorder>;
};

export const numericBadgeFeedbackStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
    destructive: {
      bg: theme.color.feedback.destructive.neutral,
      color: theme.color.object.inverse.boldest,
    },
    notifying: {
      bg: theme.color.feedback.notifying.neutral,
      color: theme.color.object.static.inverse.boldest,
    },
  },
  empty: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.normal,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.normal,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.normal,
    },
  },
});

export const numericBadgeFeedbacksMutedStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtler,
      color: theme.color.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtler,
      color: theme.color.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtler,
      color: theme.color.feedback.notifying.alpha.subtle,
    },
  },
  empty: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.alpha.subtle,
    },
  },
});
