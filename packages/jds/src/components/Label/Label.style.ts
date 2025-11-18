import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { TEXT_ALIGN_MAPPING } from '../Hero/Hero.style';

export type LabelSize = 'lg' | 'md' | 'sm' | 'xs';
export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;
export type LabelWeight = 'bold' | 'normal' | 'subtle';

interface LabelDivProps {
  size: LabelSize;
  textAlign: LabelTextAlign;
  weight: LabelWeight;
  color: string;
}

const getLabelTokenKey = (size: LabelSize, weight: LabelWeight): keyof Theme['textStyle'] => {
  return `semantic-textStyle-label-${size}-${weight}` as keyof Theme['textStyle'];
};

export const LabelDiv = styled.div<LabelDivProps>(({ theme, size, textAlign, weight, color }) => {
  const tokenKey = getLabelTokenKey(size, weight);
  const justifyContent = TEXT_ALIGN_MAPPING[textAlign];

  return {
    display: 'flex',
    justifyContent,
    alignItems: 'center',
    color,
    cursor: 'default',
    ...theme.textStyle[tokenKey],
  };
});
