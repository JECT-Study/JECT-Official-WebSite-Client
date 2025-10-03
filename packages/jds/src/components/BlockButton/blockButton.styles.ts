import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { TextStyle } from 'types';
import { HexToRgba, pxToRem, textStyle } from 'utils';

import type { BlockButtonSize, BlockButtonHierarchy, BlockButtonStyle } from './blockButton.types';

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
    backgroundColor: HexToRgba(theme.color.fill.neutral, 0.55),
    color: theme.color.object.static.inverse.boldest,
  },
  tertiary: {
    backgroundColor: HexToRgba(theme.color.fill.subtle, 0.23),
    color: theme.color.object.normal,
  },
});

const solidColorsDisabledMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: HexToRgba(theme.color.accent.alpha.subtlest, 0.08),
    color: HexToRgba(theme.color.accent.alpha.subtler, 0.16),
  },
  primary: {
    backgroundColor: HexToRgba(theme.color.fill.subtlest, 0.03),
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  secondary: {
    backgroundColor: HexToRgba(theme.color.fill.subtlest, 0.03),
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  tertiary: {
    backgroundColor: HexToRgba(theme.color.fill.subtlest, 0.03),
    color: HexToRgba(theme.color.object.assistive, 0.34),
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
    borderColor: HexToRgba(theme.color.accent.alpha.subtlest, 0.05),
    color: theme.color.accent.normal,
  },
  primary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.assistive, 0.18),
    color: theme.color.object.boldest,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.assistive, 0.18),
    color: theme.color.object.bold,
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.assistive, 0.18),
    color: HexToRgba(theme.color.object.neutral, 0.55),
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
    borderColor: HexToRgba(theme.color.accent.alpha.subtler, 0.16),
    color: HexToRgba(theme.color.accent.alpha.subtler, 0.16),
  },
  primary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.subtler, 0.08),
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.subtler, 0.08),
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: HexToRgba(theme.color.stroke.alpha.subtler, 0.08),
    color: HexToRgba(theme.color.object.assistive, 0.34),
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
    color: HexToRgba(theme.color.object.neutral, 0.55),
  },
});

const emptyColorsDisabledMap = (
  theme: Theme,
): Record<BlockButtonHierarchy, { backgroundColor: string; color: string }> => ({
  accent: {
    backgroundColor: 'transparent',
    color: HexToRgba(theme.color.accent.alpha.subtler, 0.16),
  },
  primary: {
    backgroundColor: 'transparent',
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  secondary: {
    backgroundColor: 'transparent',
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: HexToRgba(theme.color.object.assistive, 0.34),
  },
});

const emptyColors = (theme: Theme, hierarchy: BlockButtonHierarchy, disabled: boolean) => {
  return disabled ? emptyColorsDisabledMap(theme)[hierarchy] : emptyColorsMap(theme)[hierarchy];
};

const getBaseInteraction = (theme: Theme, backgroundColor: string) => ({
  position: 'relative' as const,
  outline: 'none',
  '::after': {
    content: '""',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor,
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    pointerEvents: 'none' as const,
  },
  '&:hover::after': {
    opacity: 0.08,
  },
  '&:active::after': {
    opacity: 0.12,
  },
  '&:focus-visible': {
    boxShadow: `0 0 0 3px ${theme.color.interaction.focus}`,
  },
});

const interactionStyles = (
  theme: Theme,
  hierarchy: BlockButtonHierarchy,
  variant: BlockButtonStyle,
  disabled: boolean,
) => {
  if (disabled) {
    return {};
  }

  const isAccentWithStyle = hierarchy === 'accent' && variant !== 'empty';
  const backgroundColor = isAccentWithStyle
    ? theme.color.accent.alternative
    : theme.color.interaction.normal;

  return getBaseInteraction(theme, backgroundColor);
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
  const interaction = interactionStyles(theme, hierarchy, variant, disabled);

  return {
    ...sizeStyle,
    ...typoStyle,
    ...colorStyle,
    ...interaction,
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
  transition: 'all 0.2s ease-in-out',
  fontFamily: 'inherit',
  ...GetBlockButtonStyles(theme, $hierarchy, $size, $variant, $disabled),
}));
