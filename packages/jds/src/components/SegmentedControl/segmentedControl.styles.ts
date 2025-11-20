import type { Theme } from '@emotion/react';
import type { CSSObject } from '@emotion/styled';
import styled from '@emotion/styled';
import { InteractionLayer, shadow } from 'utils';

import type {
  StyledRootProps,
  StyledContentProps,
  StyledItemProps,
  SegmentedControlSize,
} from './segmentedControl.types';

const segmentedControlItemSizeMap = (
  theme: Theme,
): Record<SegmentedControlSize, { padding: string }> => ({
  lg: {
    padding: `${theme.scheme.semantic.spacing[10]} ${theme.scheme.semantic.spacing[24]}`,
  },
  md: {
    padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[20]}`,
  },
  sm: {
    padding: `${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[16]}`,
  },
  xs: {
    padding: `${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.spacing[12]}`,
  },
});

const interactionStyles = (theme: Theme, isDisabled: boolean): CSSObject => {
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

  const interactionParams = {
    restStyle: makeLayer('rest'),
    hoverStyle: makeLayer('hover'),
    activeStyle: makeLayer('active'),
    focusStyle: makeLayer('focus'),
  };

  return {
    ...interactionParams.restStyle,
    '&:hover': {
      ...interactionParams.hoverStyle,
    },
    '&:active': {
      ...interactionParams.activeStyle,
    },
    '&:focus-visible': {
      ...interactionParams.focusStyle,
      zIndex: 50,
    },
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
      ...segmentedControlItemSizeMap(theme)[size],
      ...interactionStyles(theme, $isDisabled),

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
