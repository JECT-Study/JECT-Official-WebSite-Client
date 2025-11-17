import { forwardRef } from 'react';

import type { CardBodyProps } from '../Card.types';
import { StyledCardBody } from './compound.styles';

export const CardBody = forwardRef<HTMLParagraphElement, CardBodyProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardBody ref={ref} {...restProps}>
        {children}
      </StyledCardBody>
    );
  },
);

CardBody.displayName = 'Card.Body';
