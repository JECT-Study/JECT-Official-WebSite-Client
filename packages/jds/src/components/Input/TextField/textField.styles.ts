import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { TextFieldStyle, TextFieldValidation } from 'components';
import { Label } from 'components';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

const getBorderColor = (
  theme: Theme,
  validation: TextFieldValidation,
  state: 'rest' | 'hover' | 'active' | 'focus',
  disabled: boolean,
): string => {
  if (disabled) {
    return theme.color.stroke.alpha.subtle;
  }

  const borderColorMap = {
    none: {
      rest: theme.color.stroke.alpha.assistive,
      hover: theme.color.stroke.alpha.normal,
      active: theme.color.stroke.alpha.assistive,
      focus: theme.color.accent.neutral,
    },
    error: {
      rest: theme.color.feedback.destructive.alpha.assistive,
      hover: theme.color.feedback.destructive.neutral,
      active: theme.color.feedback.destructive.neutral,
      focus: theme.color.feedback.destructive.neutral,
    },
    success: {
      rest: theme.color.feedback.positive.alpha.assistive,
      hover: theme.color.feedback.positive.neutral,
      active: theme.color.feedback.positive.neutral,
      focus: theme.color.feedback.positive.neutral,
    },
  };

  return borderColorMap[validation][state];
};

const getTextColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.object.assistive;
  }
  if (readOnly) {
    return theme.color.object.subtle;
  }
  return theme.color.object.boldest;
};

const getLabelColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.object.assistive;
  }

  if (readOnly) {
    return theme.color.object.normal;
  }

  return theme.color.object.normal;
};

const getHelperTextColor = (
  theme: Theme,
  validation: TextFieldValidation,
  disabled: boolean,
  readOnly: boolean,
): string => {
  if (disabled) {
    const disabledColorMap = {
      none: theme.color.object.subtle,
      error: theme.color.feedback.destructive.alpha.assistive,
      success: theme.color.feedback.positive.alpha.assistive,
    };
    return disabledColorMap[validation];
  }

  if (readOnly) {
    const readOnlyColorMap = {
      none: theme.color.object.alternative,
      error: theme.color.feedback.destructive.alpha.assistive,
      success: theme.color.feedback.positive.alpha.assistive,
    };
    return readOnlyColorMap[validation];
  }

  const helperColorMap = {
    none: theme.color.object.alternative,
    error: theme.color.feedback.destructive.neutral,
    success: theme.color.feedback.positive.neutral,
  };

  return helperColorMap[validation];
};

const getBackgroundColor = (
  theme: Theme,
  style: TextFieldStyle,
  disabled: boolean,
  readOnly: boolean,
): string => {
  if (disabled || readOnly) {
    return 'transparent';
  }
  if (style === 'empty') {
    return 'transparent';
  }
  return theme.color.surface.standard;
};

export const StyledInputWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $style: TextFieldStyle;
  $validation: TextFieldValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $style, $validation, $disabled, $readOnly }) => {
  const BORDER_RADIUS = 6;

  const restBorderColor = getBorderColor(theme, $validation, 'rest', $disabled);
  const hoverBorderColor = getBorderColor(theme, $validation, 'hover', $disabled);
  const activeBorderColor = getBorderColor(theme, $validation, 'active', $disabled);
  const focusBorderColor = getBorderColor(theme, $validation, 'focus', $disabled);
  const backgroundColor = getBackgroundColor(theme, $style, $disabled, $readOnly);

  const restInteractionStyle = InteractionLayer({
    theme,
    state: 'rest',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $disabled,
    isReadonly: $readOnly,
    borderRadius: BORDER_RADIUS,
  });

  const hoverInteractionStyle = InteractionLayer({
    theme,
    state: 'rest',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $disabled,
    isReadonly: $readOnly,
    borderRadius: BORDER_RADIUS,
  });

  const activeInteractionStyle = InteractionLayer({
    theme,
    state: 'rest',
    variant: 'normal',
    density: 'bold',
    fillColor: 'inverse',
    isDisabled: $disabled,
    isReadonly: $readOnly,
    borderRadius: BORDER_RADIUS,
  });

  const focusInteractionStyle = InteractionLayer({
    theme,
    state: 'focus',
    variant: 'normal',
    density: 'bold',
    fillColor: 'inverse',
    isDisabled: $disabled,
    isReadonly: $readOnly,
    borderRadius: BORDER_RADIUS,
  });

  const baseBorderStyle = $style === 'outlined' ? `0 0 0 1px ${restBorderColor}` : 'none';

  const baseStyles: CSSObject = {
    ...restInteractionStyle,
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    padding: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: `${theme.scheme.desktop.radius[BORDER_RADIUS]}px`,
    cursor: $disabled ? 'not-allowed' : 'text',
    transition: `box-shadow ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,

    [theme.breakPoint.tablet]: {
      gap: pxToRem(theme.scheme.tablet.spacing[16]),
      padding: `${pxToRem(theme.scheme.tablet.spacing[8])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      borderRadius: `${theme.scheme.tablet.radius[BORDER_RADIUS]}px`,
    },

    [theme.breakPoint.mobile]: {
      gap: pxToRem(theme.scheme.mobile.spacing[16]),
      padding: `${pxToRem(theme.scheme.mobile.spacing[8])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
      borderRadius: `${theme.scheme.mobile.radius[BORDER_RADIUS]}px`,
    },

    '::after': {
      ...restInteractionStyle['::after'],
      transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
    },
  };

  if ($disabled || $readOnly) {
    return baseStyles;
  }

  const isFocusOutlineHidden = $validation !== 'none';

  return {
    ...baseStyles,
    '&:hover': {
      ...hoverInteractionStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 1px ${hoverBorderColor}` : 'none',
      '::after': {
        ...hoverInteractionStyle['::after'],
        transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
      },
    },
    '&:active': {
      ...activeInteractionStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 1px ${activeBorderColor}` : 'none',
      '::after': {
        ...activeInteractionStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-within': {
      ...focusInteractionStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 2px ${focusBorderColor}` : 'none',
      '::before': isFocusOutlineHidden
        ? {
            opacity: 0,
          }
        : {
            ...focusInteractionStyle['::before'],
          },
      '::after': {
        ...restInteractionStyle['::after'],
      },
    },
  };
});

export const StyledInput = styled('input', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $disabled, $readOnly }) => {
  const textColor = getTextColor(theme, $disabled, $readOnly);

  return {
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    gap: 0,
    flex: '1 0 0',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: textColor,
    ...textStyle(theme, 'desktop', 'body.sm.normal'),
    //Todo: Select와 비교 후 없애도 될수도
    position: 'relative',
    zIndex: 1,

    '&::placeholder': {
      color: theme.color.object.assistive,
    },

    [theme.breakPoint.tablet]: {
      ...textStyle(theme, 'tablet', 'body.sm.normal'),
    },

    [theme.breakPoint.mobile]: {
      ...textStyle(theme, 'mobile', 'body.sm.normal'),
    },
  };
});

export const StyledFieldContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{ $layout: 'vertical' | 'horizontal' }>(({ theme, $layout }) => ({
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
})<{ $layout?: 'vertical' | 'horizontal' }>(({ theme, $layout }) => ({
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
})<{ $disabled: boolean; $readOnly: boolean; $layout?: 'vertical' | 'horizontal' }>(
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
  $validation: TextFieldValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  color: getHelperTextColor(theme, $validation, $disabled, $readOnly),
}));

export const StyledInputRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: pxToRem(theme.scheme.desktop.spacing[8]),
  alignItems: 'center',
  alignSelf: 'stretch',
  width: '100%',

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[8]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[8]),
  },
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
