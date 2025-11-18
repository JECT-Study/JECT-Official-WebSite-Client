import { forwardRef } from 'react';

import type { CardMetaItemProps } from '../Card.types';
import { StyledCardMetaItem } from './compound.styles';

export const CardMetaItem = forwardRef<HTMLSpanElement, CardMetaItemProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyledCardMetaItem ref={ref} {...restProps}>
        {children}
      </StyledCardMetaItem>
    );
  },
);

CardMetaItem.displayName = 'Card.MetaItem';
