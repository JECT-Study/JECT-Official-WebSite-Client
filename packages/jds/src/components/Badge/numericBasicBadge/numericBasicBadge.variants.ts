import { Theme } from '@emotion/react';

export const NUMERIC_BASIC_BADGE_STYLE = (theme: Theme) => ({
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
      bg: theme.color.fill.subtle,
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

export const NUMERIC_BASIC_BADGE_STYLE_MUTED = (theme: Theme) => ({
  solid: {
    bg: theme.color.fill.subtlest,
    color: theme.color.object.subtle,
  },
  empty: {
    bg: 'none',
    color: theme.color.object.subtle,
  },
});
