import { Theme } from '@emotion/react';
import { BadgeSize, BadgeStyle, BasicHierarchy, ContentBadgeStyle } from '../badge.types';
import { IconSize } from '@/components/Icon';

export const ICON_SIZE: Record<BadgeSize, IconSize> = {
  lg: 'sm',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

export const ICON_COLOR = (theme: Theme) => ({
  solid: {
    accent: theme.color.object.static.inverse.boldest,
    primary: theme.color.object.inverse.boldest,
    secondary: theme.color.object.static.inverse.boldest,
    tertiary: theme.color.object.alternative,
  },
  alpha: {
    accent: theme.color.accent.normal,
    primary: theme.color.object.boldest,
    secondary: theme.color.object.neutral,
    tertiary: theme.color.object.alternative,
  },
  outlined: {
    accent: theme.color.accent.normal,
    primary: theme.color.object.boldest,
    secondary: theme.color.object.neutral,
    tertiary: theme.color.object.alternative,
  },
});

type ContentBasicBadgeStyle = {
  solid: Record<BasicHierarchy, BadgeStyle>;
  alpha: Record<BasicHierarchy, BadgeStyle>;
  outlined: Record<BasicHierarchy, BadgeStyle>;
};

export const CONTENT_BASIC_BADGE_STYLE = (theme: Theme): ContentBasicBadgeStyle => ({
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
      bg: theme.color.accent.alpha.subtler,
      color: theme.color.accent.normal,
      border: 'none',
    },
    primary: {
      bg: theme.color.fill.subtler,
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
      border: theme.color.stroke.alpha.assistive,
    },
    secondary: {
      bg: 'none',
      color: theme.color.object.neutral,
      border: theme.color.stroke.alpha.assistive,
    },
    tertiary: {
      bg: 'none',
      color: theme.color.object.alternative,
      border: theme.color.stroke.alpha.assistive,
    },
  },
});

export const CONTENT_BASIC_BADGE_STYLE_MUTED = (
  theme: Theme,
): Record<ContentBadgeStyle, BadgeStyle> => ({
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
