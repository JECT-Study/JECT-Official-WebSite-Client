import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type {
  BlockButtonSize,
  BlockButtonHierarchy,
  BlockButtonStyle,
  FeedbackIntent,
} from 'components';
import type { TextStyle } from 'types';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

import type { IconSize } from '@/components/Icon/Icon.types';

export const iconSizeMap: Record<BlockButtonSize, IconSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

const offsetMap: Record<BlockButtonSize, { vertical: number; horizontal: number }> = {
  lg: { vertical: 0, horizontal: 0 },
  md: { vertical: 0, horizontal: 0 },
  sm: { vertical: 0, horizontal: 0 },
  xs: { vertical: 0, horizontal: 0 },
};

const borderRadiusMap: Record<BlockButtonSize, number> = {
  lg: 6,
  md: 6,
  sm: 4,
  xs: 4,
};

const sizeStyles: Record<BlockButtonSize, (theme: Theme) => CSSObject> = {
  lg: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[10])} ${pxToRem(theme.scheme.desktop.spacing[20])}`,
    borderRadius: `${theme.scheme.desktop.radius[6]}px`,

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[10])} ${pxToRem(theme.scheme.tablet.spacing[20])}`,
      borderRadius: `${theme.scheme.tablet.radius[6]}px`,
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[10])} ${pxToRem(theme.scheme.mobile.spacing[20])}`,
      borderRadius: `${theme.scheme.mobile.radius[6]}px`,
    },
  }),
  md: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[16])}`,
    borderRadius: `${theme.scheme.desktop.radius[6]}px`,

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[8])} ${pxToRem(theme.scheme.tablet.spacing[16])}`,
      borderRadius: `${theme.scheme.tablet.radius[6]}px`,
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[8])} ${pxToRem(theme.scheme.mobile.spacing[16])}`,
      borderRadius: `${theme.scheme.mobile.radius[6]}px`,
    },
  }),
  sm: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[6])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
    borderRadius: `${theme.scheme.desktop.radius[4]}px`,

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[6])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      borderRadius: `${theme.scheme.tablet.radius[4]}px`,
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[6])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
      borderRadius: `${theme.scheme.mobile.radius[4]}px`,
    },
  }),
  xs: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.spacing[8])}`,
    borderRadius: `${theme.scheme.desktop.radius[4]}px`,

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[4])} ${pxToRem(theme.scheme.tablet.spacing[8])}`,
      borderRadius: `${theme.scheme.tablet.radius[4]}px`,
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[4])} ${pxToRem(theme.scheme.mobile.spacing[8])}`,
      borderRadius: `${theme.scheme.mobile.radius[4]}px`,
    },
  }),
};

const solidColorsMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: theme.color.accent.neutral,
    color: theme.color.object.static.inverse.boldest,
  },
  primary: {
    backgroundColor: theme.color.fill.bolder,
    color: theme.color.object.inverse.boldest,
  },
  secondary: {
    backgroundColor: theme.color.fill.neutral,
    color: theme.color.object.static.inverse.boldest,
  },
  tertiary: {
    backgroundColor: theme.color.fill.subtle,
    color: theme.color.object.normal,
  },
});

const solidColorsDisabledMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: theme.color.accent.alpha.subtlest,
    color: theme.color.accent.alpha.subtler,
  },
  primary: {
    backgroundColor: theme.color.fill.subtlest,
    color: theme.color.object.assistive,
  },
  secondary: {
    backgroundColor: theme.color.fill.subtlest,
    color: theme.color.object.assistive,
  },
  tertiary: {
    backgroundColor: theme.color.fill.subtlest,
    color: theme.color.object.assistive,
  },
});

const solidColors = (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) => {
  return disabled ? solidColorsDisabledMap(theme)[hierarchy] : solidColorsMap(theme)[hierarchy];
};

const outlinedColorsMap = (
  theme: Theme,
): Record<
  BlockButtonHierarchy,
  { backgroundColor: string; borderColor: string; color: string }
> => ({
  accent: {
    backgroundColor: 'transparent',
    borderColor: theme.color.accent.alpha.subtlest,
    color: theme.color.accent.normal,
  },
  primary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.assistive,
    color: theme.color.object.boldest,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.assistive,
    color: theme.color.object.bold,
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.assistive,
    color: theme.color.object.neutral,
  },
});

const outlinedColorsDisabledMap = (
  theme: Theme,
): Record<
  BlockButtonHierarchy,
  { backgroundColor: string; borderColor: string; color: string }
> => ({
  accent: {
    backgroundColor: 'transparent',
    borderColor: theme.color.accent.alpha.subtler,
    color: theme.color.accent.alpha.subtler,
  },
  primary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.subtler,
    color: theme.color.object.assistive,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.subtler,
    color: theme.color.object.assistive,
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: theme.color.stroke.alpha.subtler,
    color: theme.color.object.assistive,
  },
});

const outlinedColors = (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) => {
  return disabled
    ? outlinedColorsDisabledMap(theme)[hierarchy]
    : outlinedColorsMap(theme)[hierarchy];
};

const emptyColorsMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: 'transparent',
    color: theme.color.accent.normal,
  },
  primary: {
    backgroundColor: 'transparent',
    color: theme.color.object.boldest,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: theme.color.object.bold,
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: theme.color.object.neutral,
  },
});

const emptyColorsDisabledMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: 'transparent',
    color: theme.color.accent.alpha.subtler,
  },
  primary: {
    backgroundColor: 'transparent',
    color: theme.color.object.assistive,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: theme.color.object.assistive,
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: theme.color.object.assistive,
  },
});

const emptyColors = (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) => {
  return disabled ? emptyColorsDisabledMap(theme)[hierarchy] : emptyColorsMap(theme)[hierarchy];
};

const feedbackColorsMap = (
  theme: Theme,
): Record<FeedbackIntent, { backgroundColor: string; color: string }> => ({
  positive: {
    backgroundColor: theme.color.feedback.positive.neutral,
    color: theme.color.object.static.inverse.boldest,
  },
  destructive: {
    backgroundColor: theme.color.feedback.destructive.neutral,
    color: theme.color.object.static.inverse.boldest,
  },
});

const feedbackColorsDisabledMap = (
  theme: Theme,
): Record<FeedbackIntent, { backgroundColor: string; color: string }> => ({
  positive: {
    backgroundColor: theme.color.feedback.positive.alpha.subtler,
    color: theme.color.feedback.positive.alpha.subtle,
  },
  destructive: {
    backgroundColor: theme.color.feedback.destructive.alpha.subtler,
    color: theme.color.feedback.destructive.alpha.subtle,
  },
});

const feedbackColors = (theme: Theme, intent: FeedbackIntent, disabled: boolean) => {
  return disabled ? feedbackColorsDisabledMap(theme)[intent] : feedbackColorsMap(theme)[intent];
};

const feedbackInteractionStyles = (
  theme: Theme,
  intent: FeedbackIntent,
  size: BlockButtonSize,
  disabled: boolean,
): CSSObject => {
  const offset = offsetMap[size];
  const borderRadius = borderRadiusMap[size];

  const interactionParams = {
    positive: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
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
        borderRadius,
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
        borderRadius,
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
        borderRadius,
      }),
    },
    destructive: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
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
        borderRadius,
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
        borderRadius,
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
        borderRadius,
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
  hierarchy: BlockButtonHierarchy,
  size: BlockButtonSize,
  disabled: boolean,
): CSSObject => {
  const offset = offsetMap[size];
  const borderRadius = borderRadiusMap[size];
  const interactionParams = {
    accent: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
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
        borderRadius,
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
        borderRadius,
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
        borderRadius,
      }),
    },
    primary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
    },
    secondary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
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
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius,
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
  BlockButtonSize,
  { desktop: TextStyle; tablet: TextStyle; mobile: TextStyle }
> = {
  lg: { desktop: 'label.lg.bold', tablet: 'label.lg.bold', mobile: 'label.lg.bold' },
  md: { desktop: 'label.md.bold', tablet: 'label.md.bold', mobile: 'label.md.bold' },
  sm: { desktop: 'label.sm.bold', tablet: 'label.sm.bold', mobile: 'label.sm.bold' },
  xs: { desktop: 'label.xs.bold', tablet: 'label.xs.bold', mobile: 'label.xs.bold' },
};

const GetTypographyStyle = (theme: Theme, size: BlockButtonSize): CSSObject => {
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

const variantColorStylesMap = {
  solid: (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) =>
    solidColors(theme, hierarchy, disabled),
  outlined: (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) => {
    const colors = outlinedColors(theme, hierarchy, disabled);
    return {
      ...colors,
      border: `1px solid ${colors.borderColor}`,
    };
  },
  empty: (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) =>
    emptyColors(theme, hierarchy, disabled),
} as const;

export function GetBlockButtonStyles(
  theme: Theme,
  hierarchy: BlockButtonHierarchy,
  size: BlockButtonSize,
  variant: BlockButtonStyle,
  disabled: boolean,
) {
  const sizeStyle = sizeStyles[size](theme);
  const typoStyle = GetTypographyStyle(theme, size);
  const colorStyle = variantColorStylesMap[variant](theme, hierarchy, disabled);
  const interactionStyle = interactionStyles(theme, hierarchy, size, disabled);

  return {
    ...sizeStyle,
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export function GetFeedbackBlockButtonStyles(
  theme: Theme,
  intent: FeedbackIntent,
  size: BlockButtonSize,
  disabled: boolean,
) {
  const sizeStyle = sizeStyles[size](theme);
  const typoStyle = GetTypographyStyle(theme, size);
  const colorStyle = feedbackColors(theme, intent, disabled);
  const interactionStyle = feedbackInteractionStyles(theme, intent, size, disabled);

  return {
    ...sizeStyle,
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export const StyledBlockButton = styled('button', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $intent?: FeedbackIntent;
  $hierarchy?: BlockButtonHierarchy;
  $size: BlockButtonSize;
  $variant?: BlockButtonStyle;
  $disabled: boolean;
}>(({ theme, $intent, $hierarchy, $size, $variant, $disabled }) => {
  const modeStyles =
    $intent !== undefined
      ? GetFeedbackBlockButtonStyles(theme, $intent, $size, $disabled)
      : GetBlockButtonStyles(theme, $hierarchy!, $size, $variant!, $disabled);

  return {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(theme.scheme.desktop.spacing[4]),
    border: 'none',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    fontFamily: 'inherit',
    ...modeStyles,
  };
});
