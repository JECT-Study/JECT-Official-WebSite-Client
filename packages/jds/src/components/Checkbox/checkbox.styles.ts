import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import type { CheckboxAlign, CheckboxSize } from './checkbox.types';
import type { IconSize } from '../Icon/Icon.types';
import { Label } from '../Label/Label';
import type { LabelProps } from '../Label/Label';
import type { LabelSize } from '../Label/Label.style';

import { InteractionLayer, pxToRem } from '@/utils';

const checkboxSizeMap: Record<CheckboxSize, number> = {
  lg: 20,
  md: 18,
  sm: 16,
  xs: 14,
};

const checkboxWrapperHeightMap: Record<CheckboxSize, number> = {
  lg: 24,
  md: 23,
  sm: 20,
  xs: 18,
};

const iconComponentSizeMap: Record<CheckboxSize, IconSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: '2xs',
};

export function GetIconSize(size: CheckboxSize): IconSize {
  return iconComponentSizeMap[size];
}

const borderRadiusMap: Record<CheckboxSize, number> = {
  lg: 4,
  md: 4,
  sm: 4,
  xs: 4,
};

const gapMap: Record<CheckboxSize, (theme: Theme) => CSSObject> = {
  lg: (theme: Theme) => ({
    gap: `${pxToRem(theme.scheme.desktop.spacing[12])}`,
    [theme.breakPoint.tablet]: {
      gap: `${pxToRem(theme.scheme.tablet.spacing[12])}`,
    },
    [theme.breakPoint.mobile]: {
      gap: `${pxToRem(theme.scheme.mobile.spacing[12])}`,
    },
  }),
  md: (theme: Theme) => ({
    gap: `${pxToRem(theme.scheme.desktop.spacing[10])}`,
    [theme.breakPoint.tablet]: {
      gap: `${pxToRem(theme.scheme.tablet.spacing[10])}`,
    },
    [theme.breakPoint.mobile]: {
      gap: `${pxToRem(theme.scheme.mobile.spacing[10])}`,
    },
  }),
  sm: (theme: Theme) => ({
    gap: `${pxToRem(theme.scheme.desktop.spacing[8])}`,
    [theme.breakPoint.tablet]: {
      gap: `${pxToRem(theme.scheme.tablet.spacing[8])}`,
    },
    [theme.breakPoint.mobile]: {
      gap: `${pxToRem(theme.scheme.mobile.spacing[8])}`,
    },
  }),
  xs: (theme: Theme) => ({
    gap: `${pxToRem(theme.scheme.desktop.spacing[8])}`,
    [theme.breakPoint.tablet]: {
      gap: `${pxToRem(theme.scheme.tablet.spacing[8])}`,
    },
    [theme.breakPoint.mobile]: {
      gap: `${pxToRem(theme.scheme.mobile.spacing[8])}`,
    },
  }),
};

const subLabelSizeMap: Record<CheckboxSize, LabelSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: 'xs',
};

export function GetSubLabelSize(size: CheckboxSize): LabelSize {
  return subLabelSizeMap[size];
}

