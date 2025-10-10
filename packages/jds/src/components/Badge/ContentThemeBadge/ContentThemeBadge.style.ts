import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BadgeSize, ContentBadgeStyle, ThemeVariant } from '../badge.types';
import { CONTENT_BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_THEME_BADGE_STYLE,
  CONTENT_THEME_BADGE_STYLE_MUTED,
} from './contentThemeBadge.variants';

interface ContentThemeBadgeDivProps {
  variant: ThemeVariant;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
}

export const ContentThemeBadgeDiv = styled.div<ContentThemeBadgeDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].bg
      : CONTENT_THEME_BADGE_STYLE(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].color
      : CONTENT_THEME_BADGE_STYLE(theme)[badgeStyle][variant].color;
    const border = isMuted
      ? CONTENT_THEME_BADGE_STYLE_MUTED(theme)[badgeStyle][variant].border
      : CONTENT_THEME_BADGE_STYLE(theme)[badgeStyle][variant].border;

    return {
      minWidth: pxToRem(CONTENT_BADGE_SIZE[size].minWidth),
      padding: `${pxToRem(CONTENT_BADGE_SIZE[size].paddingTopBottom)} ${pxToRem(CONTENT_BADGE_SIZE[size].paddingLeftRight)}`,
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
