import { ReactNode } from 'react';
import { NumericBasicBadgeDiv } from './NumericBasicBadge.style';
import { Label } from '../../Label';
import { BadgeSize, BadgeType, BasicHierarchy, NumericBadgeStyle } from '../badge.types';

interface NumericBasicBadgeProps {
  hierarchy?: BasicHierarchy;
  size?: BadgeSize;
  badgeStyle?: NumericBadgeStyle;
  isMuted?: boolean;
  children: ReactNode;
}

export const NumericBasicBadge = ({
  hierarchy = 'secondary',
  size = 'md',
  badgeStyle = 'solid',
  isMuted = false,
  children,
}: NumericBasicBadgeProps) => {
  return (
    <NumericBasicBadgeDiv
      hierarchy={hierarchy}
      size={size}
      badgeStyle={badgeStyle}
      isMuted={isMuted}
    >
      <Label size={size} textAlign='center' weight='normal' color='inherit'>
        {children}
      </Label>
    </NumericBasicBadgeDiv>
  );
};

NumericBasicBadge.displayName = 'NumericBasicBadge';
