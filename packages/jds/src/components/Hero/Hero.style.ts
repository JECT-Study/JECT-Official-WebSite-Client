import styled from '@emotion/styled';
import { textStyle } from 'utils';
import { StyledHeroProps } from './Hero.types';
import { DeviceType } from 'types';

export const StyledHero = styled.div<StyledHeroProps>(({ theme, size, textAlign }) => {
  const getTextStyle = (deviceType: DeviceType) => {
    switch (size) {
      case 'xs':
        return textStyle(theme, deviceType, 'hero.1');
      case 'sm':
        return textStyle(theme, deviceType, 'hero.2');
      case 'md':
        return textStyle(theme, deviceType, 'hero.3');
      case 'lg':
        return textStyle(theme, deviceType, 'hero.4');
      default:
        return textStyle(theme, deviceType, 'hero.4');
    }
  };

  const getTextAlign = () => {
    switch (textAlign) {
      case 'center':
        return 'center';
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  return {
    display: 'flex',
    justifyContent: getTextAlign(),
    alignItems: 'center',
    color: theme.color.object.boldest,
    cursor: 'default',
    [theme.breakPoint.mobile]: { ...getTextStyle('mobile') },
    [theme.breakPoint.tablet]: { ...getTextStyle('tablet') },
    [theme.breakPoint.desktop]: { ...getTextStyle('desktop') },
  };
});
