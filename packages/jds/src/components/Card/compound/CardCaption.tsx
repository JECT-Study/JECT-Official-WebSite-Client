import { forwardRef } from 'react';

import type { CardCaptionProps } from '../Card.types';
import { StyledCardCaption } from './compound.styles';

/**
 * Card.Caption
 *
 * @description
 * Card의 보조 텍스트(캡션) 컴포넌트입니다.
 * 주로 카테고리, 날짜 등의 메타 정보를 표시합니다.
 * Label 스타일을 재사용하며, 완벽한 타입 안정성을 제공합니다.
 *
 * @example
 * <Card.Caption>2024 Spring</Card.Caption>
 */
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
