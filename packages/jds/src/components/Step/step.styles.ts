import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import type { StepSize } from './step.types';
import { Label } from '../Label';

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
  };
});

export const StyledStepRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  gap: theme.scheme.semantic.spacing[8],
}));

export const StyledStepItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  position: 'relative',
  minWidth: 0,
  cursor: 'default',

  '&[data-status="completed"]': {
    '& hr': {
      borderColor: theme.color.semantic.accent.alpha.subtle,
    },
    color: theme.color.semantic.object.alternative,
  },
  '&[data-status="ongoing"]': {
    '& hr': {
      borderColor: theme.color.semantic.accent.neutral,
    },
    color: theme.color.semantic.object.bolder,
  },
  '&[data-status="uncompleted"]': {
    '& hr': {
      borderColor: theme.color.semantic.stroke.assistive,
    },
    color: theme.color.semantic.object.assistive,
  },
}));

export const StyledStepContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  gap: theme.scheme.semantic.spacing[4],
  padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[16]} ${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[8]}`,
  width: '100%',
  color: 'inherit',
}));

export const StyledStepLabel = styled(Label)(({ theme }) => ({
  flex: '1 0 0',
  paddingTop: theme.scheme.semantic.spacing[2],
}));
