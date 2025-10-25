import { forwardRef, ReactNode, ComponentPropsWithoutRef, type Ref } from 'react';

import { LabelStyled, LabelSize, LabelTextAlign, LabelWeight } from './Label.style';

/**
 * LabelElement - Label 컴포넌트가 렌더링할 수 있는 HTML 요소 타입
 */
type LabelElement = HTMLLabelElement | HTMLSpanElement | HTMLDivElement | HTMLParagraphElement;

/**
 * LabelProps - Label 컴포넌트의 속성
 *
 * as prop을 통해 다양한 HTML 요소로 렌더링 가능:
 * - 'label' (기본값): 폼 레이블
 * - 'span': 인라인 텍스트 (Badge 내부 등)
 * - 'div': 블록 레벨 텍스트
 * - 'p': 문단 텍스트
 */
export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  as?: 'label' | 'span' | 'div' | 'p';
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  weight?: LabelWeight;
  color?: string;
  children: ReactNode;
}

/**
 * Label - 레이블 컴포넌트
 *
 * 폼 요소와 연결되는 레이블 컴포넌트입니다.
 * as prop을 통해 다양한 HTML 요소로 렌더링 가능합니다.
 *
 * @example
 * // 폼 레이블 (기본값)
 * <Label htmlFor='input-id' size='md' weight='bold'>
 *   이름
 * </Label>
 *
 * @example
 * // Badge 내부 텍스트 (span)
 * <Label as='span' size='sm'>뱃지</Label>
 */
export const Label = forwardRef<LabelElement, LabelProps>(
  (
    { as = 'label', size = 'md', textAlign = 'left', weight = 'normal', color, children, ...props },
    ref,
  ) => {
    return (
      <LabelStyled
        // Note: Emotion의 polymorphic 'as' prop은 런타임에서 정상 작동하지만,
        // TypeScript는 ref 타입을 기본 요소(label)로 고정합니다.
        // 실제 ref는 as prop에 따라 HTMLLabelElement | HTMLSpanElement | HTMLDivElement | HTMLParagraphElement가 되며
        // 런타임에서는 안전하게 처리됩니다.
        ref={ref as Ref<HTMLLabelElement>}
        as={as}
        $size={size}
        $textAlign={textAlign}
        $weight={weight}
        $color={color}
        {...props}
      >
        {children}
      </LabelStyled>
    );
  },
);

Label.displayName = 'Label';
