import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";

import type { CheckboxAlign, CheckboxSize, CheckboxVariant } from "./checkbox.types";
import type { IconSize } from "../Icon/Icon.types";
import type { LabelOwnProps } from "../Label";
import { Label } from "../Label/Label";
import type { LabelSize } from "../Label/Label.style";

import type { Variant } from "@/types";
import { InteractionLayer, pxToRem } from "@/utils";

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
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

export function GetIconSize(size: CheckboxSize): IconSize {
  return iconComponentSizeMap[size];
}

const gapMap: Record<CheckboxSize, (theme: Theme) => CSSObject> = {
  lg: (theme: Theme) => ({
    gap: theme.scheme.semantic.spacing[12],
  }),
  md: (theme: Theme) => ({
    gap: theme.scheme.semantic.spacing[10],
  }),
  sm: (theme: Theme) => ({
    gap: theme.scheme.semantic.spacing[8],
  }),
  xs: (theme: Theme) => ({
    gap: theme.scheme.semantic.spacing[8],
  }),
};

const subLabelSizeMap: Record<CheckboxSize, LabelSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "xs",
};

export function GetSubLabelSize(size: CheckboxSize): LabelSize {
  return subLabelSizeMap[size];
}

const checkboxStyleParams = {
  valid: {
    normal: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.shallow,
        color: "transparent" as const,
        border: `1px solid ${theme.color.semantic.stroke.alpha.assistive}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.accent.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: "none" as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.accent.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: "none" as const,
      }),
    },
    disabled: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.standard,
        color: "transparent" as const,
        border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.fill.subtlest,
        color: theme.color.semantic.object.subtle,
        border: "none" as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.fill.subtlest,
        color: theme.color.semantic.object.subtle,
        border: "none" as const,
      }),
    },
  },
  invalid: {
    normal: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.shallow,
        color: "transparent" as const,
        border: `1px solid ${theme.color.semantic.feedback.destructive.neutral}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: "none" as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.neutral,
        color: theme.color.semantic.object.static.inverse.boldest,
        border: "none" as const,
      }),
    },
    disabled: {
      unchecked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.surface.standard,
        color: "transparent" as const,
        border: `1px solid ${theme.color.semantic.feedback.destructive.alpha.subtler}`,
      }),
      checked: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
        color: theme.color.semantic.feedback.destructive.alpha.subtle,
        border: "none" as const,
      }),
      indeterminate: (theme: Theme) => ({
        backgroundColor: theme.color.semantic.feedback.destructive.alpha.subtlest,
        color: theme.color.semantic.feedback.destructive.alpha.subtle,
        border: "none" as const,
      }),
    },
  },
};

function getCheckboxStatus(checked: boolean, isIndeterminate: boolean) {
  if (isIndeterminate) return "indeterminate";
  if (checked) return "checked";
  return "unchecked";
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

  const validity = isInvalid ? "invalid" : "valid";
  const availability = disabled ? "disabled" : "normal";
  const status = getCheckboxStatus(checked, isIndeterminate);
  const colorStyles = checkboxStyleParams[validity][availability][status](theme);

  return {
    width: pxToRem(boxSize),
    height: pxToRem(boxSize),
    borderRadius: theme.scheme.semantic.radius[4],
    ...colorStyles,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
  };
}

