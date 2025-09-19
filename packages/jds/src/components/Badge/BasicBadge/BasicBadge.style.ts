import styled from '@emotion/styled';
import { pxToRem, textStyle } from 'utils';
import { Theme } from '@emotion/react';
import { TextStyle } from 'types';
import { BadgeHierarchy, BadgeSize, BadgeStyle } from '../Badge.types';

const BASIC_BADGE_STYLE = (theme: Theme) => ({
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

const BASIC_BADGE_STYLE_MUTED = (theme: Theme) => ({
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

const BASIC_BADGE_SIZE: Record<
  BadgeSize,
  { minWidth: number; padding: string; textStyle: TextStyle }
> = {
  lg: {
    minWidth: 28,
    padding: '2px 6px',
    textStyle: 'label.lg.normal',
  },
  md: {
    minWidth: 27,
    padding: '2px 6px',
    textStyle: 'label.md.normal',
  },
  sm: {
    minWidth: 24,
    padding: '2px 6px',
    textStyle: 'label.sm.normal',
  },
  xs: {
    minWidth: 20,
    padding: '1px 4px',
    textStyle: 'label.xs.normal',
  },
};

interface BasicBadgeDivProps {
  hierarchy: BadgeHierarchy;
  size: BadgeSize;
  type: BadgeStyle;
  isMuted: boolean;
  withIcon: boolean;
}

export const BasicBadgeDiv = styled.div<BasicBadgeDivProps>(
  ({ theme, hierarchy, size, type, isMuted, withIcon }) => {
    const backgroundColor = isMuted
      ? BASIC_BADGE_STYLE_MUTED(theme)[type].bg
      : BASIC_BADGE_STYLE(theme)[type][hierarchy].bg;
    const color = isMuted
      ? BASIC_BADGE_STYLE_MUTED(theme)[type].color
      : BASIC_BADGE_STYLE(theme)[type][hierarchy].color;
    const border = isMuted
      ? BASIC_BADGE_STYLE_MUTED(theme)[type].border
      : BASIC_BADGE_STYLE(theme)[type][hierarchy].border;

    return {
      minWidth: pxToRem(BASIC_BADGE_SIZE[size].minWidth),
      padding: BASIC_BADGE_SIZE[size].padding,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: withIcon ? '0px' : '4px',
      backgroundColor,
      color,
      border: `1px solid ${border}`,
      borderRadius: theme.scheme.desktop.radius[4],
    };
  },
);
