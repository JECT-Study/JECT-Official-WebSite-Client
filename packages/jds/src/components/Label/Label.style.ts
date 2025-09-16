import styled from '@emotion/styled';
import { textStyle } from 'utils';
import { TextStyle } from 'types';
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

export const LabelDiv = styled.div<LabelDivProps>(({ theme, size, textAlign, weight, color }) => {
  const textStyleKey = `label.${size}.${weight}` as TextStyle;
  const justifyContent = TEXT_ALIGN_MAPPING[textAlign];

  return {
    display: 'flex',
    justifyContent,
    alignItems: 'center',
    color,
    cursor: 'default',
    [theme.breakPoint.mobile]: { ...textStyle(theme, 'mobile', textStyleKey) },
    [theme.breakPoint.tablet]: { ...textStyle(theme, 'tablet', textStyleKey) },
    [theme.breakPoint.desktop]: { ...textStyle(theme, 'desktop', textStyleKey) },
  };
});
