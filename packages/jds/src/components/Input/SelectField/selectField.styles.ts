import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

import type { InputStyle, InputValidation } from '../input.types';

const getBorderColor = (
  theme: Theme,
  validation: InputValidation,
  state: 'rest' | 'hover' | 'active' | 'focus',
  disabled: boolean,
): string => {
  if (disabled) {
    return theme.color.semantic.stroke.alpha.subtle;
  }

  const borderColorMap = {
    none: {
      rest: theme.color.semantic.stroke.alpha.assistive,
      hover: theme.color.semantic.stroke.alpha.normal,
      active: theme.color.semantic.stroke.alpha.assistive,
      focus: theme.color.semantic.accent.neutral,
    },
    error: {
      rest: theme.color.semantic.feedback.destructive.alpha.assistive,
      hover: theme.color.semantic.feedback.destructive.neutral,
      active: theme.color.semantic.feedback.destructive.neutral,
      focus: theme.color.semantic.feedback.destructive.neutral,
    },
    success: {
      rest: theme.color.semantic.feedback.positive.alpha.assistive,
      hover: theme.color.semantic.feedback.positive.neutral,
      active: theme.color.semantic.feedback.positive.neutral,
      focus: theme.color.semantic.feedback.positive.neutral,
    },
  };

  return borderColorMap[validation][state];
};

const getTextColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.semantic.object.assistive;
  }
  if (readOnly) {
    return theme.color.semantic.object.subtle;
  }
  return theme.color.semantic.object.boldest;
};

const getPlaceholderColor = (theme: Theme): string => {
  return theme.color.semantic.object.assistive;
};

const getBackgroundColor = (
  theme: Theme,
  style: InputStyle,
  disabled: boolean,
  readOnly: boolean,
): string => {
  if (disabled || readOnly) {
    return 'transparent';
  }
  if (style === 'empty') {
    return 'transparent';
  }
  return theme.color.semantic.surface.standard;
};

export const StyledSelectWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $style: InputStyle;
  $validation: InputValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $style, $validation, $disabled, $readOnly }) => {
  const BORDER_RADIUS = 6;

  const restBorderColor = getBorderColor(theme, $validation, 'rest', $disabled);
  const hoverBorderColor = getBorderColor(theme, $validation, 'hover', $disabled);
  const activeBorderColor = getBorderColor(theme, $validation, 'active', $disabled);
  const focusBorderColor = getBorderColor(theme, $validation, 'focus', $disabled);
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
        state: 'active',
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
        offsetHorizontal: 8,
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
        offsetHorizontal: 8,
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
        offsetHorizontal: 8,
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
        offsetHorizontal: 8,
        borderRadius: BORDER_RADIUS,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[$style];

  const baseBorderStyle = $style === 'outlined' ? `0 0 0 1px ${restBorderColor}` : 'none';

  const paddingMap = {
    outlined: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[8])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[8])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
    },
    empty: {
      desktop: `${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.spacing[0])}`,
      tablet: `${pxToRem(theme.scheme.tablet.spacing[4])} ${pxToRem(theme.scheme.tablet.spacing[0])}`,
      mobile: `${pxToRem(theme.scheme.mobile.spacing[4])} ${pxToRem(theme.scheme.mobile.spacing[0])}`,
    },
  };

  const baseStyles: CSSObject = {
    ...restStyle,
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    padding: paddingMap[$style].desktop,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: `${theme.scheme.desktop.radius[BORDER_RADIUS]}px`,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    transition: `box-shadow ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,

    [theme.breakPoint.tablet]: {
      gap: pxToRem(theme.scheme.tablet.spacing[16]),
      padding: paddingMap[$style].tablet,
      borderRadius: `${theme.scheme.tablet.radius[BORDER_RADIUS]}px`,
    },

    [theme.breakPoint.mobile]: {
      gap: pxToRem(theme.scheme.mobile.spacing[16]),
      padding: paddingMap[$style].mobile,
      borderRadius: `${theme.scheme.mobile.radius[BORDER_RADIUS]}px`,
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
  const focusIconColor = getIconColor(theme, $disabled, $readOnly, true);

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
      '& > div:last-child': {
        color: focusIconColor,
      },
    },
  };
});

export const StyledSelectValue = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $readOnly: boolean;
  $isPlaceholder: boolean;
}>(({ theme, $disabled, $readOnly, $isPlaceholder }) => {
  const textColor = $isPlaceholder
    ? getPlaceholderColor(theme)
    : getTextColor(theme, $disabled, $readOnly);

  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    padding: 0,
    flex: '1 0 0',
    color: textColor,
    ...textStyle(theme, 'desktop', 'body.sm.normal'),
    userSelect: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakPoint.tablet]: {
      ...textStyle(theme, 'tablet', 'body.sm.normal'),
    },

    [theme.breakPoint.mobile]: {
      ...textStyle(theme, 'mobile', 'body.sm.normal'),
    },
  };
});

const getIconColor = (
  theme: Theme,
  disabled: boolean,
  readOnly: boolean,
  isFocus: boolean,
): string => {
  if (disabled) {
    return theme.color.semantic.object.subtle;
  }
  if (readOnly) {
    return theme.color.semantic.object.subtle;
  }
  if (isFocus) {
    return theme.color.semantic.object.boldest;
  }
  return theme.color.semantic.object.assistive;
};

export const StyledSelectIconWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $disabled, $readOnly }) => {
  const iconColor = getIconColor(theme, $disabled, $readOnly, false);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: iconColor,
  };
});

export {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledHelperText,
  StyledInputColumn,
  StyledInputRow,
} from '../shared/field.styles';
