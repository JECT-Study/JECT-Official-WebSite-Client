import { forwardRef, type Ref } from 'react';

import { StyledDivider, StyledVerticalDivider } from './divider.styles';
import type { DividerProps } from './divider.types';

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ thickness = 'normal', orientation = 'horizontal', decorative = false, ...restProps }, ref) => {
    if (orientation === 'vertical') {
      return (
        <StyledVerticalDivider
          ref={ref as Ref<HTMLDivElement>}
          role='separator'
          aria-orientation='vertical'
          aria-hidden={decorative}
          $thickness={thickness}
          {...restProps}
        />
      );
    }

    return (
      <StyledDivider
        ref={ref as Ref<HTMLHRElement>}
        aria-hidden={decorative}
        $orientation={orientation}
        $thickness={thickness}
        {...restProps}
      />
    );
  },
);

Divider.displayName = 'Divider';
