import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { Icon } from '../Icon';
import { StyledIconButton, getIconSizeForButton } from './iconButton.styles';

import type { IconName } from '@/components';
import type { IconButtonSize, IconButtonHierarchy } from '@/components';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: IconName;
  hierarchy?: IconButtonHierarchy;
  size?: IconButtonSize;
  'aria-label'?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, hierarchy = 'primary', size = 'md', disabled = false, ...props }, ref) => {
    const iconSize = getIconSizeForButton(size);

    return (
      <StyledIconButton
        ref={ref}
        $hierarchy={hierarchy}
        $size={size}
        $disabled={!!disabled}
        disabled={disabled}
        {...props}
      >
        <Icon name={icon} size={iconSize} />
      </StyledIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';
