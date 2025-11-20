import styled from '@emotion/styled';

import { TEXT_ALIGN_MAPPING } from '../Hero/Hero.style';

export type TitleSize = 'lg' | 'md' | 'sm' | 'xs';
export type TitleTextAlign = keyof typeof TEXT_ALIGN_MAPPING;

interface TitleDivProps {
  size: TitleSize;
  textAlign: TitleTextAlign;
  color?: string;
}

export const titleStylesMap = {
  lg: 'semantic-textStyle-title-4',
  md: 'semantic-textStyle-title-3',
  sm: 'semantic-textStyle-title-2',
  xs: 'semantic-textStyle-title-1',
} as const;

export const TitleDiv = styled.div<TitleDivProps>(({ theme, size, textAlign, color }) => {
  const tokenKey = titleStylesMap[size];
  const justifyContent = TEXT_ALIGN_MAPPING[textAlign];
  const BaseColor = color || theme.color.semantic.object.bolder;

  return {
    display: 'flex',
    justifyContent,
    alignItems: 'center',
    color: BaseColor,
    cursor: 'default',
    ...theme.textStyle[tokenKey],
  };
});
