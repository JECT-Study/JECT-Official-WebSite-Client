import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import {
  BasicHierarchy,
  BadgeSize,
  ContentBadgeStyle,
  FeedbackVariant,
  ThemeVariant,
} from '../badge.types';
import { contentBadgeSizeMap } from '../badge.variants';
import {
  contentBadgeBasicStylesMap,
  contentBadgeBasicMutedStylesMap,
  contentBadgeFeedbackStylesMap,
  contentBadgeFeedbackMutedStylesMap,
  contentBadgeThemeStylesMap,
  contentBadgeThemeMutedStylesMap,
  iconColorMap,
} from './contentBadge.variants';
import { Icon } from '@/components/Icon';

interface ContentBasicBadgeDivProps {
  hierarchy: BasicHierarchy;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
  withIcon: boolean;
}

export const ContentBadgeBasicDiv = styled.div<ContentBasicBadgeDivProps>(
  ({ theme, hierarchy, size, badgeStyle, isMuted, withIcon }) => {
    const backgroundColor = isMuted
      ? contentBadgeBasicMutedStylesMap(theme)[badgeStyle].bg
      : contentBadgeBasicStylesMap(theme)[badgeStyle][hierarchy].bg;
    const color = isMuted
      ? contentBadgeBasicMutedStylesMap(theme)[badgeStyle].color
      : contentBadgeBasicStylesMap(theme)[badgeStyle][hierarchy].color;
    const border = isMuted
      ? contentBadgeBasicMutedStylesMap(theme)[badgeStyle].border
      : contentBadgeBasicStylesMap(theme)[badgeStyle][hierarchy].border;

    return {
      minWidth: pxToRem(contentBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(contentBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(contentBadgeSizeMap[size].paddingLeftRight)}`,
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

interface BadgeIconProps {
  hierarchy: BasicHierarchy;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
}

export const BadgeIcon = styled(Icon)<BadgeIconProps>(({
  theme,
  hierarchy,
  badgeStyle,
  isMuted,
}) => {
  const iconColor = isMuted
    ? theme.color.object.subtle
    : iconColorMap(theme)[badgeStyle][hierarchy];

  return {
    color: iconColor,
  };
});

interface ContentBadgeFeedbackDivProps {
  variant: FeedbackVariant;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
}

export const ContentBadgeFeedbackDiv = styled.div<ContentBadgeFeedbackDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? contentBadgeFeedbackMutedStylesMap(theme)[badgeStyle][variant].bg
      : contentBadgeFeedbackStylesMap(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? contentBadgeFeedbackMutedStylesMap(theme)[badgeStyle][variant].color
      : contentBadgeFeedbackStylesMap(theme)[badgeStyle][variant].color;
    const border = isMuted
      ? contentBadgeFeedbackMutedStylesMap(theme)[badgeStyle][variant].border
      : contentBadgeFeedbackStylesMap(theme)[badgeStyle][variant].border;

    return {
      minWidth: pxToRem(contentBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(contentBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(contentBadgeSizeMap[size].paddingLeftRight)}`,
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

interface ContentBadgeThemeDivProps {
  variant: ThemeVariant;
  size: BadgeSize;
  badgeStyle: ContentBadgeStyle;
  isMuted: boolean;
}

export const ContentBadgeThemeDiv = styled.div<ContentBadgeThemeDivProps>(
  ({ theme, variant, size, badgeStyle, isMuted }) => {
    const backgroundColor = isMuted
      ? contentBadgeThemeMutedStylesMap(theme)[badgeStyle][variant].bg
      : contentBadgeThemeStylesMap(theme)[badgeStyle][variant].bg;
    const color = isMuted
      ? contentBadgeThemeMutedStylesMap(theme)[badgeStyle][variant].color
      : contentBadgeThemeStylesMap(theme)[badgeStyle][variant].color;
    const border = isMuted
      ? contentBadgeThemeMutedStylesMap(theme)[badgeStyle][variant].border
      : contentBadgeThemeStylesMap(theme)[badgeStyle][variant].border;

    return {
      minWidth: pxToRem(contentBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(contentBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(contentBadgeSizeMap[size].paddingLeftRight)}`,
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
