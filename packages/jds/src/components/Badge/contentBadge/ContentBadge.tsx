import type { ReactNode } from "react";

import {
  BadgeIcon,
  ContentBadgeBasicDiv,
  ContentBadgeBasicLabel,
  ContentBadgeFeedbackDiv,
  ContentBadgeFeedbackLabel,
  ContentBadgeThemeDiv,
  ContentBadgeThemeLabel,
} from './ContentBadge.style';
import type {
  BadgeSize,
  ContentBadgeStyle,
  BasicHierarchy,
  FeedbackVariant,
  ThemeVariant,
} from '../badge.types';
import { iconSizeMap } from './contentBadge.variants';

export interface ContentBadgeBasicProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  withIcon?: boolean;
  children: ReactNode;
}

const ContentBadgeBasic = ({
  hierarchy = "secondary",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  withIcon = false,
  children,
}: ContentBadgeBasicProps) => {
  const iconSize = iconSizeMap[size];

  return (
    <ContentBadgeBasicDiv
      hierarchy={hierarchy}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
      withIcon={withIcon}
    >
      <ContentBadgeBasicLabel
        size={size}
        textAlign='center'
        weight='normal'
        hierarchy={hierarchy}
        badgeStyle={badgeStyle}
        isMuted={isMuted}
      >
        {children}
      </ContentBadgeBasicLabel>
      {withIcon && (
        <BadgeIcon
          name='close-line'
          size={iconSize}
          hierarchy={hierarchy}
          badgeStyle={badgeStyle}
          isMuted={isMuted}
        />
      )}
    </ContentBadgeBasicDiv>
  );
};

ContentBadgeBasic.displayName = "ContentBadge.Basic";

export interface ContentFeedbackBadgeProps {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const ContentBadgeFeedback = ({
  variant = "positive",
  size = "md",
  badgeStyle = "solid",
  isMuted = false,
  children,
}: ContentFeedbackBadgeProps) => {
  return (
    <ContentBadgeFeedbackDiv
      variant={variant}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <ContentBadgeFeedbackLabel
        size={size}
        textAlign='center'
        weight='normal'
        variant={variant}
        badgeStyle={badgeStyle}
        isMuted={isMuted}
      >
        {children}
      </ContentBadgeFeedbackLabel>
    </ContentBadgeFeedbackDiv>
  );
};

ContentBadgeFeedback.displayName = 'ContentBadge.Feedback';

export interface ContentThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

const ContentBadgeTheme = ({
  variant = 'red',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: ContentThemeBadgeProps) => {
  return (
    <ContentBadgeThemeDiv variant={variant} size={size} badgeStyle={badgeStyle} isMuted={isMuted}>
      <ContentBadgeThemeLabel
        size={size}
        textAlign='center'
        weight='normal'
        variant={variant}
        badgeStyle={badgeStyle}
        isMuted={isMuted}
      >
        {children}
      </ContentBadgeThemeLabel>
    </ContentBadgeThemeDiv>
  );
};

ContentBadgeTheme.displayName = 'ContentBadge.Theme';

export const ContentBadge = {
  Basic: ContentBadgeBasic,
  Feedback: ContentBadgeFeedback,
  Theme: ContentBadgeTheme,
};
