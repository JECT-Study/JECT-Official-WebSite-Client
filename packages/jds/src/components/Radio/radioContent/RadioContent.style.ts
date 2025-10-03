import styled from '@emotion/styled';
import { interaction } from 'utils';
import { RADIO_CONTAINER_SIZE, RadioSize } from './radioContent.variants';

interface RadioContainerProps {
  radioSize: RadioSize;
  isDisabled: boolean;
}

export const RadioContainer = styled.label<RadioContainerProps>(
  ({ theme, isDisabled, radioSize }) => {
    const rowGap = RADIO_CONTAINER_SIZE[radioSize].gap;
    const interactionWidth = RADIO_CONTAINER_SIZE[radioSize].width;
    const interactionHeight = RADIO_CONTAINER_SIZE[radioSize].height;
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

    return {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: `6px ${rowGap}px `,
      '& > :nth-child(1)': {
        gridColumn: 1,
        gridRow: 1,
        justifyItems: 'center',
        alignItems: 'center',
      },
      '& > :nth-child(2)': { gridColumn: 2, gridRow: 1 },
      '& > :nth-child(3)': { gridColumn: 2, gridRow: 2 },
      borderRadius: theme.scheme.desktop.radius[6],
      cursor: isDisabled ? 'default' : 'pointer',
      '& *': { cursor: 'inherit' },
      ...nonCheckedInteraction,

      '::after': {
        ...nonCheckedInteraction['::after'],
        width: `calc(100% + ${interactionWidth}px)`,
        height: `calc(100% + ${interactionHeight}px)`,
        transform: `translate(-${Math.floor(interactionWidth / 2) + 1}px , -${Math.floor(interactionHeight / 2)}px)`,
        transition: `all ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}`,
      },

      '&:active::after': {
        ...nonCheckedInteraction['&:active::after'],
        transition: 'none',
      },

      '&:has(input[type="radio"]:checked)': {
        ...checkedInteraction,
        '::after': {
          ...checkedInteraction['::after'],
          width: `calc(100% + ${interactionWidth}px)`,
          height: `calc(100% + ${interactionHeight}px)`,
        },
      },

      '&:has(input[type="radio"]:focus-visible)::before': {
        boxShadow: `0 0 0 3px ${theme.color.interaction.focus}`,
        content: '""',
        position: 'absolute',
        inset: 0,
        width: `calc(100% + ${interactionWidth}px)`,
        height: `calc(100% + ${interactionHeight}px)`,
        transform: `translate(-${Math.floor(interactionWidth / 2) + 1}px , -${Math.floor(interactionHeight / 2)}px)`,
        borderRadius: theme.scheme.desktop.radius[6],
      },

      'input[type="radio"]:focus-visible + .visual': {
        boxShadow: 'none !important',
      },
    };
  },
);
