import { ReactNode } from 'react';
import { BadgeIcon, ContentBasicBadgeDiv } from './ContentBasicBadge.style';
import { BadgeSize, ContentBadgeStyle, BasicHierarchy } from '../badge.types';
import { Label } from '@/components/Label';
import { ICON_SIZE } from './contentBasicBadge.variants';

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
  const iconSize = ICON_SIZE[size];

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
      {withIcon && (
        <BadgeIcon
          name='close-line'
          size={iconSize}
          hierarchy={hierarchy}
          badgeStyle={badgeStyle}
          isMuted={isMuted}
        />
      )}
    </ContentBasicBadgeDiv>
  );
};

ContentBasicBadge.displayName = 'ContentBasicBadge';
