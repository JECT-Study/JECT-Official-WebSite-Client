import styled from '@emotion/styled';
import { ImgOrientation, ImgRatio } from './Image';
import { CSSProperties } from 'react';
import { interaction, pxToRem } from 'utils';
import { Label, Icon } from '@/components';

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
      border: `${theme.scheme.desktop.stroke.weight[1]}px solid ${theme.color.stroke.alpha.subtler}`,
      borderRadius: 'inherit',

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: 'inherit',
      },

      ...interactionStyle,

      '&::after': {
        ...interactionStyle['::after'],
        width: 'calc(100% + 2px)',
        height: 'calc(100% + 2px)',
        inset: '-1px',
      },

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

export const ImageLabelDiv = styled.div(({ theme }) => {
  return {
    position: 'absolute',
    top: '8px',
    left: '8px',
    zIndex: 50,
    minWidth: `${pxToRem(18)}`,
    backgroundColor: theme.color.object.static.neutral,
    padding: `0 ${theme.scheme.desktop.spacing[2]}px`,
    borderRadius: theme.scheme.desktop.radius[2],
  };
});

export const StyledLabel = styled(Label)(({ theme }) => {
  return {
    color: theme.color.object.static.inverse.boldest,
  };
});

export const StyledIcon = styled(Icon)(({ theme }) => {
  return {
    color: theme.color.object.static.inverse.boldest,
  };
});
