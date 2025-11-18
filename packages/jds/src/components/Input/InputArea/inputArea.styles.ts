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
    none: theme.color.semantic.stroke.alpha.assistive,
    error: theme.color.semantic.feedback.destructive.alpha.assistive,
  };

  const readOnlyBorderColorMap = {
    none: theme.color.semantic.stroke.alpha.subtle,
    error: theme.color.semantic.stroke.alpha.subtle,
  };

  const normalBorderColorMap = {
    none: {
      rest: theme.color.semantic.stroke.alpha.assistive,
      hover: theme.color.semantic.stroke.alpha.neutral,
      active: theme.color.semantic.stroke.alpha.assistive,
      focus: theme.color.semantic.accent.neutral,
    },
    error: {
      rest: theme.color.semantic.feedback.destructive.alpha.assistive,
      hover: theme.color.semantic.feedback.destructive.neutral,
      active: theme.color.semantic.feedback.destructive.neutral,
      focus: theme.color.semantic.feedback.destructive.neutral,
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
  const disabledTextColor = theme.color.semantic.object.subtle;

  const readOnlyTextColor = theme.color.semantic.object.assistive;

  const normalTextColor = theme.color.semantic.object.boldest;

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
    outlined: theme.color.semantic.surface.standard,
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
    none: theme.color.semantic.object.subtle,
    error: theme.color.semantic.feedback.destructive.alpha.assistive,
  };

  const readOnlyHelperColorMap = {
    none: theme.color.semantic.object.alternative,
    error: theme.color.semantic.feedback.destructive.alpha.assistive,
  };

  const normalHelperColorMap = {
    none: theme.color.semantic.object.alternative,
    error: theme.color.semantic.feedback.destructive.neutral,
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
  $height?: number | string;
  $minHeight?: number | string;
}>(({ theme, $style, $validation, $disabled, $readOnly, $height }) => {
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

  const heightValue = $height ? (typeof $height === 'number' ? pxToRem($height) : $height) : undefined;

  const baseStyles: CSSObject = {
    ...restStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    height: heightValue || 'auto',
    overflow: heightValue ? 'hidden' : 'visible',
    padding: paddingMap[$style].desktop,
    backgroundColor,
    border: 'none',
    boxShadow: baseBorderStyle,
    borderRadius: `${theme.scheme.desktop.radius[BORDER_RADIUS]}px`,
    cursor: $disabled ? 'not-allowed' : 'text',
    transition: `box-shadow ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
    position: 'relative',

    [theme.breakPoint.tablet]: {
      padding: paddingMap[$style].tablet,
      borderRadius: `${theme.scheme.tablet.radius[BORDER_RADIUS]}px`,
    },

    [theme.breakPoint.mobile]: {
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
  $hasFixedHeight: boolean;
  $minHeight?: number | string;
}>(({ theme, $disabled, $readOnly, $hasFixedHeight, $minHeight }) => {
  const textColor = getTextColor(theme, $disabled, $readOnly);

  const minHeightValue = $minHeight ? (typeof $minHeight === 'number' ? pxToRem($minHeight - 16) : `calc(${$minHeight} - ${pxToRem(16)})`) : pxToRem(96);

  return {
    display: 'block',
    width: '100%',
    height: $hasFixedHeight ? '100%' : undefined,
    minHeight: $hasFixedHeight ? undefined : minHeightValue,
    padding: 0,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: textColor,
    ...textStyle(theme, 'desktop', 'body.sm.normal'),
    position: 'relative',
    zIndex: 1,
    resize: $hasFixedHeight ? 'none' : 'vertical',
    overflow: 'auto',
    boxSizing: 'border-box',
    fieldSizing: 'content',

    '&::placeholder': {
      color: theme.color.semantic.object.assistive,
    },

    [theme.breakPoint.tablet]: {
      ...textStyle(theme, 'tablet', 'body.sm.normal'),
    },

    [theme.breakPoint.mobile]: {
      ...textStyle(theme, 'mobile', 'body.sm.normal'),
    },
  };
});

export const StyledHelperContainer = styled('div', {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<{
  $validation: InputAreaValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: pxToRem(theme.scheme.desktop.spacing[16]),
  color: getHelperTextColor(theme, $validation, $disabled, $readOnly),

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[16]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[16]),
  },
}));

export const StyledHelperText = styled(Label)({
  color: 'inherit',
  flex: '1 0 0',
});

export const StyledCountText = styled(Label)({
  color: 'inherit',
  marginLeft: 'auto',
});

export {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
} from '../shared/field.styles';
