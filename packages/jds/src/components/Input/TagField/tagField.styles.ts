import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer } from 'utils';

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

export const StyledTagInputWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $style: InputStyle;
  $validation: InputValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $style, $validation, $disabled, $readOnly }) => {
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
        borderRadius: 6,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'assistive',
        fillColor: 'default',
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
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
        borderRadius: 6,
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
        borderRadius: 6,
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
        borderRadius: 6,
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
        borderRadius: 6,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[$style];

  const baseBorderStyle = $style === 'outlined' ? `0 0 0 1px ${restBorderColor}` : 'none';

  const padding =
    $style === 'outlined'
      ? `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[12]}`
      : `${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.spacing[0]}`;

  const baseStyles: CSSObject = {
    ...restStyle,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    alignSelf: 'stretch',
    gap: theme.scheme.semantic.spacing[12],
    padding,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: theme.scheme.semantic.radius[6],
    cursor: $disabled ? 'not-allowed' : 'text',
    transition: `box-shadow ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,

    '::after': {
      ...restStyle['::after'],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
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
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
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

export const StyledTagContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $hasTag: boolean;
}>(({ theme, $hasTag }) => ({
  display: $hasTag ? 'flex' : 'none',
  padding: `${theme.scheme.semantic.spacing[2]} ${theme.scheme.semantic.spacing[0]}`,
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  alignSelf: 'stretch',
  gap: theme.scheme.semantic.spacing[8],
  flexWrap: 'wrap',
  zIndex: 1,
}));

export const StyledTagWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $isSelected: boolean;
  $isInteractive: boolean;
}>(({ theme, $isSelected, $isInteractive }) => ({
  display: 'inline-flex',
  cursor: $isInteractive ? 'pointer' : 'default',
  transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
  opacity: $isSelected ? 0.6 : 1,
}));

export const StyledTagInput = styled('input', {
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
    ...theme.textStyle['semantic-textStyle-body-sm-normal'],
    position: 'relative',
    zIndex: 1,

    '&::placeholder': {
      color: theme.color.semantic.object.assistive,
    },
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
