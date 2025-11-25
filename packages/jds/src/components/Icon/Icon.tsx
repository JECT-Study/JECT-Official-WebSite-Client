import { type ElementRef, forwardRef } from 'react';

import { StyledIconWrapper } from './Icon.styles';
import type { IconProps } from './Icon.types';
import { iconMap, sizeMap } from './IconMap';

export const Icon = forwardRef<ElementRef<typeof StyledIconWrapper>, IconProps>(
  ({ name, size = 'md', color = 'currentColor', ...props }, ref) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) return null;

    const pixelSize = sizeMap[size];

    return (
      <StyledIconWrapper ref={ref}>
        <IconComponent width={pixelSize} height={pixelSize} color={color} {...props} />
      </StyledIconWrapper>
    );
  },
);

Icon.displayName = 'Icon';
