import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BasicHierarchy, BadgeSize, BadgeType } from '../badge.types';
import { BASIC_BADGE_STYLE, BASIC_BADGE_STYLE_MUTED } from './basicBadge.variants';
import { BADGE_SIZE } from '../badge.variants';

interface BasicBadgeDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  type: BadgeType;
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
