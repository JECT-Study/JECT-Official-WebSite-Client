import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, BadgeType, ThemeVariant } from '../badge.types';
import { BADGE_SIZE } from '../badge.variants';
import { THEME_BADGE_STYLE, THEME_BADGE_STYLE_MUTED } from './themeBadge.variants';

interface ThemeBadgeDivProps {
  variant: ThemeVariant;
  size: BadgeSize;
  type: BadgeType;
  isMuted: boolean;
}

export const ThemeBadgeDiv = styled.div<ThemeBadgeDivProps>(
  ({ theme, variant, size, type, isMuted }) => {
    const backgroundColor = isMuted
      ? THEME_BADGE_STYLE_MUTED(theme)[type][variant].bg
      : THEME_BADGE_STYLE(theme)[type][variant].bg;
    const color = isMuted
      ? THEME_BADGE_STYLE_MUTED(theme)[type][variant].color
      : THEME_BADGE_STYLE(theme)[type][variant].color;
    const border = isMuted
      ? THEME_BADGE_STYLE_MUTED(theme)[type][variant].border
      : THEME_BADGE_STYLE(theme)[type][variant].border;

    return {
      minWidth: pxToRem(BADGE_SIZE[size].minWidth),
      padding: BADGE_SIZE[size].padding,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0px',
      backgroundColor,
      color,
      border: `1px solid ${border}`,
      borderRadius: theme.scheme.desktop.radius[4],
    };
  },
);
