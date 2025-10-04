import styled from '@emotion/styled';
import { RadioSize } from './Radio';
import { RADIO_SIZE } from './radio.variants';
import { interaction, pxToRem } from 'utils';

interface RadioStyledProps {
  radioSize: RadioSize;
}

export const RadioLabel = styled.label<RadioStyledProps>(({ theme, radioSize }) => {
  const borderSize = RADIO_SIZE[radioSize]
    .border as keyof typeof theme.scheme.desktop.stroke.weight;

  return {
    display: 'inline-flex',
    position: 'relative',

    [`input[type="radio"]:not(:disabled):checked + .visual`]: {
      backgroundColor: theme.color.surface.static.standard,
      border: `${pxToRem(theme.scheme.desktop.stroke.weight[borderSize])} solid ${theme.color.accent.neutral}`,
      [theme.breakPoint.tablet]: { border: pxToRem(theme.scheme.tablet.stroke.weight[borderSize]) },
      [theme.breakPoint.mobile]: { border: pxToRem(theme.scheme.mobile.stroke.weight[borderSize]) },
    },

    [`input[type="radio"]:not(:checked):disabled + .visual`]: {
      backgroundColor: theme.color.surface.standard,
      borderColor: theme.color.stroke.alpha.subtler,
      cursor: 'default',
      ...interaction(theme, 'normal', 'normal', 'default', 'disabled'),
    },

    [`input[type="radio"]:checked:disabled + .visual`]: {
      backgroundColor: theme.color.fill.subtle,
      border: `${pxToRem(theme.scheme.desktop.stroke.weight[borderSize])}px solid ${theme.color.stroke.subtler}`,
      cursor: 'default',
      ...interaction(theme, 'normal', 'normal', 'default', 'disabled'),

      [theme.breakPoint.tablet]: { border: pxToRem(theme.scheme.tablet.stroke.weight[borderSize]) },
      [theme.breakPoint.mobile]: { border: pxToRem(theme.scheme.mobile.stroke.weight[borderSize]) },
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

export const RadioSpan = styled.span<RadioStyledProps>(({ theme, radioSize }) => {
  const sizeValue = pxToRem(RADIO_SIZE[radioSize].radioSize);

  return {
    borderRadius: theme.scheme.desktop.radius.max,
    width: sizeValue,
    height: sizeValue,
    border: `1px solid ${theme.color.stroke.alpha.assistive}`,
    backgroundColor: theme.color.surface.shallow,
    cursor: 'pointer',
    ...interaction(theme, 'normal', 'normal', 'default'),
  };
});
