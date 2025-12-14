import isPropValid from "@emotion/is-prop-valid";
import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { InteractionLayer } from "utils";

import type { StyledImageProps, StyledMenuItemProps } from "./menuItem.types";
import { menuItemColorMap, menuItemImageSizeMap } from "./menuItem.variants";
import { Image } from "../../Image";

const createInteractionStyles = (
  theme: Theme,
  isDisabled: boolean,
  isSelected: boolean,
  isDestructive: boolean,
) => {
  const borderRadius = 6;
  const offset = {
    vertical: 4,
    horizontal: 8,
  };

  const makeLayer = (state: "rest" | "hover" | "active" | "focus") =>
    InteractionLayer({
      theme,
      state,
      variant: isDestructive ? "destructive" : isSelected ? "accent" : "normal",
      density: "assistive",
      fillColor: "default",
      isReadonly: isDisabled,
      offsetVertical: offset.vertical,
      offsetHorizontal: offset.horizontal,
      borderRadius,
    });

  return {
    restStyle: makeLayer("rest"),
    hoverStyle: makeLayer("hover"),
    activeStyle: makeLayer("active"),
    focusStyle: makeLayer("focus"),
  };
};

export const StyledMenuItemButton = styled("button", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<StyledMenuItemProps>(({ theme, $isDisabled, $isSelected, $isDestructive }) => {
  const color = menuItemColorMap(theme, $isDisabled, $isSelected, $isDestructive);
  const interactionStyles = createInteractionStyles(
    theme,
    $isDisabled,
    $isSelected,
    $isDestructive,
  );

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.scheme.semantic.spacing[12],
    width: "100%",
    cursor: $isDisabled ? "default" : "pointer",
    color,
    ...interactionStyles.restStyle,

    "&:hover": {
      ...interactionStyles.hoverStyle,
    },

    "&:active": {
      ...interactionStyles.activeStyle,
    },

    "&:focus-visible": {
      ...interactionStyles.focusStyle,
    },
  };
});

export const StyledMenuItemAnchor = styled("a", {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith("$"),
})<StyledMenuItemProps>(({ theme, $isDisabled, $isSelected, $isDestructive }) => {
  const color = menuItemColorMap(theme, $isDisabled, $isSelected, $isDestructive);
  const interactionStyles = createInteractionStyles(
    theme,
    $isDisabled,
    $isSelected,
    $isDestructive,
  );

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.scheme.semantic.spacing[12],
    width: "100%",
    cursor: $isDisabled ? "default" : "pointer",
    color,
    ...interactionStyles.restStyle,

    "&:hover": {
      ...interactionStyles.hoverStyle,
      "::after": {
        ...interactionStyles.hoverStyle["::after"],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },

    "&:active": {
      ...interactionStyles.activeStyle,
    },

    "&:focus-visible": {
      ...interactionStyles.focusStyle,
    },
  };
});

export const StyledImage = styled(Image)<StyledImageProps>(({ $size }) => {
  const width = menuItemImageSizeMap[$size];
  return {
    borderRadius: 0,
    width,
  };
});
