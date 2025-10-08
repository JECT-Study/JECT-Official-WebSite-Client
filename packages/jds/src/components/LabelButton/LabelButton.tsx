import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { StyledLabelButton } from './labelButton.styles';

import type { LabelButtonSize, LabelButtonHierarchy } from '@/components';

export interface LabelButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  hierarchy?: LabelButtonHierarchy;
  size?: LabelButtonSize;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
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
    return (
      <StyledLabelButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $disabled={!!disabled}
        disabled={disabled}
        {...props}
      >
        {prefixIcon && prefixIcon}
        {children}
        {suffixIcon && suffixIcon}
      </StyledLabelButton>
    );
  },
);

LabelButton.displayName = 'LabelButton';
