import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, BadgeType, ThemeVariant } from '../badge.types';
import { CONTENT_BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_THEME_BADGE_STYLE,
  CONTENT_THEME_BADGE_STYLE_MUTED,
} from './contentThemeBadge.variants';

interface ContentThemeBadgeDivProps {
  variant: ThemeVariant;
  size: BadgeSize;
  type: BadgeType;
  isMuted: boolean;
}

export const ContentThemeBadgeDiv = styled.div<ContentThemeBadgeDivProps>(
  ({ theme, variant, size, type, isMuted }) => {
    const backgroundColor = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[type][variant].bg
      : CONTENT_THEME_BADGE_STYLE(theme)[type][variant].bg;
    const color = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[type][variant].color
      : CONTENT_THEME_BADGE_STYLE(theme)[type][variant].color;
    const border = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[type][variant].border
      : CONTENT_THEME_BADGE_STYLE(theme)[type][variant].border;

    return {
      minWidth: pxToRem(CONTENT_BADGE_SIZE[size].minWidth),
      padding: CONTENT_BADGE_SIZE[size].padding,
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
