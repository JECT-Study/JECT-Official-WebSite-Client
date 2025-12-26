import isPropValid from "@emotion/is-prop-valid";
import type { CSSObject, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import type { LogoHierarchy } from "components";
import { InteractionLayer, pxToRem } from "utils";

const LOGO_ASPECT_RATIO = 35 / 8;

const offsetMap = { vertical: 4, horizontal: 4, borderRadius: 4 };

const hierarchyColorsMap = (theme: Theme): Record<LogoHierarchy, { color: string }> => ({
  primary: {
    color: theme.color.semantic.object.boldest,
  },
  secondary: {
    color: theme.color.semantic.object.normal,
  },
  tertiary: {
    color: theme.color.semantic.object.alternative,
  },
  inverse: {
    color: theme.color.semantic.object.static.inverse.alternative,
  },
});

const interactionStyles = (theme: Theme, hierarchy: LogoHierarchy): CSSObject => {
  const offset = offsetMap;
  const interactionParams = {
    primary: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "focus",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
    secondary: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "focus",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
    tertiary: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "focus",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
    inverse: {
      restStyle: InteractionLayer({
        theme,
        state: "rest",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
      focusStyle: InteractionLayer({
        theme,
        state: "focus",
        variant: "normal",
        density: "normal",
        fillColor: "default",
        isDisabled: false,
        offsetVertical: offset.vertical,
        offsetHorizontal: offset.horizontal,
        borderRadius: offset.borderRadius,
      }),
    },
  };

  const { restStyle, focusStyle } = interactionParams[hierarchy];

  return {
    ...restStyle,
    "&:focus-visible": {
      ...focusStyle,
    },
  };
};

export function GetLogoStyles(theme: Theme, hierarchy: LogoHierarchy, height: number) {
  const colorStyle = hierarchyColorsMap(theme)[hierarchy];
  const interactionStyle = interactionStyles(theme, hierarchy);
  const width = height * LOGO_ASPECT_RATIO;

  return {
    ...colorStyle,
    ...interactionStyle,
    width: pxToRem(width),
    height: pxToRem(height),
  };
}

export const StyledLogo = styled("a", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<{
  $hierarchy: LogoHierarchy;
  $height: number;
}>(({ theme, $hierarchy, $height }) => {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
    ...GetLogoStyles(theme, $hierarchy, $height),
  };
});
