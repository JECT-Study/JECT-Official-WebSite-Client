import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { TextStyle } from 'types';
import { textStyle } from 'utils';

import { TEXT_ALIGN_MAPPING } from '../Hero/Hero.style';

export type LabelSize = 'lg' | 'md' | 'sm' | 'xs';
export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type LabelWeight = 'bold' | 'normal' | 'subtle';

interface LabelStyledProps {
  $size: LabelSize;
  $textAlign: LabelTextAlign;
  $weight: LabelWeight;
  $color?: string;
}

/**
 * LabelStyled - Label 컴포넌트의 스타일드 컴포넌트
 *
 * styled('label')을 사용하여 Emotion의 polymorphic `as` prop 지원
 * Desktop First 전략: desktop 스타일을 기본값으로 하고 tablet, mobile만 미디어 쿼리 적용
 */
export const LabelStyled = styled('label', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<LabelStyledProps>(({ theme, $size, $textAlign, $weight, $color }) => {
  const textStyleKey = `label.${$size}.${$weight}` as TextStyle;
  const justifyContent = TEXT_ALIGN_MAPPING[$textAlign];

  return {
    display: 'flex',
    justifyContent,
    alignItems: 'center',
    color: $color ?? theme.color.object.bold,
    cursor: 'default',
    ...textStyle(theme, 'desktop', textStyleKey),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', textStyleKey) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', textStyleKey) },
  };
});
