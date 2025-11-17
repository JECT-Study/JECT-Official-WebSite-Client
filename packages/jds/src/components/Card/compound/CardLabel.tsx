import { forwardRef } from 'react';

import type { CardLabelProps } from '../Card.types';
import { StyledCardLabel } from './compound.styles';

export const CardLabel = forwardRef<HTMLHeadingElement, CardLabelProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardLabel ref={ref} {...restProps}>
        {children}
      </StyledCardLabel>
    );
  },
);

CardLabel.displayName = 'Card.Label';
