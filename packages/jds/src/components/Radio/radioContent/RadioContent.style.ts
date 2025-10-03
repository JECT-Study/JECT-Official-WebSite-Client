import styled from '@emotion/styled';
import { interaction, pxToRem } from 'utils';
import { RADIO_CONTAINER_SIZE, RadioSize } from './radioContent.variants';

interface RadioContainerProps {
  radioSize: RadioSize;
  isDisabled: boolean;
  isAlignRight: boolean;
  isStyleOutline: boolean;
}

export const RadioContainerLabel = styled.label<RadioContainerProps>(
  ({ theme, radioSize, isDisabled, isAlignRight, isStyleOutline }) => {
    const rowGap = RADIO_CONTAINER_SIZE[radioSize].gap as keyof typeof theme.scheme.desktop.spacing;
    const padding = RADIO_CONTAINER_SIZE[radioSize]
      .padding as keyof typeof theme.scheme.desktop.spacing;
    const borderRadius = RADIO_CONTAINER_SIZE[radioSize]
      .borderRadius as keyof typeof theme.scheme.desktop.radius;
    const interactionWidth = RADIO_CONTAINER_SIZE[radioSize].width;
    const interactionHeight = RADIO_CONTAINER_SIZE[radioSize].height;
    const borderColor = isDisabled
      ? theme.color.stroke.alpha.subtler
      : theme.color.stroke.alpha.subtle;
    const checkedInteraction = interaction(
      theme,
      'accent',
      'assistive',
      'default',
      isDisabled ? 'readonly' : 'default',
    );
    const nonCheckedInteraction = interaction(
      theme,
      'normal',
      'normal',
      'default',
      isDisabled ? 'readonly' : 'default',
    );
    const addonInteraction = isStyleOutline
      ? {
          border: 'inherit',
        }
      : {
          width: `calc(100% + ${interactionWidth}px)`,
          height: `calc(100% + ${interactionHeight}px)`,
          transform: `translate(-${Math.floor(interactionWidth / 2) + 1}px , -${Math.floor(interactionHeight / 2)}px)`,
        };

    return {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      '& > :nth-child(1)': {
        gridColumn: 1,
        gridRow: 1,
        justifyItems: 'center',
        alignItems: 'center',
      },
      '& > :nth-child(2)': {
        gridColumn: 2,
        gridRow: 1,
        justifyItems: 'center',
        alignItems: 'center',
      },
      '& > :nth-child(3)': {
        gridColumn: isAlignRight ? '1 / span 2' : 2,
        gridRow: 2,
      },

      gap: `${pxToRem(theme.scheme.desktop.spacing[6])} ${pxToRem(theme.scheme.desktop.spacing[rowGap])} `,
      border: isStyleOutline ? `1px solid ${borderColor}` : 'none',
      borderRadius: pxToRem(theme.scheme.desktop.radius[borderRadius]),
      padding: isStyleOutline ? pxToRem(theme.scheme.desktop.spacing[padding]) : '0',
      cursor: isDisabled ? 'default' : 'pointer',
      '& *': { cursor: 'inherit' },
      ...nonCheckedInteraction,

      [theme.breakPoint.tablet]: {
        gap: `${pxToRem(theme.scheme.tablet.spacing[6])} ${pxToRem(theme.scheme.tablet.spacing[rowGap])} `,
        borderRadius: pxToRem(theme.scheme.tablet.radius[borderRadius]),
        padding: isStyleOutline ? pxToRem(theme.scheme.tablet.spacing[padding]) : '0',
      },

      [theme.breakPoint.mobile]: {
        gap: `${pxToRem(theme.scheme.mobile.spacing[6])} ${pxToRem(theme.scheme.mobile.spacing[rowGap])} `,
        borderRadius: pxToRem(theme.scheme.mobile.radius[borderRadius]),
        padding: isStyleOutline ? pxToRem(theme.scheme.mobile.spacing[padding]) : '0',
      },

      '::after': {
        ...nonCheckedInteraction['::after'],
        ...addonInteraction,
        transition: `all ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}`,
      },

      '&:active::after': {
        transition: 'none',
      },

      '&:has(input[type="radio"]:checked)': {
        ...checkedInteraction,
        '::after': {
          ...checkedInteraction['::after'],
          ...addonInteraction,
        },
      },

      '&:has(input[type="radio"]:focus-visible)::before': {
        ...addonInteraction,
        boxShadow: `0 0 0 3px ${theme.color.interaction.focus}`,
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: pxToRem(theme.scheme.desktop.radius[borderRadius]),

        [theme.breakPoint.tablet]: {
          borderRadius: pxToRem(theme.scheme.tablet.radius[borderRadius]),
        },

        [theme.breakPoint.mobile]: {
          borderRadius: pxToRem(theme.scheme.mobile.radius[borderRadius]),
        },
      },

      'input[type="radio"]:focus-visible + .visual': {
        boxShadow: 'none !important',
      },
    };
  },
);
