import { Theme } from '@emotion/react';

export const NUMERIC_FEEDBACK_BADGE_STYLE = (theme: Theme) => ({
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

export const NUMERIC_FEEDBACK_BADGE_STYLE_MUTED = (theme: Theme) => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtle,
      color: theme.color.feedback.positive.alpha.alternative,
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtle,
      color: theme.color.feedback.destructive.alpha.alternative,
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtle,
      color: theme.color.feedback.notifying.alpha.alternative,
    },
  },
  empty: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.alpha.alternative,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.alpha.alternative,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.alpha.alternative,
    },
  },
});
