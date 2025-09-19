import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { BasicHierarchy, BadgeSize, NumericBadgeStyle } from '../badge.types';
import { NUMERIC_BADGE_SIZE } from '../badge.variants';
import {
  NUMERIC_BASIC_BADGE_STYLE,
  NUMERIC_BASIC_BADGE_STYLE_MUTED,
} from './numericBasicBadge.variants';

interface NumericBasicBadgeDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  badgeStyle: NumericBadgeStyle;
  isMuted: boolean;
}

export const NumericBasicBadgeDiv = styled.div<NumericBasicBadgeDivProps>(
  ({ theme, hierarchy, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? NUMERIC_BASIC_BADGE_STYLE_MUTED(theme)[badgeStyle].bg
      : NUMERIC_BASIC_BADGE_STYLE(theme)[badgeStyle][hierarchy].bg;
    const color = isMuted
      ? NUMERIC_BASIC_BADGE_STYLE_MUTED(theme)[badgeStyle].color
      : NUMERIC_BASIC_BADGE_STYLE(theme)[badgeStyle][hierarchy].color;

    return {
      minWidth: pxToRem(NUMERIC_BADGE_SIZE[size].minWidth),
      padding: NUMERIC_BADGE_SIZE[size].padding,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      color,
      borderRadius: theme.scheme.desktop.radius.max,
    };
  },
);
