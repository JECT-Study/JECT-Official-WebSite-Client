import styled from '@emotion/styled';
import { textStyle } from 'utils';

export const SIZE_TO_TEXT_STYLE = {
  xs: 'hero.1',
  sm: 'hero.2',
  md: 'hero.3',
  lg: 'hero.4',
} as const;

export const TEXT_ALIGN_MAPPING = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
} as const;

export type HeroSize = keyof typeof SIZE_TO_TEXT_STYLE;
export type HeroTextAlign = keyof typeof TEXT_ALIGN_MAPPING;

interface StyledHeroProps {
  size: HeroSize;
  textAlign: HeroTextAlign;
  color: string;
}

export const HeroDiv = styled.div<StyledHeroProps>(
  ({ theme, size = 'lg', textAlign = 'center', color }) => {
    const textStyleKey = SIZE_TO_TEXT_STYLE[size];
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
  },
);
