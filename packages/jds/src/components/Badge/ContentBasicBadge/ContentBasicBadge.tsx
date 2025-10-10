import { ReactNode } from 'react';
import { ContentBasicBadgeDiv } from './ContentBasicBadge.style';
import { useTheme } from '@emotion/react';
import { BadgeSize, ContentBadgeStyle, BasicHierarchy } from '../badge.types';
import { Icon } from '@/components/Icon';
import { Label } from '@/components/Label';
import { ICON_COLOR, ICON_SIZE } from './contentBasicBadge.variants';

interface ContentBasicBadgeProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  withIcon?: boolean;
  children: ReactNode;
}

export const ContentBasicBadge = ({
  hierarchy = 'secondary',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  withIcon = false,
  children,
}: ContentBasicBadgeProps) => {
  const theme = useTheme();
  const iconSize = ICON_SIZE[size];
  const iconColor = isMuted ? theme.color.object.subtle : ICON_COLOR(theme)[badgeStyle][hierarchy];

  return (
    <ContentBasicBadgeDiv
      hierarchy={hierarchy}
      size={size}
      badgeStyle={badgeStyle}
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
