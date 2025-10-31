import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

import type { InputAreaStyle, InputAreaValidation } from './inputArea.types';
import { Label } from '../../Label';

const getBorderColor = (
  theme: Theme,
  validation: InputAreaValidation,
  state: 'rest' | 'hover' | 'active' | 'focus',
  disabled: boolean,
  readOnly: boolean,
): string => {
  const disabledBorderColorMap = {
    none: theme.color.stroke.alpha.assistive,
    error: theme.color.feedback.destructive.alpha.assistive,
  };

  const readOnlyBorderColorMap = {
    none: theme.color.stroke.alpha.subtle,
    error: theme.color.stroke.alpha.subtle,
  };

  const normalBorderColorMap = {
    none: {
      rest: theme.color.stroke.alpha.assistive,
      hover: theme.color.stroke.alpha.neutral,
      active: theme.color.stroke.alpha.assistive,
      focus: theme.color.accent.neutral,
    },
    error: {
      rest: theme.color.feedback.destructive.alpha.assistive,
      hover: theme.color.feedback.destructive.neutral,
      active: theme.color.feedback.destructive.neutral,
      focus: theme.color.feedback.destructive.neutral,
    },
  };

  if (disabled) {
    return disabledBorderColorMap[validation];
  }

  if (readOnly) {
    return readOnlyBorderColorMap[validation];
  }

  return normalBorderColorMap[validation][state];
};

const getTextColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  const disabledTextColor = theme.color.object.subtle;

  const readOnlyTextColor = theme.color.object.assistive;

  const normalTextColor = theme.color.object.boldest;

  if (disabled) {
    return disabledTextColor;
  }

  if (readOnly) {
    return readOnlyTextColor;
  }

  return normalTextColor;
};

const getBackgroundColor = (
  theme: Theme,
  style: InputAreaStyle,
  disabled: boolean,
  readOnly: boolean,
): string => {
  const disabledBackgroundColorMap = {
    outlined: 'transparent',
    empty: 'transparent',
  } as const;

  const readOnlyBackgroundColorMap = {
    outlined: 'transparent',
    empty: 'transparent',
  } as const;

  const normalBackgroundColorMap = {
    outlined: theme.color.surface.standard,
    empty: 'transparent',
  } as const;

  if (disabled) {
    return disabledBackgroundColorMap[style];
  }

  if (readOnly) {
    return readOnlyBackgroundColorMap[style];
  }

  return normalBackgroundColorMap[style];
};

const getHelperTextColor = (
  theme: Theme,
  validation: InputAreaValidation,
  disabled: boolean,
  readOnly: boolean,
): string => {
  const disabledHelperColorMap = {
    none: theme.color.object.subtle,
    error: theme.color.feedback.destructive.alpha.assistive,
  };

  const readOnlyHelperColorMap = {
    none: theme.color.object.alternative,
    error: theme.color.feedback.destructive.alpha.assistive,
  };

  const normalHelperColorMap = {
    none: theme.color.object.alternative,
    error: theme.color.feedback.destructive.neutral,
  };

  if (disabled) {
    return disabledHelperColorMap[validation];
  }

  if (readOnly) {
    return readOnlyHelperColorMap[validation];
  }

  return normalHelperColorMap[validation];
};

