import { ReactNode } from 'react';
import { ContentThemeBadgeDiv } from './ContentThemeBadge.style';
import { Label } from '../../Label';
import { BadgeSize, ThemeVariant, BadgeType } from '../badge.types';

interface ContentThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  type?: BadgeType;
  isMuted?: boolean;
  children: ReactNode;
}

export const ContentThemeBadge = ({
  variant = 'red',
  size = 'md',
  type = 'solid',
  isMuted = false,
  children,
}: ContentThemeBadgeProps) => {
  return (
    <ContentThemeBadgeDiv variant={variant} size={size} type={type} isMuted={isMuted}>
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </ContentThemeBadgeDiv>
  );
};

ContentThemeBadge.displayName = 'ContentThemeBadge';
