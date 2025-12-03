import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { InteractionLayer } from "utils";

import type { InputAreaStyle, InputAreaValidation } from "./inputArea.types";
import { Label } from "../../Label";

const getBorderColor = (
  theme: Theme,
  validation: InputAreaValidation,
  state: "rest" | "hover" | "active" | "focus",
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
    outlined: "transparent",
    empty: "transparent",
  } as const;

  const readOnlyBackgroundColorMap = {
    outlined: "transparent",
    empty: "transparent",
  } as const;

  const normalBackgroundColorMap = {
    outlined: theme.color.semantic.surface.standard,
    empty: "transparent",
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

export const StyledTextAreaWrapper = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $style: InputAreaStyle;
  $validation: InputAreaValidation;
  $disabled: boolean;
  $readOnly: boolean;
  $height?: number | string;
  $minHeight?: number | string;
}>(({ theme, $style, $validation, $disabled, $readOnly, $height, $minHeight }) => {
  const restBorderColor = getBorderColor(theme, $validation, "rest", $disabled, $readOnly);
  const hoverBorderColor = getBorderColor(theme, $validation, "hover", $disabled, $readOnly);
  const activeBorderColor = getBorderColor(theme, $validation, "active", $disabled, $readOnly);
  const focusBorderColor = getBorderColor(theme, $validation, "focus", $disabled, $readOnly);
  const backgroundColor = getBackgroundColor(theme, $style, $disabled, $readOnly);

  //Todo: interactionLayer의 매개변수를 공통 유틸리티로 이관 및 연동
  const interactionParams = {
    outlined: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: "hover",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        borderRadius: 6,
      }),
    },
    empty: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: 6,
      }),
      hoverStyle: InteractionLayer({
        theme,
        state: "hover",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: 6,
      }),
      activeStyle: InteractionLayer({
        theme,
        state: "active",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: 6,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "assistive",
        fillColor: "default",
        isDisabled: $disabled,
        isReadonly: $readOnly,
        offsetVertical: 4,
        offsetHorizontal: 6,
        borderRadius: 6,
      }),
    },
  };

  const { restStyle, hoverStyle, activeStyle, focusStyle } = interactionParams[$style];

  const baseBorderStyle = $style === "outlined" ? `0 0 0 1px ${restBorderColor}` : "none";

  const padding =
    $style === "outlined"
      ? `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[8]}`
      : `${theme.scheme.semantic.spacing[0]} ${theme.scheme.semantic.spacing[0]}`;

  const heightValue = $height
    ? typeof $height === "number"
      ? `${$height / 16}rem`
      : $height
    : undefined;

  const minHeightValue = $minHeight
    ? typeof $minHeight === "number"
      ? `${$minHeight / 16}rem`
      : $minHeight
    : "7rem";

  const baseStyles: CSSObject = {
    ...restStyle,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    height: heightValue || "auto",
    minHeight: heightValue ? undefined : minHeightValue,
    overflow: heightValue ? "hidden" : "visible",
    padding,
    backgroundColor,
    border: "none",
    boxShadow: baseBorderStyle,
    borderRadius: theme.scheme.semantic.radius[6],
    cursor: $disabled ? "not-allowed" : "text",
    transition: `box-shadow ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    position: "relative",

    "::after": {
      ...restStyle["::after"],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
  };

  if ($disabled || $readOnly) {
    return baseStyles;
  }

  const isFocusOutlineHidden = $validation !== "none";

  return {
    ...baseStyles,
    "&:hover": {
      ...hoverStyle,
      boxShadow: $style === "outlined" ? `0 0 0 1px ${hoverBorderColor}` : "none",
      "::after": {
        ...hoverStyle["::after"],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    "&:active": {
      ...activeStyle,
      boxShadow: $style === "outlined" ? `0 0 0 1px ${activeBorderColor}` : "none",
      "::after": {
        ...activeStyle["::after"],
        transition: "none",
      },
    },
    "&:focus-within": {
      ...focusStyle,
      boxShadow: $style === "outlined" ? `0 0 0 2px ${focusBorderColor}` : "none",
      "::before": isFocusOutlineHidden
        ? {
            opacity: 0,
          }
        : {
            ...focusStyle["::before"],
          },
      "::after": {
        ...restStyle["::after"],
      },
    },
  };
});

export const StyledTextArea = styled("textarea", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $disabled: boolean;
  $readOnly: boolean;
  $hasFixedHeight: boolean;
}>(({ theme, $disabled, $readOnly, $hasFixedHeight }) => {
  const textColor = getTextColor(theme, $disabled, $readOnly);

  return {
    display: "block",
    width: "100%",
    height: "100%",
    padding: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: textColor,
    ...theme.textStyle["semantic-textStyle-body-sm-normal"],
    position: "relative",
    zIndex: 1,
    resize: $hasFixedHeight ? "none" : "vertical",
    overflow: "auto",
    boxSizing: "border-box",
    //Todo: 사파리나 firefox 같은 곳에서는 지원하진 않는 속성 (리사이징 훅 등 처리 필요)
    fieldSizing: "content",

    "&::placeholder": {
      color: theme.color.semantic.object.assistive,
    },
  };
});

export const StyledHelperContainer = styled("div", {
  shouldForwardProp: prop => !prop.startsWith("$"),
})<{
  $validation: InputAreaValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  gap: theme.scheme.semantic.spacing[16],
  color: getHelperTextColor(theme, $validation, $disabled, $readOnly),
}));

export const StyledHelperText = styled(Label)({
  color: "inherit",
  flex: "1 0 0",
});

export const StyledCountText = styled(Label)({
  color: "inherit",
  marginLeft: "auto",
});

export {
  StyledFieldContainer,
  StyledLabelContainer,
  StyledFieldLabel,
  StyledInputColumn,
} from "../shared/field.styles";
