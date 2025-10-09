import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { IconButtonSize, IconButtonHierarchy } from 'components';
import type { IconSize } from 'components';
import { InteractionLayer, pxToRem } from 'utils';

const iconSizeMap: Record<IconButtonSize, IconSize> = {
  '3xl': '3xl',
  '2xl': '2xl',
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
  '2xs': '2xs',
};

export const getIconSizeForButton = (size: IconButtonSize): IconSize => {
  return iconSizeMap[size];
};

const sizeStyles: Record<IconButtonSize, CSSObject> = {
  '3xl': {
    width: pxToRem(32),
    height: pxToRem(32),
  },
  '2xl': {
    width: pxToRem(28),
    height: pxToRem(28),
  },
  xl: {
    width: pxToRem(24),
    height: pxToRem(24),
  },
  lg: {
    width: pxToRem(20),
    height: pxToRem(20),
  },
  md: {
    width: pxToRem(18),
    height: pxToRem(18),
  },
  sm: {
    width: pxToRem(16),
    height: pxToRem(16),
  },
  xs: {
    width: pxToRem(14),
    height: pxToRem(14),
  },
  '2xs': {
    width: pxToRem(12),
    height: pxToRem(12),
  },
};

const colorsMap = (theme: Theme): Record<IconButtonHierarchy, { color: string }> => ({
  accent: {
    color: theme.color.accent.normal,
  },
  primary: {
    color: theme.color.object.boldest,
  },
  secondary: {
    color: theme.color.object.neutral,
  },
  tertiary: {
    color: theme.color.object.alternative,
  },
});

const colorsDisabledMap = (theme: Theme): Record<IconButtonHierarchy, { color: string }> => ({
  accent: {
    color: theme.color.accent.alpha.subtle,
  },
  primary: {
    color: theme.color.object.subtle,
  },
  secondary: {
    color: theme.color.object.subtle,
  },
  tertiary: {
    color: theme.color.object.subtle,
  },
});

const colors = (theme: Theme, hierarchy: IconButtonHierarchy, disabled: boolean) => {
  return disabled ? colorsDisabledMap(theme)[hierarchy] : colorsMap(theme)[hierarchy];
};

const interactionStyles = (
  theme: Theme,
  hierarchy: IconButtonHierarchy,
  disabled: boolean,
): CSSObject => {
  const interactionParams = {
    accent: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'accent',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'accent',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'accent',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'accent',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
    },
    primary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
    },
    secondary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
    },
    tertiary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: false,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[hierarchy];

  if (disabled) {
    return {
      ...restStyle,
      '::after': {
        ...restStyle['::after'],
        transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
      },
    };
  }

  return {
    ...restStyle,
    '::after': {
      ...restStyle['::after'],
      transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
    },
    '&:hover': {
      ...hoverStyle,
      '::after': {
        ...hoverStyle['::after'],
        transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
      },
    },
    '&:active': {
      ...activeStyle,
      '::after': {
        ...activeStyle['::after'],
        transition: 'none',
      },
    },
    '&:focus-visible': {
      ...focusStyle,
      '::after': {
        ...focusStyle['::after'],
        transition: 'none',
      },
    },
  };
};

export function GetIconButtonStyles(
  theme: Theme,
  hierarchy: IconButtonHierarchy,
  size: IconButtonSize,
  disabled: boolean,
) {
  const sizeStyle = sizeStyles[size];
  const colorStyle = colors(theme, hierarchy, disabled);
  const interactionStyle = interactionStyles(theme, hierarchy, disabled);

  return {
    ...sizeStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export const StyledIconButton = styled.button<{
  $hierarchy: IconButtonHierarchy;
  $size: IconButtonSize;
  $disabled: boolean;
}>(({ theme, $hierarchy, $size, $disabled }) => ({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  borderRadius: 0,
  background: 'transparent',
  cursor: $disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  flexShrink: 0,
  ...GetIconButtonStyles(theme, $hierarchy, $size, $disabled),
  '& svg': {
    color: 'inherit',
  },
}));
