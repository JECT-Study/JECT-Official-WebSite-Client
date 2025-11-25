import { forwardRef } from 'react';

import type { CardCaptionProps } from '../Card.types';
import { StyledCardCaption } from './compound.styles';

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardCaption ref={ref} {...restProps}>
        {children}
      </StyledCardCaption>
    );
  },
);

CardCaption.displayName = 'Card.Caption';
