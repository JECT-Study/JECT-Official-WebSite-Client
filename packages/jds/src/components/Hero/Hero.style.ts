import styled from '@emotion/styled';
import { textStyle } from 'utils';
import { StyledHeroProps } from './Hero.types';

export const StyledHero = styled.div<StyledHeroProps>(({ theme, size, textAlign }) => {
  const getTextStyle = () => {
    switch (size) {
      case 'xs':
        return textStyle(theme, 'desktop', 'hero.1');
      case 'sm':
        return textStyle(theme, 'desktop', 'hero.2');
      case 'md':
        return textStyle(theme, 'desktop', 'hero.3');
      case 'lg':
        return textStyle(theme, 'desktop', 'hero.4');
      default:
        return textStyle(theme, 'desktop', 'hero.4');
    }
  };

  return {
    display: 'block',
    color: theme.color.object.boldest,
    textAlign: textAlign,
    cursor: 'default',
    ...getTextStyle(),
  };
});
