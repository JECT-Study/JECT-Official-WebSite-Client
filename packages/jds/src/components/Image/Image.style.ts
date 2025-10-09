import styled from '@emotion/styled';
import { ImgOrientation, ImgRatio } from './Image';
import { CSSProperties } from 'react';
import { interaction } from 'utils';

export const getAspectRatioValue = (
  ratio: ImgRatio,
  orientation: ImgOrientation,
): CSSProperties['aspectRatio'] => {
  const [w, h] = ratio.split(':').map(Number);

  if (orientation === 'landscape') return `${h} / ${w}`;
  return `${w} / ${h}`;
};

interface ImageButtonProps {
  ratio: ImgRatio;
  orientation: ImgOrientation;
  isReadonly: boolean;
}

export const ImageButton = styled.button<ImageButtonProps>(
  ({ theme, ratio, orientation, isReadonly }) => {
    const interactionStyle = interaction(
      theme,
      'normal',
      'assistive',
      'default',
      isReadonly ? 'readonly' : 'default',
    );
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
      aspectRatio: getAspectRatioValue(ratio, orientation),
      overflow: 'hidden',
      border: `${theme.scheme.desktop.stroke.weight[1]}px solid ${theme.color.stroke.alpha.subtler}`,
      borderRadius: 'inherit',

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      },

      ...interactionStyle,

      '&:hover::after': {
        backgroundColor: theme.color.curtain.dimmer,
        opacity: isReadonly ? 0 : 1,
        cursor: isReadonly ? 'default' : 'pointer',
      },

      '&:hover > .hoverIcon': {
        opacity: 1,
      },

      '&:active::after': {},
    };
  },
);

export const IconDiv = styled.div(({}) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50,
    opacity: 0,
  };
});
