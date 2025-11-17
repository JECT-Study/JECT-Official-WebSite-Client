import { forwardRef } from 'react';

import { useCardContext } from '../Card.context';
import type { CardContentProps } from '../Card.types';
import { StyledCardContent } from './compound.styles';

/**
 * @description
 * Card의 콘텐츠 컨테이너입니다.
 * 텍스트 요소들(Caption, Title, Body 등)을 감싸는 역할을 합니다.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...restProps }, ref) => {
    const { variant, layout } = useCardContext();

    return (
      <StyledCardContent ref={ref} $variant={variant} $layout={layout} {...restProps}>
        {children}
      </StyledCardContent>
    );
  },
);

CardContent.displayName = 'Card.Content';
