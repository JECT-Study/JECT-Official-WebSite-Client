import { forwardRef } from 'react';

import type { CardMetaNudgeItemProps } from '../Card.types';
import { StyledCardMetaNudgeItem, StyledCardMetaNudgeItemLabel } from './compound.styles';

export const CardMetaNudgeItem = forwardRef<HTMLSpanElement, CardMetaNudgeItemProps>(
  ({ label, children, ...restProps }, ref) => {
    return (
      <StyledCardMetaNudgeItem ref={ref} {...restProps}>
        {label && <StyledCardMetaNudgeItemLabel>{label}</StyledCardMetaNudgeItemLabel>}
        {children}
      </StyledCardMetaNudgeItem>
    );
  },
);

CardMetaNudgeItem.displayName = 'Card.MetaNudgeItem';