const checkboxStyleParams = {
  valid: {
    normal: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.shallow,
        color: 'transparent' as const,
        border: `1px solid ${theme.color.semantic.stroke.alpha.assistive}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.accent.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: 'none' as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.accent.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: 'none' as const,
      }),
    },
    disabled: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.standard,
        color: 'transparent' as const,
        border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.fill.subtlest,
        color: theme.color.semantic.object.subtle,
        border: 'none' as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.fill.subtlest,
        color: theme.color.semantic.object.subtle,
        border: 'none' as const,
      }),
    },
  },
  invalid: {
    normal: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.shallow,
        color: 'transparent' as const,
        border: `1px solid ${theme.color.semantic.feedback.destructive.neutral}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: 'none' as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: 'none' as const,
      }),
    },
    disabled: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.standard,
        color: 'transparent' as const,
        border: `1px solid ${theme.color.semantic.feedback.destructive.alpha.subtler}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
        color: theme.color.semantic.feedback.destructive.alpha.subtle,
        border: 'none' as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
        color: theme.color.semantic.feedback.destructive.alpha.subtle,
        border: 'none' as const,
      }),
    },
  },
};

function getCheckboxStatus(checked: boolean, isIndeterminate: boolean) {
  if (isIndeterminate) return 'indeterminate';
  if (checked) return 'checked';
  return 'unchecked';
}

function GetCheckboxInteractionStyles(
  theme: Theme,
  size: CheckboxSize,
  disabled: boolean,
): CSSObject {
  const borderRadius = borderRadiusMap[size];

  const interactionParams = {
    restStyle: InteractionLayer({
      theme,
      state: 'rest',
      variant: 'normal',
      density: 'normal',
      fillColor: 'default',
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    hoverStyle: InteractionLayer({
      theme,
      state: 'hover',
      variant: 'normal',
      density: 'normal',
      fillColor: 'default',
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    activeStyle: InteractionLayer({
      theme,
      state: 'active',
      variant: 'normal',
      density: 'normal',
      fillColor: 'default',
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
    focusStyle: InteractionLayer({
      theme,
      state: 'focus',
      variant: 'normal',
      density: 'normal',
      fillColor: 'default',
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius,
    }),
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams;

  if (disabled) {
    return {
      ...restStyle,
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
}

function GetCheckboxBoxStyles(
  theme: Theme,
  size: CheckboxSize,
  checked: boolean,
  isIndeterminate: boolean,
  disabled: boolean,
  isInvalid: boolean,
): CSSObject {
  const boxSize = checkboxSizeMap[size];
  const borderRadius = borderRadiusMap[size];
  const interactionStyles = GetCheckboxInteractionStyles(theme, size, disabled);

  const validity = isInvalid ? 'invalid' : 'valid';
  const availability = disabled ? 'disabled' : 'normal';
  const status = getCheckboxStatus(checked, isIndeterminate);
  const colorStyles = checkboxStyleParams[validity][availability][status](theme);

  return {
    width: pxToRem(boxSize),
    height: pxToRem(boxSize),
    borderRadius: pxToRem(borderRadius),
    ...colorStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    ...interactionStyles,
  };
}

export const GetBasicCheckboxStyles = GetCheckboxBoxStyles;

export const StyledCheckboxBasicContainer = styled('label', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $disabled: boolean;
}>(({ $disabled }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: $disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
}));

export const StyledCheckboxBoxWrapper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $size: CheckboxSize;
}>(({ $size }) => ({
  display: 'flex',
  height: pxToRem(checkboxWrapperHeightMap[$size]),
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0,
}));

export const StyledCheckboxBasicBox = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $size: CheckboxSize;
  $checked: boolean;
  $isIndeterminate: boolean;
  $disabled: boolean;
  $isInvalid: boolean;
}>(({ theme, $size, $checked, $isIndeterminate, $disabled, $isInvalid }) => ({
  ...GetBasicCheckboxStyles(theme, $size, $checked, $isIndeterminate, $disabled, $isInvalid),
}));

export const StyledCheckboxContentContainer = styled('label', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $size: CheckboxSize;
  $align: CheckboxAlign;
  $disabled: boolean;
}>(({ theme, $size, $align, $disabled }) => ({
  display: 'inline-flex',
  flexDirection: $align === 'left' ? 'row' : 'row-reverse',
  alignItems: 'flex-start',
  cursor: $disabled ? 'not-allowed' : 'pointer',
  userSelect: 'none',
  ...gapMap[$size](theme),
}));

export const StyledHiddenInput = styled('input')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
  opacity: 0,
});

export const StyledLabelContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: `${pxToRem(theme.scheme.desktop.spacing[2])}`,
  [theme.breakPoint.tablet]: {
    gap: `${pxToRem(theme.scheme.tablet.spacing[2])}`,
  },
  [theme.breakPoint.mobile]: {
    gap: `${pxToRem(theme.scheme.mobile.spacing[2])}`,
  },
}));

const labelColorParams = {
  valid: {
    normal: (theme: Theme) => ({
      main: theme.color.semantic.object.bold,
      sub: theme.color.semantic.object.alternative,
    }),
    disabled: (theme: Theme) => ({
      main: theme.color.semantic.object.subtle,
      sub: theme.color.semantic.object.subtle,
    }),
  },
  invalid: {
    normal: (theme: Theme) => ({
      main: theme.color.semantic.feedback.destructive.normal,
      sub: theme.color.semantic.object.alternative,
    }),
    disabled: (theme: Theme) => ({
      main: theme.color.semantic.feedback.destructive.alpha.subtle,
      sub: theme.color.semantic.object.subtle,
    }),
  },
};

export const StyledMainLabel = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<
  LabelProps & {
    $disabled: boolean;
    $isInvalid: boolean;
  }
>(({ theme, $disabled, $isInvalid }) => {
  const validity = $isInvalid ? 'invalid' : 'valid';
  const availability = $disabled ? 'disabled' : 'normal';
  const colors = labelColorParams[validity][availability](theme);
  return {
    color: colors.main,
  };
});

export const StyledSubLabel = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith('$'),
})<
  LabelProps & {
    $disabled: boolean;
    $isInvalid: boolean;
  }
>(({ theme, $disabled, $isInvalid }) => {
  const validity = $isInvalid ? 'invalid' : 'valid';
  const availability = $disabled ? 'disabled' : 'normal';
  const colors = labelColorParams[validity][availability](theme);
  return {
    color: colors.sub,
  };
});
