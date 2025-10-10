import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { BlockButtonSize, BlockButtonHierarchy, BlockButtonStyle } from 'components';
import type { IconSize } from 'components/Icon/Icon.types';
import type { TextStyle } from 'types';
import { InteractionLayer, pxToRem, textStyle } from 'utils';

export const iconSizeMap: Record<BlockButtonSize, IconSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

const sizeStyles: Record<BlockButtonSize, (theme: Theme) => CSSObject> = {
  lg: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[10])} ${pxToRem(theme.scheme.desktop.spacing[20])}`,
    borderRadius: pxToRem(theme.scheme.desktop.radius[6]),

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[10])} ${pxToRem(theme.scheme.tablet.spacing[20])}`,
      borderRadius: pxToRem(theme.scheme.tablet.radius[6]),
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[10])} ${pxToRem(theme.scheme.mobile.spacing[20])}`,
      borderRadius: pxToRem(theme.scheme.mobile.radius[6]),
    },
  }),
  md: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[8])} ${pxToRem(theme.scheme.desktop.spacing[16])}`,
    borderRadius: pxToRem(theme.scheme.desktop.radius[6]),

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[8])} ${pxToRem(theme.scheme.tablet.spacing[16])}`,
      borderRadius: pxToRem(theme.scheme.tablet.radius[6]),
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[8])} ${pxToRem(theme.scheme.mobile.spacing[16])}`,
      borderRadius: pxToRem(theme.scheme.mobile.radius[6]),
    },
  }),
  sm: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[6])} ${pxToRem(theme.scheme.desktop.spacing[12])}`,
    borderRadius: pxToRem(theme.scheme.desktop.radius[4]),

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[6])} ${pxToRem(theme.scheme.tablet.spacing[12])}`,
      borderRadius: pxToRem(theme.scheme.tablet.radius[4]),
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[6])} ${pxToRem(theme.scheme.mobile.spacing[12])}`,
      borderRadius: pxToRem(theme.scheme.mobile.radius[4]),
    },
  }),
  xs: (theme: Theme) => ({
    padding: `${pxToRem(theme.scheme.desktop.spacing[4])} ${pxToRem(theme.scheme.desktop.spacing[8])}`,
    borderRadius: pxToRem(theme.scheme.desktop.radius[4]),

    [theme.breakPoint.tablet]: {
      padding: `${pxToRem(theme.scheme.tablet.spacing[4])} ${pxToRem(theme.scheme.tablet.spacing[8])}`,
      borderRadius: pxToRem(theme.scheme.tablet.radius[4]),
    },

    [theme.breakPoint.mobile]: {
      padding: `${pxToRem(theme.scheme.mobile.spacing[4])} ${pxToRem(theme.scheme.mobile.spacing[8])}`,
      borderRadius: pxToRem(theme.scheme.mobile.radius[4]),
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

const interactionStyles = (
  theme: Theme,
  hierarchy: BlockButtonHierarchy,
  disabled: boolean,
): CSSObject => {
  const interactionParams = {
    accent: {
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
    primary: {
      restStyle: InteractionLayer({
        theme,
        state: 'rest',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'bold',
        fillColor: 'inverse',
        isDisabled: disabled,
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
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: 'hover',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
        fillColor: 'inverse',
        isDisabled: disabled,
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
        isDisabled: disabled,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: 'active',
        variant: 'normal',
        density: 'normal',
        fillColor: 'default',
        isDisabled: disabled,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: 'focus',
        variant: 'normal',
        density: 'normal',
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
      border: `${pxToRem(1)} solid ${colors.borderColor}`,
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
  const interactionStyle = interactionStyles(theme, hierarchy, disabled);

  return {
    ...sizeStyle,
    ...typoStyle,
    ...colorStyle,
    ...interactionStyle,
  };
}

export const StyledBlockButton = styled.button<{
  $hierarchy: BlockButtonHierarchy;
  $size: BlockButtonSize;
  $variant: BlockButtonStyle;
  $disabled: boolean;
}>(({ theme, $hierarchy, $size, $variant, $disabled }) => ({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  cursor: $disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  fontFamily: 'inherit',
  ...GetBlockButtonStyles(theme, $hierarchy, $size, $variant, $disabled),
}));
