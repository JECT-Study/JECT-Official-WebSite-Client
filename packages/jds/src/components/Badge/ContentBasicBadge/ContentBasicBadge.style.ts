import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BasicHierarchy, BadgeSize, BadgeType } from '../badge.types';
import { BADGE_SIZE } from '../badge.variants';
import {
  CONTENT_BASIC_BADGE_STYLE,
  CONTENT_BASIC_BADGE_STYLE_MUTED,
} from './contentBasicBadge.variants';

interface ContentBasicBadgeDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  type: BadgeType;
  isMuted: boolean;
  withIcon: boolean;
}

export const ContentBasicBadgeDiv = styled.div<ContentBasicBadgeDivProps>(
  ({ theme, hierarchy, size, type, isMuted, withIcon }) => {
    const backgroundColor = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[type].bg
      : CONTENT_BASIC_BADGE_STYLE(theme)[type][hierarchy].bg;
    const color = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[type].color
      : CONTENT_BASIC_BADGE_STYLE(theme)[type][hierarchy].color;
    const border = isMuted
      ? CONTENT_BASIC_BADGE_STYLE_MUTED(theme)[type].border
      : CONTENT_BASIC_BADGE_STYLE(theme)[type][hierarchy].border;

    return {
      minWidth: pxToRem(BADGE_SIZE[size].minWidth),
      padding: BADGE_SIZE[size].padding,
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
