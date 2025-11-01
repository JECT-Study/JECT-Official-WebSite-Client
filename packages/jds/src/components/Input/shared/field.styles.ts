import isPropValid from '@emotion/is-prop-valid';
import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { pxToRem } from 'utils';

import { Label } from '../../Label';
import type { InputLayout, InputStyle, InputValidation } from '../input.types';

export const getLabelColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.semantic.object.assistive;
  }

  if (readOnly) {
    return theme.color.semantic.object.normal;
  }

  return theme.color.semantic.object.normal;
};

export const getHelperTextColor = (
  theme: Theme,
  validation: InputValidation,
  disabled: boolean,
  readOnly: boolean,
): string => {
  if (disabled) {
    const disabledColorMap = {
      none: theme.color.semantic.object.subtle,
      error: theme.color.semantic.feedback.destructive.alpha.assistive,
      success: theme.color.semantic.feedback.positive.alpha.assistive,
    };
    return disabledColorMap[validation];
  }

  if (readOnly) {
    const readOnlyColorMap = {
      none: theme.color.semantic.object.alternative,
      error: theme.color.semantic.feedback.destructive.alpha.assistive,
      success: theme.color.semantic.feedback.positive.alpha.assistive,
    };
    return readOnlyColorMap[validation];
  }

  const helperColorMap = {
    none: theme.color.semantic.object.alternative,
    error: theme.color.semantic.feedback.destructive.neutral,
    success: theme.color.semantic.feedback.positive.neutral,
  };

  return helperColorMap[validation];
};

export const StyledFieldContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{ $layout: InputLayout }>(({ theme, $layout }) => ({
  display: 'flex',
  padding: 0,
  width: '100%',
  flexDirection: $layout === 'vertical' ? 'column' : 'row',
  justifyContent: $layout === 'vertical' ? 'center' : undefined,
  alignItems: 'flex-start',
  gap:
    $layout === 'vertical'
      ? pxToRem(theme.scheme.desktop.spacing[6])
      : pxToRem(theme.scheme.desktop.spacing[16]),

  [theme.breakPoint.tablet]: {
    gap:
      $layout === 'vertical'
        ? pxToRem(theme.scheme.tablet.spacing[6])
        : pxToRem(theme.scheme.tablet.spacing[16]),
  },

  [theme.breakPoint.mobile]: {
    gap:
      $layout === 'vertical'
        ? pxToRem(theme.scheme.mobile.spacing[6])
        : pxToRem(theme.scheme.mobile.spacing[16]),
  },
}));

export const StyledLabelContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{ $layout?: InputLayout }>(({ theme, $layout }) => ({
  display: 'flex',
  padding: 0,
  alignItems: $layout === 'horizontal' ? 'flex-start' : 'center',
  alignSelf: 'stretch',
  gap: pxToRem(theme.scheme.desktop.spacing[4]),

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[4]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[4]),
  },
}));

export const StyledFieldLabel = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{ $disabled: boolean; $readOnly: boolean; $layout?: InputLayout }>(
  ({ theme, $disabled, $readOnly, $layout }) => ({
    color: getLabelColor(theme, $disabled, $readOnly),
    ...($layout === 'horizontal' && {
      height: pxToRem(40),
      minWidth: pxToRem(80),
      maxWidth: pxToRem(120),
    }),
  }),
);

export const StyledHelperText = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $validation: InputValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  color: getHelperTextColor(theme, $validation, $disabled, $readOnly),
}));

export const StyledInputColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '1 0 0',
  alignSelf: 'stretch',
  gap: pxToRem(theme.scheme.desktop.spacing[6]),

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[6]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[6]),
  },
}));

export const StyledInputRow = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $style?: InputStyle;
  $layout?: InputLayout;
}>(({ theme, $style, $layout }) => {
  const isEmptyVertical = $style === 'empty' && $layout === 'vertical';
  const gapValue = isEmptyVertical ? 20 : 12;

  return {
    display: 'flex',
    gap: pxToRem(theme.scheme.desktop.spacing[gapValue]),
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',

    [theme.breakPoint.tablet]: {
      gap: pxToRem(theme.scheme.tablet.spacing[gapValue]),
    },

    [theme.breakPoint.mobile]: {
      gap: pxToRem(theme.scheme.mobile.spacing[gapValue]),
    },
  };
});
