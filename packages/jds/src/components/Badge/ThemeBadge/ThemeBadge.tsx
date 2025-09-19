import { ReactNode } from 'react';
import { ThemeBadgeDiv } from './ThemeBadge.style';
import { Label } from '../../Label';
import { BadgeSize, ThemeVariant, BadgeType } from '../badge.types';

interface ThemeBadgeProps {
  variant?: ThemeVariant;
  size?: BadgeSize;
  type?: BadgeType;
  isMuted?: boolean;
  children: ReactNode;
}

export const ThemeBadge = ({
  variant = 'red',
  size = 'md',
  type = 'solid',
  isMuted = false,
  children,
}: ThemeBadgeProps) => {
  return (
    <ThemeBadgeDiv variant={variant} size={size} type={type} isMuted={isMuted}>
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </ThemeBadgeDiv>
  );
};

ThemeBadge.displayName = 'ThemeBadge';
