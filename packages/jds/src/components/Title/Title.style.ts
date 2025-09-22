import styled from '@emotion/styled';
import { textStyle } from 'utils';
import { TextStyle } from 'types';
import { TEXT_ALIGN_MAPPING } from '../Hero/Hero.style';

export type LabelSize = 'lg' | 'md' | 'sm' | 'xs';
export type LabelTextAlign = keyof typeof TEXT_ALIGN_MAPPING;

interface TitleDivProps {
  size: LabelSize;
  textAlign: LabelTextAlign;
  color: string;
}

export const TITLE_STYLE = {
  lg: 'title.4',
  md: 'title.3',
  sm: 'title.2',
  xs: 'title.1',
} as const;

export const TitleDiv = styled.div<TitleDivProps>(({ theme, size, textAlign, color }) => {
  const textStyleKey = TITLE_STYLE[size] as TextStyle;
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
