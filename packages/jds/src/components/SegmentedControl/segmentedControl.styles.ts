import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, shadow } from 'utils';

import type {
  StyledRootProps,
  StyledContentProps,
  StyledItemProps,
} from './segmentedControl.types';

const segmentedControlItemSizeMap = {
  lg: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[24]}`,
  }),
  md: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[20]}`,
  }),
  sm: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[16]}`,
  }),
  xs: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.spacing[12]}`,
  }),
};

const createInteractionStyles = (theme: Theme, isDisabled: boolean) => {
  const borderRadius = 6;

  const makeLayer = (state: 'rest' | 'hover' | 'active' | 'focus') =>
    InteractionLayer({
      theme,
      state,
      variant: 'normal',
      density: 'assistive',
      fillColor: 'default',
      isDisabled: isDisabled,
      borderRadius,
    });

  return {
    restStyle: makeLayer('rest'),
    hoverStyle: makeLayer('hover'),
    activeStyle: makeLayer('active'),
    focusStyle: makeLayer('focus'),
  };
};

export const SegmentedControlRootStyled = styled.div<StyledRootProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: theme.color.semantic.surface.deeper,
    border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
    borderRadius: theme.scheme.semantic.radius[8],
    padding: theme.scheme.semantic.spacing[2],
  };
});

export const SegmentedControlContentStyled = styled.div<StyledContentProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.scheme.semantic.spacing[2],
  };
});

export const SegmentedControlItemStyled = styled.button<StyledItemProps>(
  ({ theme, $isDisabled, size }) => {
    const interactionStyles = createInteractionStyles(theme, $isDisabled);

    return {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      cursor: 'pointer',
      border: 'none',
      borderRadius: theme.scheme.semantic.radius[6],
      background: 'transparent',
      ...segmentedControlItemSizeMap[size](theme),
      ...interactionStyles.restStyle,
      '&:hover': interactionStyles.hoverStyle,
      '&:active': interactionStyles.activeStyle,
      '&:focus-visible': interactionStyles.focusStyle,

      '&[data-state="on"]': {
        border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
        color: theme.color.semantic.object.normal,
        background: theme.color.semantic.surface.shallowest,
        ...shadow(theme, 'embossed'),

        '&:focus-visible': {
          boxShadow: `${shadow(theme, 'embossed').boxShadow}, 0 0 0 3px ${theme.color.semantic.interaction.focus}`,
        },
      },

      '&[data-state="off"]': {
        color: theme.color.semantic.object.alternative,
      },

      '&:disabled': {
        cursor: 'not-allowed',
      },
    };
  },
);
