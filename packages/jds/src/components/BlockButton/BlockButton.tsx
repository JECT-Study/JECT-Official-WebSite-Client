import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { StyledBlockButton } from './blockButton.styles';
import type { BlockButtonSize, BlockButtonHierarchy, BlockButtonStyle } from './blockButton.types';

export interface BlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  hierarchy?: BlockButtonHierarchy;
  size?: BlockButtonSize;
  variant?: BlockButtonStyle;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  (
    {
      children,
      hierarchy = 'primary',
      size = 'md',
      variant = 'solid',
      prefixIcon,
      suffixIcon,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledBlockButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $variant={variant}
        $disabled={!!disabled}
        disabled={disabled}
        {...props}
      >
        {prefixIcon && prefixIcon}
        {children}
        {suffixIcon && suffixIcon}
      </StyledBlockButton>
    );
  },
);

BlockButton.displayName = 'BlockButton';
