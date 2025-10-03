import styled from '@emotion/styled';
import { RadioSize } from './Radio';
import { RADIO_SIZE } from './radio.variants';
import { interaction, pxToRem } from 'utils';

interface RadioStyledProps {
  radioSize: RadioSize;
}

export const RadioLabel = styled.label<RadioStyledProps>(({ theme, radioSize }) => {
  return {
    display: 'inline-flex',
    position: 'relative',

    [`input[type="radio"]:not(:disabled):checked + .visual`]: {
      backgroundColor: theme.color.surface.static.standard,
      border: `${RADIO_SIZE[radioSize].border}px solid ${theme.color.accent.neutral}`,
    },

    [`input[type="radio"]:not(:checked):disabled + .visual`]: {
      backgroundColor: theme.color.surface.standard,
      borderColor: theme.color.stroke.alpha.subtler,
      ...interaction(theme, 'normal', 'normal', 'default', 'disabled'),
    },

    [`input[type="radio"]:checked:disabled + .visual`]: {
      backgroundColor: theme.color.fill.subtle,
      border: `${RADIO_SIZE[radioSize].border}px solid ${theme.color.stroke.subtler}`,
      ...interaction(theme, 'normal', 'normal', 'default', 'disabled'),
    },

    [`input[type="radio"]:focus-visible + .visual`]: {
      boxShadow: `0 0 0 3px ${theme.color.interaction.focus}`,
    },
  };
});

export const RadioInput = styled.input({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

export const Visual = styled.span<RadioStyledProps>(({ theme, radioSize }) => {
  const sizeValue = pxToRem(RADIO_SIZE[radioSize].radioSize);

  return {
    borderRadius: theme.scheme.desktop.radius.max,
    width: sizeValue,
    height: sizeValue,
    border: `1px solid ${theme.color.stroke.alpha.assistive}`,
    backgroundColor: theme.color.surface.shallow,
    ...interaction(theme, 'normal', 'normal', 'default'),
  };
});
