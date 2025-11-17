import { forwardRef } from 'react';

import type { CardTitleProps } from '../Card.types';
import { StyledCardTitle } from './compound.styles';

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardTitle ref={ref} {...restProps}>
        {children}
      </StyledCardTitle>
    );
  },
);

CardTitle.displayName = 'Card.Title';
