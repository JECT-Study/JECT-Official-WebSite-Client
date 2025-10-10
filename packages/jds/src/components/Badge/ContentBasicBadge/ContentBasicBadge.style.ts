import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BasicHierarchy, BadgeSize, ContentBadgeStyle } from '../badge.types';
import { CONTENT_BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_BASIC_BADGE_STYLE,
  CONTENT_BASIC_BADGE_STYLE_MUTED,
} from './contentBasicBadge.variants';

interface ContentBasicBadgeDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
  withIcon: boolean;
}

export const ContentBasicBadgeDiv = styled.div<ContentBasicBadgeDivProps>(
  ({ theme, hierarchy, size, badgeStyle, isMuted, withIcon }) => {
    const backgroundColor = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[badgeStyle].bg
      : CONTENT_BASIC_BADGE_STYLE(theme)[badgeStyle][hierarchy].bg;
    const color = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[badgeStyle].color
      : CONTENT_BASIC_BADGE_STYLE(theme)[badgeStyle][hierarchy].color;
    const border = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[badgeStyle].border
      : CONTENT_BASIC_BADGE_STYLE(theme)[badgeStyle][hierarchy].border;

    return {
      minWidth: pxToRem(CONTENT_BADGE_SIZE[size].minWidth),
      padding: `${pxToRem(CONTENT_BADGE_SIZE[size].paddingTopBottom)} ${pxToRem(CONTENT_BADGE_SIZE[size].paddingLeftRight)}`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: withIcon ? pxToRem(4) : '0',
      backgroundColor,
      color,
      border: `1px solid ${border}`,
      borderRadius: theme.scheme.desktop.radius[4],
    };
  },
);
