import { ReactNode } from 'react';
import { BasicBadgeDiv, BasicBadgeSpan } from './BasicBadge.style';
import { Icon, IconSize } from '../Icon';
import { Theme, useTheme } from '@emotion/react';

export type BadgeHierarchy = 'accent' | 'primary' | 'secondary' | 'tertiary';
export type BadgeStyle = 'solid' | 'alpha' | 'outlined';
export type BadgeSize = 'lg' | 'md' | 'sm' | 'xs';

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

interface BasicBadgeProps {
  hierarchy?: BadgeHierarchy;
  size?: BadgeSize;
  type?: BadgeStyle;
  isMuted?: boolean;
  withIcon?: boolean;
  children: ReactNode;
}

export const BasicBadge = ({
  hierarchy = 'secondary',
  size = 'md',
  type = 'solid',
  isMuted = false,
  withIcon = false,
  children,
}: BasicBadgeProps) => {
  const theme = useTheme();
  const iconSize = ICON_SIZE[size];
  const iconColor = isMuted ? theme.color.object.subtle : ICON_COLOR(theme)[type][hierarchy];

  return (
    <BasicBadgeDiv
      hierarchy={hierarchy}
      size={size}
      type={type}
      isMuted={isMuted}
      withIcon={withIcon}
    >
      <BasicBadgeSpan size={size}>{children}</BasicBadgeSpan>
      {withIcon && <Icon name='close-line' size={iconSize} color={iconColor} />}
    </BasicBadgeDiv>
  );
};

BasicBadge.displayName = 'BasicBadge';
