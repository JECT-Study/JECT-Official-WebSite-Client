import styled from '@emotion/styled';
import { mediaQuery, textStyle } from 'utils';
import { StyledLabelProps } from './Label.types';
import { DeviceType } from 'types';

export const StyledLabel = styled.div<StyledLabelProps>(
  ({ theme, size, textAlign, weight, color }) => {
    const getTextStyle = (deviceType: DeviceType) => {
      return textStyle(theme, deviceType, `label.${size}.${weight}`);
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
      color: color,
      cursor: 'default',
      // [mediaQuery.mobile]: { ...getTextStyle('mobile') },
      // [mediaQuery.tablet]: { ...getTextStyle('tablet') },
      // [mediaQuery.desktop]: { ...getTextStyle('desktop') },
    };
  },
);
