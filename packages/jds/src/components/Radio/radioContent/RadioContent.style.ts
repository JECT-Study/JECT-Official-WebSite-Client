import styled from '@emotion/styled';
import { RadioSize } from './RadioContent';
import { interaction, pxToRem } from 'utils';
import { RADIO_CONTAINER_SIZE } from './radioContent.variants';

interface RadioContainerProps {
  radioSize: RadioSize;
  isDisabled: boolean;
}

export const RadioContainer = styled.div<RadioContainerProps>(
  ({ theme, isDisabled, radioSize }) => {
    const gap = pxToRem(RADIO_CONTAINER_SIZE(theme)[radioSize].gap);
    const interactionStyles = interaction(
      theme,
      'normal',
      'normal',
      'default',
      isDisabled ? 'readonly' : 'default',
    );

    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap,
      borderRadius: theme.scheme.desktop.radius[6],
      ...interactionStyles,

      [`&:has(input[type="radio"]:checked)`]: {
        ...interaction(
          theme,
          'accent',
          'assistive',
          'default',
          isDisabled ? 'readonly' : 'default',
        ),
      },

      '::after': {
        ...interactionStyles['::after'],
        transform: 'scale(1.175, 1.33)',
        pointerEvents: 'none',
      },

      '&:not(:active):hover::after': {
        ...interactionStyles['&:hover::after'],
        transition: `transform ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}, opacity ${theme.environment.duration[100]}ms ${theme.environment.motion.fluent}`,
      },

      '&:has(input[type="radio"]:focus-visible)::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        transform: 'scale(1.175, 1.33)',
        boxShadow: `0 0 0 3px ${theme.color.interaction.focus}`,
      },

      [`input[type="radio"]:focus-visible + .visual`]: {
        boxShadow: 'none !important',
      },
    };
  },
);
