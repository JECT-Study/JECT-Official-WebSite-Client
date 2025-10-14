import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { LabelButtonSize, LabelButtonHierarchy, LabelButtonIntent } from 'components';
import type { TextStyle } from 'types';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

import type { IconSize } from '@/components/Icon/Icon.types';

export const iconSizeMap: Record<LabelButtonSize, IconSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

const offsetMap: Record<
  LabelButtonSize,
  { vertical: number; horizontal: number; borderRadius: number }
> = {
  lg: { vertical: 4, horizontal: 8, borderRadius: 6 },
  md: { vertical: 3, horizontal: 6, borderRadius: 6 },
  sm: { vertical: 2, horizontal: 4, borderRadius: 4 },
  xs: { vertical: 1, horizontal: 3, borderRadius: 4 },
};

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

const feedbackColorsMap = (theme: Theme): Record<LabelButtonIntent, { color: string }> => ({
  positive: {
    color: theme.color.feedback.positive.normal,
  },
  destructive: {
    color: theme.color.feedback.destructive.normal,
  },
});

const feedbackColorsDisabledMap = (theme: Theme): Record<LabelButtonIntent, { color: string }> => ({
  positive: {
    color: theme.color.feedback.positive.alpha.subtle,
  },
  destructive: {
    color: theme.color.feedback.destructive.alpha.subtle,
  },
});

const feedbackColors = (theme: Theme, intent: LabelButtonIntent, disabled: boolean) => {
  return disabled ? feedbackColorsDisabledMap(theme)[intent] : feedbackColorsMap(theme)[intent];
};

const feedbackInteractionStyles = (
  theme: Theme,
  intent: LabelButtonIntent,
  size: LabelButtonSize,
  disabled: boolean,
): CSSObject => {
  const offset = offsetMap[size];

  const interactionParams = {
    positive: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'positive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'positive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'positive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'positive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
    destructive: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'destructive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'destructive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'destructive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'destructive',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[intent];

  if (disabled) {
    return {
      position: 'relative',
      outline: 'none',
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

const interactionStyles = (
  theme: Theme,
  hierarchy: LabelButtonHierarchy,
  size: LabelButtonSize,
  disabled: boolean,
): CSSObject => {
  const offset = offsetMap[size];
  const interactionParams = {
    accent: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'accent',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
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
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
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
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
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
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[hierarchy];

  if (disabled) {
    return {
      position: 'relative',
      outline: 'none',
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
  const interactionStyle = interactionStyles(theme, hierarchy, size, disabled);

  return {
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export function GetFeedbackLabelButtonStyles(
  theme: Theme,
  intent: LabelButtonIntent,
  size: LabelButtonSize,
  disabled: boolean,
) {
  const typoStyle = GetTypographyStyle(theme, size);
  const colorStyle = feedbackColors(theme, intent, disabled);
  const interactionStyle = feedbackInteractionStyles(theme, intent, size, disabled);

  return {
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export const StyledLabelButton = styled('button', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $intent?: LabelButtonIntent;
  $hierarchy?: LabelButtonHierarchy;
  $size: LabelButtonSize;
  $disabled: boolean;
}>(({ theme, $intent, $hierarchy, $size, $disabled }) => {
  const modeStyles =
    $intent !== undefined
      ? GetFeedbackLabelButtonStyles(theme, $intent, $size, $disabled)
      : GetLabelButtonStyles(theme, $hierarchy!, $size, $disabled);

  return {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: pxToRem(theme.scheme.desktop.spacing[4]),
    border: 'none',
    background: 'transparent',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    fontFamily: 'inherit',
    ...modeStyles,
  };
});
