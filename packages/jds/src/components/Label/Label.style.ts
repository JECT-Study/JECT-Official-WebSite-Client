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
}

export const LabelStyled = styled('label', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<LabelStyledProps>(({ theme, $size, $textAlign, $weight }) => {
  const textStyleKey = `label.${$size}.${$weight}` as TextStyle;
  const justifyContent = TEXT_ALIGN_MAPPING[$textAlign];

  return {
    display: 'flex',
    justifyContent,
    alignItems: 'center',
    color: theme.color.semantic.object.bold,
    cursor: 'default',
    ...textStyle(theme, 'desktop', textStyleKey),
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', textStyleKey) },
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', textStyleKey) },
  };
});
