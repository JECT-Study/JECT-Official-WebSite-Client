import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

import type { TextFieldStyle, TextFieldValidation } from '../TextField/textField.types';

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

const getPlaceholderColor = (theme: Theme): string => {
  return theme.color.object.assistive;
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

export const StyledSelectWrapper = styled('div', {
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
    justifyContent: 'space-between',
    gap: pxToRem(theme.scheme.desktop.spacing[16]),
    padding: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: `${theme.scheme.desktop.radius[BORDER_RADIUS]}px`,
    cursor: $disabled ? 'not-allowed' : 'pointer',
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
    position: 'relative',
    zIndex: 1,
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

export const StyledSelectIconWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
  $isOpen?: boolean;
}>(({ theme, $disabled, $isOpen }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
  transition: `transform ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
  transform: $isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  opacity: $disabled ? 0.4 : 1,
}));

export {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledHelperText,
  StyledInputColumn,
} from '../shared/field.styles';
