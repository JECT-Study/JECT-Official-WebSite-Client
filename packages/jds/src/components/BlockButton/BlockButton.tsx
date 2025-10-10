import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { iconSizeMap, StyledBlockButton } from './blockButton.styles';

import { Icon } from '@/components';
import type { BlockButtonSize, BlockButtonHierarchy, BlockButtonStyle, IconName } from '@/components';

export interface BlockButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  hierarchy?: BlockButtonHierarchy;
  size?: BlockButtonSize;
  variant?: BlockButtonStyle;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
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
    const iconSize = iconSizeMap[size];

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
        {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
        {children}
        {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
      </StyledBlockButton>
    );
  },
);

BlockButton.displayName = 'BlockButton';