export const StyledTextAreaWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $style: InputAreaStyle;
  $validation: InputAreaValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $style, $validation, $disabled, $readOnly }) => {
  const BORDER_RADIUS = 6;

  const restBorderColor = getBorderColor(theme, $validation, 'rest', $disabled, $readOnly);
  const hoverBorderColor = getBorderColor(theme, $validation, 'hover', $disabled, $readOnly);
  const activeBorderColor = getBorderColor(theme, $validation, 'active', $disabled, $readOnly);
  const focusBorderColor = getBorderColor(theme, $validation, 'focus', $disabled, $readOnly);
  const backgroundColor = getBackgroundColor(theme, $style, $disabled, $readOnly);

  const interactionParams = {
    outlined: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: BORDER_RADIUS,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: BORDER_RADIUS,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: BORDER_RADIUS,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: BORDER_RADIUS,
      }),
    },
    empty: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: BORDER_RADIUS,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: BORDER_RADIUS,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: BORDER_RADIUS,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: BORDER_RADIUS,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[$style];

  const baseBorderStyle = $style === 'outlined' ? `0 0 0 1px ${restBorderColor}` : 'none';

  const paddingMap = {
    outlined: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[8])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[8])} ${pxToRem(theme.scheme.tablet.spacing[8])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[8])} ${pxToRem(theme.scheme.mobile.spacing[8])}`,
    },
    empty: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[0])} ${pxToRem(theme.scheme.desktop.spacing[0])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[0])} ${pxToRem(theme.scheme.tablet.spacing[0])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[0])} ${pxToRem(theme.scheme.mobile.spacing[0])}`,
    },
  };

  const baseStyles: CSSObject = {
    ...restStyle,
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: pxToRem(theme.scheme.desktop.spacing[0]),
    padding: paddingMap[$style].desktop,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: `${theme.scheme.desktop.radius[BORDER_RADIUS]}px`,
    cursor: $disabled ? 'not-allowed' : 'text',
    transition: `box-shadow ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
    minHeight: pxToRem(112),

    [theme.breakPoint.tablet]: {
      gap: pxToRem(theme.scheme.tablet.spacing[0]),
      padding: paddingMap[$style].tablet,
      borderRadius: `${theme.scheme.tablet.radius[BORDER_RADIUS]}px`,
      minHeight: pxToRem(112),
    },

    [theme.breakPoint.mobile]: {
      gap: pxToRem(theme.scheme.mobile.spacing[0]),
      padding: paddingMap[$style].mobile,
      borderRadius: `${theme.scheme.mobile.radius[BORDER_RADIUS]}px`,
      minHeight: pxToRem(112),
    },

    '::after': {
      ...restStyle['::after'],
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
      ...hoverStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 1px ${hoverBorderColor}` : 'none',
      '::after': {
        ...hoverStyle['::after'],
        transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
      },
    },
    '&:active': {
      ...activeStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 1px ${activeBorderColor}` : 'none',
      '::after': {
        ...activeStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-within': {
      ...focusStyle,
      boxShadow: $style === 'outlined' ? `0 0 0 2px ${focusBorderColor}` : 'none',
      '::before': isFocusOutlineHidden
        ? {
            opacity: 0,
          }
        : {
            ...focusStyle['::before'],
          },
      '::after': {
        ...restStyle['::after'],
      },
    },
  };
});

export const StyledTextArea = styled('textarea', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $disabled, $readOnly }) => {
  const textColor = getTextColor(theme, $disabled, $readOnly);

  return {
    display: 'flex',
    padding: 0,
    alignItems: 'flex-start',
    gap: 0,
    flex: '1 0 0',
    alignSelf: 'stretch',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: textColor,
    ...textStyle(theme, 'desktop', 'body.sm.normal'),
    position: 'relative',
    zIndex: 1,
    resize: 'vertical',

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

export const StyledHelperContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: pxToRem(theme.scheme.desktop.spacing[16]),

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[16]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[16]),
  },
}));

export const StyledHelperText = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $validation: InputAreaValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  color: getHelperTextColor(theme, $validation, $disabled, $readOnly),
  flex: '1 0 0',
}));

export const StyledCountText = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $disabled, $readOnly }) => {
  const disabledCountColor = theme.color.object.subtle;

  const readOnlyCountColor = theme.color.object.alternative;

  const normalCountColor = theme.color.object.alternative;

  if ($disabled) {
    return {
      color: disabledCountColor,
      marginLeft: 'auto',
    };
  }

  if ($readOnly) {
    return {
      color: readOnlyCountColor,
      marginLeft: 'auto',
    };
  }

  return {
    color: normalCountColor,
    marginLeft: 'auto',
  };
});

export {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
} from '../shared/field.styles';
