import styled from '@emotion/styled';
import { RadioSize } from './Radio';
import { RADIO_SIZE } from './radio.variants';
import { interaction, pxToRem } from 'utils';

interface RadioStyledProps {
  size: RadioSize;
}

export const RadioLabel = styled.label<RadioStyledProps>(({ theme, size }) => {
  return {
    display: 'inline-flex',
    position: 'relative',

    [`input[type="radio"]:checked + .visual`]: {
      backgroundColor: theme.color.surface.static.standard,
      border: `${RADIO_SIZE[size].border}px solid ${theme.color.accent.neutral}`,
    },

    [`input[type="radio"]:disabled + .visual`]: {
      backgroundColor: theme.color.fill.assistive,
      borderColor: theme.color.stroke.subtle,
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

export const Visual = styled.span<RadioStyledProps>(({ theme, size }) => {
  const sizeValue = pxToRem(RADIO_SIZE[size].size);

  return {
    borderRadius: theme.scheme.desktop.radius.max,
    width: sizeValue,
    height: sizeValue,
    border: `1px solid ${theme.color.stroke.alpha.assistive}`,
    backgroundColor: theme.color.surface.shallow,
    ...interaction(theme, 'normal', 'normal', 'default'),
  };
});
