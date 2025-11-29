import isPropValid from '@emotion/is-prop-valid';
import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import type {
  StepSize,
  StyledStepContentProps,
  StyledStepItemProps,
  StyledStepRootProps,
} from './step.types';
import { Label } from '../Label';

const STEP_STATUS_COLORS = {
  completed: {
    divider: (theme: Theme) => theme.color.semantic.accent.alpha.subtle,
    content: (theme: Theme) => theme.color.semantic.object.alternative,
  },
  ongoing: {
    divider: (theme: Theme) => theme.color.semantic.accent.neutral,
    content: (theme: Theme) => theme.color.semantic.object.bolder,
  },
  uncompleted: {
    divider: (theme: Theme) => theme.color.semantic.stroke.assistive,
    content: (theme: Theme) => theme.color.semantic.object.assistive,
  },
} as const;

export const StyledCounterNumber = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{ $size: StepSize }>(({ theme, $size }) => {
  const counterStyleMap = {
    lg: {
      textStyle: theme.textStyle['semantic-textStyle-title-2'],
    },
    md: {
      textStyle: theme.textStyle['semantic-textStyle-title-1'],
    },
    sm: {
      textStyle: theme.textStyle['semantic-textStyle-label-lg-bold'],
    },
    xs: {
      textStyle: theme.textStyle['semantic-textStyle-label-md-bold'],
    },
  };

  const { textStyle } = counterStyleMap[$size];

  return {
    ...textStyle,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: textStyle.lineHeight as string,
    height: textStyle.lineHeight as string,
    color: 'inherit',
    cursor: 'default',
    '&::before': {
      content: 'counter(step-counter)',
    },
  };
});

export const StyledStepRoot = styled('div', {
  shouldForwardProp: prop => isPropValid(prop),
})<StyledStepRootProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  gap: theme.scheme.semantic.spacing[8],
  counterReset: 'step-counter',
}));

export const StyledStepItem = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<StyledStepItemProps>(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    minWidth: 0,
    counterIncrement: 'step-counter',

    '&[data-status="completed"]': {
      '--step-divider-color': STEP_STATUS_COLORS.completed.divider(theme),
      '--step-content-color': STEP_STATUS_COLORS.completed.content(theme),
    },
    '&[data-status="ongoing"]': {
      '--step-divider-color': STEP_STATUS_COLORS.ongoing.divider(theme),
      '--step-content-color': STEP_STATUS_COLORS.ongoing.content(theme),
    },
    '&[data-status="uncompleted"]': {
      '--step-divider-color': STEP_STATUS_COLORS.uncompleted.divider(theme),
      '--step-content-color': STEP_STATUS_COLORS.uncompleted.content(theme),
    },

    '& hr': {
      borderColor: 'var(--step-divider-color)',
    },
  };
});

export const StyledStepContent = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<StyledStepContentProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.scheme.semantic.spacing[4],
    padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[16]} ${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[8]}`,
    width: '100%',
    color: 'var(--step-content-color)',
  };
});

export const StyledStepLabel = styled(Label)(({ theme }) => ({
  flex: '1 0 0',
  paddingBottom: theme.scheme.semantic.spacing[2],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
