import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { Icon } from "../../Icon";
import type { InputStyle, InputValidation } from "../input.types";

import { shouldForwardTypographyProp } from "@/utils/typography";

export const getLabelColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.semantic.object.assistive;
  }

  if (readOnly) {
    return theme.color.semantic.object.normal;
  }

  return theme.color.semantic.object.normal;
};

export const getLabelIconColor = (theme: Theme, disabled: boolean, readOnly: boolean): string => {
  if (disabled) {
    return theme.color.semantic.object.neutral;
  }

  if (readOnly) {
    return theme.color.semantic.object.neutral;
  }

  return theme.color.semantic.accent.neutral;
};

export const getHelperTextColor = (
  theme: Theme,
  validation: InputValidation,
  disabled: boolean,
  readOnly: boolean,
): string => {
  if (disabled) {
    const disabledColorMap = {
      none: theme.color.semantic.object.subtle,
      error: theme.color.semantic.feedback.destructive.alpha.assistive,
      success: theme.color.semantic.feedback.positive.alpha.assistive,
    };
    return disabledColorMap[validation];
  }

  if (readOnly) {
    const readOnlyColorMap = {
      none: theme.color.semantic.object.alternative,
      error: theme.color.semantic.feedback.destructive.alpha.assistive,
      success: theme.color.semantic.feedback.positive.alpha.assistive,
    };
    return readOnlyColorMap[validation];
  }

  const helperColorMap = {
    none: theme.color.semantic.object.alternative,
    error: theme.color.semantic.feedback.destructive.neutral,
    success: theme.color.semantic.feedback.positive.neutral,
  };

  return helperColorMap[validation];
};

export const StyledFieldContainer = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})(({ theme }) => ({
  display: "flex",
  padding: 0,
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: theme.scheme.semantic.spacing[6],
}));

export const StyledLabelContainer = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{ $disabled?: boolean; $readOnly?: boolean }>(
  ({ theme, $disabled = false, $readOnly = false }) => ({
    display: "flex",
    padding: 0,
    alignItems: "center",
    alignSelf: "stretch",
    gap: theme.scheme.semantic.spacing[4],
    color: getLabelColor(theme, $disabled, $readOnly),
  }),
);

export const StyledLabelIcon = styled(Icon, {
  shouldForwardProp: prop => !prop.startsWith("$"),
})(({ theme }) => ({
  color: theme.color.semantic.accent.neutral,
}));

export const StyledFieldLabel = styled("label", {
  shouldForwardProp: shouldForwardTypographyProp,
})<{ $disabled: boolean; $readOnly: boolean }>(({ theme, $disabled, $readOnly }) => ({
  "&&": {
    color: getLabelColor(theme, $disabled, $readOnly),
  },
}));

export const StyledHelperText = styled("span", {
  shouldForwardProp: shouldForwardTypographyProp,
})<{
  $validation: InputValidation;
  $disabled: boolean;
  $readOnly: boolean;
}>(({ theme, $validation, $disabled, $readOnly }) => ({
  "&&": {
    color: getHelperTextColor(theme, $validation, $disabled, $readOnly),
  },
}));

export const StyledInputColumn = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flex: "1 0 0",
  alignSelf: "stretch",
  gap: theme.scheme.semantic.spacing[6],
}));

export const StyledInputRow = styled("div", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $style?: InputStyle;
}>(({ theme, $style }) => {
  const gapValue = $style === "empty" ? 20 : 12;

  return {
    display: "flex",
    gap: theme.scheme.semantic.spacing[gapValue],
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
    "& > button": {
      flexShrink: 0,
    },
  };
});
