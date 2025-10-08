import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { LabelButtonSize, LabelButtonHierarchy } from 'components';
import type { TextStyle } from 'types';
import { InteractionLayer, textStyle } from 'utils';

const hierarchyColorsMap = (theme: Theme): Record<LabelButtonHierarchy, { color: string }> => ({
  accent: {
    color: theme.color.accent.normal,
  },
  primary: {
    color: theme.color.object.bolder,
  },
  secondary: {
    color: theme.color.object.neutral,
  },
  tertiary: {
    color: theme.color.object.alternative,
  },
});

const hierarchyColorsDisabledMap = (
  theme: Theme,
): Record<LabelButtonHierarchy, { color: string }> => ({
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

const hierarchyColors = (theme: Theme, hierarchy: LabelButtonHierarchy, disabled: boolean) => {
  return disabled
    ? hierarchyColorsDisabledMap(theme)[hierarchy]
    : hierarchyColorsMap(theme)[hierarchy];
};

const interactionStyles = (
  theme: Theme,
  hierarchy: LabelButtonHierarchy,
  disabled: boolean,
): CSSObject => {
  const interactionParams = {
    accent: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
    },
    primary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
    },
    secondary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
    },
    tertiary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[hierarchy];

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

const typographyStyleMap: Record<
  LabelButtonSize,
  { desktop: TextStyle; tablet: TextStyle; mobile: TextStyle }
> = {
  lg: { desktop: 'label.lg.bold', tablet: 'label.lg.bold', mobile: 'label.lg.bold' },
  md: { desktop: 'label.md.bold', tablet: 'label.md.bold', mobile: 'label.md.bold' },
  sm: { desktop: 'label.sm.bold', tablet: 'label.sm.bold', mobile: 'label.sm.bold' },
  xs: { desktop: 'label.xs.bold', tablet: 'label.xs.bold', mobile: 'label.xs.bold' },
};

const GetTypographyStyle = (theme: Theme, size: LabelButtonSize): CSSObject => {
  const styles = typographyStyleMap[size];

  return {
    ...textStyle(theme, 'desktop', styles.desktop),
    [theme.breakPoint.tablet]: {
      ...textStyle(theme, 'tablet', styles.tablet),
    },
    [theme.breakPoint.mobile]: {
      ...textStyle(theme, 'mobile', styles.mobile),
    },
  };
};

export function GetLabelButtonStyles(
  theme: Theme,
  hierarchy: LabelButtonHierarchy,
  size: LabelButtonSize,
  disabled: boolean,
) {
  const typoStyle = GetTypographyStyle(theme, size);
  const colorStyle = hierarchyColors(theme, hierarchy, disabled);
  const interactionStyle = interactionStyles(theme, hierarchy, disabled);

  return {
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export const StyledLabelButton = styled.button<{
  $hierarchy: LabelButtonHierarchy;
  $size: LabelButtonSize;
  $disabled: boolean;
}>(({ theme, $hierarchy, $size, $disabled }) => ({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: $disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  fontFamily: 'inherit',
  ...GetLabelButtonStyles(theme, $hierarchy, $size, $disabled),
}));
