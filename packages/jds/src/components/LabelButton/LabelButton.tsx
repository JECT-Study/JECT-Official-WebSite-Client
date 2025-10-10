import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { iconSizeMap, StyledLabelButton } from './labelButton.styles';

import { Icon } from '@/components';
import type { IconName, LabelButtonSize, LabelButtonHierarchy } from '@/components';

export interface LabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  hierarchy?: LabelButtonHierarchy;
  size?: LabelButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  (
    {
      children,
      hierarchy = 'primary',
      size = 'md',
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size];

    return (
      <StyledLabelButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $disabled={!!disabled}
        disabled={disabled}
        {...props}
      >
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledLabelButton>
    );
  },
);

LabelButton.displayName = 'LabelButton';
