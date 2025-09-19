import { ReactNode } from 'react';
import { ContentBasicBadgeDiv } from './ContentBasicBadge.style';
import { Theme, useTheme } from '@emotion/react';
import { BadgeSize, BadgeType, BasicHierarchy } from '../badge.types';
import { Icon, IconSize } from '@/components/Icon';
import { Label } from '@/components/Label';

const ICON_SIZE: Record<BadgeSize, IconSize> = {
  lg: 'sm',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

const ICON_COLOR = (theme: Theme) => ({
  solid: {
    accent: theme.color.object.static.inverse.boldest,
    primary: theme.color.object.inverse.boldest,
    secondary: theme.color.object.static.inverse.boldest,
    tertiary: theme.color.object.alternative,
  },
  alpha: {
    accent: theme.color.accent.normal,
    primary: theme.color.object.boldest,
    secondary: theme.color.object.neutral,
    tertiary: theme.color.object.alternative,
  },
  outlined: {
    accent: theme.color.accent.normal,
    primary: theme.color.object.boldest,
    secondary: theme.color.object.neutral,
    tertiary: theme.color.object.alternative,
  },
});

interface ContentBasicBadgeProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  type?: BadgeType;
  isMuted?: boolean;
  withIcon?: boolean;
  children: ReactNode;
}

export const ContentBasicBadge = ({
  hierarchy = 'secondary',
  size = 'md',
  type = 'solid',
  isMuted = false,
  withIcon = false,
  children,
}: ContentBasicBadgeProps) => {
  const theme = useTheme();
  const iconSize = ICON_SIZE[size];
  const iconColor = isMuted ? theme.color.object.subtle : ICON_COLOR(theme)[type][hierarchy];

  return (
    <ContentBasicBadgeDiv
      hierarchy={hierarchy}
      size={size}
      type={type}
      isMuted={isMuted}
      withIcon={withIcon}
    >
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
      {withIcon && <Icon name='close-line' size={iconSize} color={iconColor} />}
    </ContentBasicBadgeDiv>
  );
};

ContentBasicBadge.displayName = 'ContentBasicBadge';