function GetBasicContainerInteractionStyles(theme: Theme, disabled: boolean): CSSObject {
  const interactionParams = {
    restStyle: InteractionLayer({
      theme,
      state: "rest",
      variant: "normal",
      density: "normal",
      fillColor: "default",
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius: 4,
    }),
    hoverStyle: InteractionLayer({
      theme,
      state: "hover",
      variant: "normal",
      density: "normal",
      fillColor: "default",
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius: 4,
    }),
    activeStyle: InteractionLayer({
      theme,
      state: "active",
      variant: "normal",
      density: "normal",
      fillColor: "default",
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius: 4,
    }),
    focusStyle: InteractionLayer({
      theme,
      state: "focus",
      variant: "normal",
      density: "normal",
      fillColor: "default",
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius: 4,
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
    "::after": {
      ...restStyle["::after"],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
    "&:hover": {
      ...hoverStyle,
      "::after": {
        ...hoverStyle["::after"],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    "&:active": {
      ...activeStyle,
      "::after": {
        ...activeStyle["::after"],
        transition: "none",
      },
    },
    "&:has(:focus-visible)": {
      ...focusStyle,
      "::after": {
        ...focusStyle["::after"],
        transition: "none",
      },
    },
  };
}

export const StyledCheckboxBasicContainer = styled("label", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $disabled: boolean;
}>(({ theme, $disabled }) => {
  const interactionStyles = GetBasicContainerInteractionStyles(theme, $disabled);

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    cursor: $disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    ...interactionStyles,
  };
});

export const StyledCheckboxBoxWrapper = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $size: CheckboxSize;
}>(({ $size }) => ({
  display: "flex",
  height: pxToRem(checkboxWrapperHeightMap[$size]),
  padding: 0,
  justifyContent: "center",
  alignItems: "center",
  gap: 0,
}));

export const StyledCheckboxBasicBox = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $size: CheckboxSize;
  $checked: boolean;
  $isIndeterminate: boolean;
  $disabled: boolean;
  $isInvalid: boolean;
}>(({ theme, $size, $checked, $isIndeterminate, $disabled, $isInvalid }) => ({
  ...GetCheckboxBoxStyles(theme, $size, $checked, $isIndeterminate, $disabled, $isInvalid),
}));

//Note: Horizontal의 경우 좌우 수치가 다르지만 InteractionLayer 구조상 단일 수치로 표현(작은 쪽에 맞춤)
const emptyContentOffsetMap: Record<CheckboxSize, { vertical: number; horizontal: number }> = {
  lg: { vertical: 4, horizontal: 6 },
  md: { vertical: 4, horizontal: 6 },
  sm: { vertical: 3, horizontal: 5 },
  xs: { vertical: 3, horizontal: 4 },
};

interface ContentContainerInteractionParams {
  theme: Theme;
  variant: CheckboxVariant;
  size: CheckboxSize;
  checked: boolean;
  isIndeterminate: boolean;
  disabled: boolean;
  isInvalid: boolean;
}

const contentContainerInteractionStyles = ({
  theme,
  variant,
  size,
  checked,
  isIndeterminate,
  disabled,
  isInvalid,
}: ContentContainerInteractionParams): CSSObject => {
  const getInteractionVariant = (): Variant => {
    if (isInvalid) return "destructive";
    if (checked || isIndeterminate) return "accent";
    return "normal";
  };

  const interactionVariant = getInteractionVariant();

  const baseContentInteractionParams = {
    theme,
    variant: interactionVariant,
    density: "assistive" as const,
    fillColor: "default" as const,
    isReadonly: disabled,
    isDisabled: false,
  };

  const borderRadius = size === "lg" || size === "md" ? 6 : 4;

  const emptyVariantOffset = {
    offsetVertical: emptyContentOffsetMap[size].vertical,
    offsetHorizontal: emptyContentOffsetMap[size].horizontal,
    borderRadius,
  };

  const outlinedVariantOffset = {
    offsetVertical: 0,
    offsetHorizontal: 0,
    borderRadius,
  };

  const createInteractionStyles = (offset: typeof emptyVariantOffset) => ({
    restStyle: InteractionLayer({ ...baseContentInteractionParams, state: "rest", ...offset }),
    hoverStyle: InteractionLayer({ ...baseContentInteractionParams, state: "hover", ...offset }),
    activeStyle: InteractionLayer({ ...baseContentInteractionParams, state: "active", ...offset }),
    focusStyle: InteractionLayer({ ...baseContentInteractionParams, state: "focus", ...offset }),
  });

  const interactionParams = {
    empty: createInteractionStyles(emptyVariantOffset),
    outlined: createInteractionStyles(outlinedVariantOffset),
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[variant];

  if (disabled) {
    return {
      ...restStyle,
    };
  }

  return {
    ...restStyle,
    "::after": {
      ...restStyle["::after"],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
    "&:hover": {
      ...hoverStyle,
      "::after": {
        ...hoverStyle["::after"],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    "&:active": {
      ...activeStyle,
      "::after": {
        ...activeStyle["::after"],
        transition: "none",
      },
    },
    "&:has(:focus-visible)": {
      ...focusStyle,
      "::after": {
        ...focusStyle["::after"],
        transition: "none",
      },
    },
  };
};

const emptyVariantStyle = { border: "none" as const };

const outlinedVariantStyles = {
  valid: {
    normal: (theme: Theme, size: CheckboxSize) => {
      const borderRadius =
        size === "lg" || size === "md"
          ? theme.scheme.semantic.radius[6]
          : theme.scheme.semantic.radius[4];
      const padding =
        size === "lg"
          ? theme.scheme.semantic.spacing[12]
          : size === "md"
            ? theme.scheme.semantic.spacing[10]
            : size === "sm"
              ? theme.scheme.semantic.spacing[8]
              : theme.scheme.semantic.spacing[6];

      return {
        border: `1px solid ${theme.color.semantic.stroke.alpha.assistive}`,
        borderRadius,
        padding,
      };
    },
    disabled: (theme: Theme, size: CheckboxSize) => {
      const borderRadius =
        size === "lg" || size === "md"
          ? theme.scheme.semantic.radius[6]
          : theme.scheme.semantic.radius[4];
      const padding =
        size === "lg"
          ? theme.scheme.semantic.spacing[12]
          : size === "md"
            ? theme.scheme.semantic.spacing[10]
            : size === "sm"
              ? theme.scheme.semantic.spacing[8]
              : theme.scheme.semantic.spacing[6];

      return {
        border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
        borderRadius,
        padding,
      };
    },
  },
  invalid: {
    normal: (theme: Theme, size: CheckboxSize) => {
      const borderRadius =
        size === "lg" || size === "md"
          ? theme.scheme.semantic.radius[6]
          : theme.scheme.semantic.radius[4];
      const padding =
        size === "lg"
          ? theme.scheme.semantic.spacing[12]
          : size === "md"
            ? theme.scheme.semantic.spacing[10]
            : size === "sm"
              ? theme.scheme.semantic.spacing[8]
              : theme.scheme.semantic.spacing[6];

      return {
        border: `1px solid ${theme.color.semantic.feedback.destructive.neutral}`,
        borderRadius,
        padding,
      };
    },
    disabled: (theme: Theme, size: CheckboxSize) => {
      const borderRadius =
        size === "lg" || size === "md"
          ? theme.scheme.semantic.radius[6]
          : theme.scheme.semantic.radius[4];
      const padding =
        size === "lg"
          ? theme.scheme.semantic.spacing[12]
          : size === "md"
            ? theme.scheme.semantic.spacing[10]
            : size === "sm"
              ? theme.scheme.semantic.spacing[8]
              : theme.scheme.semantic.spacing[6];

      return {
        border: `1px solid ${theme.color.semantic.feedback.destructive.alpha.subtler}`,
        borderRadius,
        padding,
      };
    },
  },
};

export const StyledCheckboxContentContainer = styled("label", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $size: CheckboxSize;
  $align: CheckboxAlign;
  $variant: CheckboxVariant;
  $checked: boolean;
  $isIndeterminate: boolean;
  $disabled: boolean;
  $isInvalid: boolean;
}>(({ theme, $size, $align, $variant, $checked, $isIndeterminate, $disabled, $isInvalid }) => {
  const interactionStyles = contentContainerInteractionStyles({
    theme,
    variant: $variant,
    size: $size,
    checked: $checked,
    isIndeterminate: $isIndeterminate,
    disabled: $disabled,
    isInvalid: $isInvalid,
  });

  const getVariantStyles = () => {
    if ($variant === "empty") {
      return emptyVariantStyle;
    }

    const validity = $isInvalid ? "invalid" : "valid";
    const availability = $disabled ? "disabled" : "normal";
    return outlinedVariantStyles[validity][availability](theme, $size);
  };

  return {
    display: "inline-flex",
    flexDirection: $align === "left" ? "row" : "row-reverse",
    alignItems: "flex-start",
    cursor: $disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    ...gapMap[$size](theme),
    ...getVariantStyles(),
    ...interactionStyles,
  };
});

export const StyledHiddenInput = styled("input")({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
  opacity: 0,
});

export const StyledLabelContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.scheme.semantic.spacing[2],
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
  shouldForwardProp: prop => !prop.startsWith("$"),
})<
  LabelOwnProps & {
    $disabled: boolean;
    $isInvalid: boolean;
  }
>(({ theme, $disabled, $isInvalid }) => {
  const validity = $isInvalid ? "invalid" : "valid";
  const availability = $disabled ? "disabled" : "normal";
  const colors = labelColorParams[validity][availability](theme);
  return {
    color: colors.main,
  };
});

export const StyledSubLabel = styled(Label, {
  shouldForwardProp: prop => !prop.startsWith("$"),
})<
  LabelOwnProps & {
    $disabled: boolean;
    $isInvalid: boolean;
  }
>(({ theme, $disabled, $isInvalid }) => {
  const validity = $isInvalid ? "invalid" : "valid";
  const availability = $disabled ? "disabled" : "normal";
  const colors = labelColorParams[validity][availability](theme);
  return {
    color: colors.sub,
  };
});
