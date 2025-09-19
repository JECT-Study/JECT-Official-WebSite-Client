import { Theme } from '@emotion/react';

export const BASIC_BADGE_STYLE = (theme: Theme) => ({
  solid: {
    accent: {
      bg: theme.color.accent.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    primary: {
      bg: theme.color.fill.bold,
      color: theme.color.object.inverse.boldest,
      border: 'none',
    },
    secondary: {
      bg: theme.color.fill.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    tertiary: {
      bg: theme.color.fill.subtle,
      color: theme.color.object.alternative,
      border: 'none',
    },
  },
  alpha: {
    accent: {
      bg: theme.color.accent.alpha.subtle,
      color: theme.color.accent.normal,
      border: 'none',
    },
    primary: {
      bg: theme.color.fill.subtle,
      color: theme.color.object.bolder,
      border: 'none',
    },
    secondary: {
      bg: theme.color.fill.subtle,
      color: theme.color.object.neutral,
      border: 'none',
    },
    tertiary: {
      bg: theme.color.fill.subtler,
      color: theme.color.object.alternative,
      border: 'none',
    },
  },
  outlined: {
    accent: {
      bg: 'none',
      color: theme.color.accent.normal,
      border: theme.color.accent.alpha.neutral,
    },
    primary: {
      bg: 'none',
      color: theme.color.object.bolder,
      border: theme.color.stroke.alpha.neutral,
    },
    secondary: {
      bg: 'none',
      color: theme.color.object.neutral,
      border: theme.color.stroke.alpha.alternative,
    },
    tertiary: {
      bg: 'none',
      color: theme.color.object.alternative,
      border: theme.color.stroke.alpha.assistive,
    },
  },
});

export const BASIC_BADGE_STYLE_MUTED = (theme: Theme) => ({
  solid: {
    bg: theme.color.fill.subtler,
    color: theme.color.object.subtle,
    border: 'none',
  },
  alpha: {
    bg: theme.color.fill.subtlest,
    color: theme.color.object.subtle,
    border: 'none',
  },
  outlined: {
    bg: 'none',
    color: theme.color.object.subtle,
    border: theme.color.stroke.alpha.subtler,
  },
});
