import { ReactNode } from 'react';
import { ContentThemeBadgeDiv } from './ContentThemeBadge.style';
import { BadgeSize, ThemeVariant, ContentBadgeStyle } from '../badge.types';
import { Label } from '@/components/Label';

interface ContentThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  badgeStyle?: ContentBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export const ContentThemeBadge = ({
  variant = 'red',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: ContentThemeBadgeProps) => {
  return (
    <ContentThemeBadgeDiv variant={variant} size={size} badgeStyle={badgeStyle} isMuted={isMuted}>
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </ContentThemeBadgeDiv>
  );
};

ContentThemeBadge.displayName = 'ContentThemeBadge';
