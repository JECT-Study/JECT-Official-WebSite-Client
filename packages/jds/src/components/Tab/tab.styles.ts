import type { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { Tabs as TabPrimitive } from "radix-ui";
import { InteractionLayer } from "utils";

import { Label } from "../Label";
import type { StyledTabPrimitiveListProps, StyledTabPrimitiveTriggerProps } from "./tab.types";

const createInteractionStyles = (theme: Theme, borderRadius: number, isReadonly: boolean) => {
  const makeLayer = (state: "rest" | "hover" | "active" | "focus") =>
    InteractionLayer({
      theme,
      state,
      variant: "normal",
      density: "assistive",
      fillColor: "default",
      isReadonly,
      borderRadius,
    });

  return {
    restStyle: makeLayer("rest"),
    hoverStyle: makeLayer("hover"),
    activeStyle: makeLayer("active"),
    focusStyle: makeLayer("focus"),
  };
};

export const StyledTabList = styled(TabPrimitive.List)<StyledTabPrimitiveListProps>(({
  theme,
  $variant,
}) => {
  return {
    display: "flex",
    gap: $variant === "header" ? 0 : theme.scheme.semantic.spacing[8],
    borderBottom:
      $variant === "header" ? `2px solid ${theme.color.semantic.stroke.assistive}` : "none",
  };
});

export const StyledTabPrimitiveTrigger = styled(
  TabPrimitive.Trigger,
)<StyledTabPrimitiveTriggerProps>(({ theme, $variant, $isDisabled, $isItemStretched }) => {
  const borderRadius = $variant === "header" ? 0 : 6;
  const interactionStyles = createInteractionStyles(theme, borderRadius, $isDisabled);

  return {
    display: "flex",
    flex: $isItemStretched ? "1 1 0%" : "0 0 auto",
    justifyContent: "center",
    gap: theme.scheme.semantic.spacing[4],
    padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[12]}`,
    cursor: "pointer",
    border:
      $variant === "content" ? `1px solid ${theme.color.semantic.stroke.alpha.subtle}` : "none",
    borderRadius: $variant === "content" ? theme.scheme.semantic.radius[6] : 0,

    '&[data-state="inactive"]': {
      color: theme.color.semantic.object.alternative,
    },

    '&[data-state="active"]': {
      backgroundColor: $variant === "content" ? theme.color.semantic.fill.subtlest : "none",
      color: theme.color.semantic.object.bolder,
      borderBottom:
        $variant === "content"
          ? `1px solid ${theme.color.semantic.stroke.alpha.subtle}`
          : `2px solid ${theme.color.semantic.stroke.bold}`,
    },

    ...interactionStyles.restStyle,

    "&:active": {
      ...interactionStyles.activeStyle,
      "::after": {
        ...interactionStyles.activeStyle["::after"],
        transition: "none",
      },
    },

    "&:focus-visible": {
      ...interactionStyles.focusStyle,
    },

    "&[data-disabled]": {
      color: theme.color.semantic.object.subtle,
      cursor: "default",
      borderBottom:
        $variant === "content" ? `1px solid ${theme.color.semantic.stroke.alpha.subtle}` : "none",
    },
  };
});

export const StyledLabel = styled(Label)(() => ({
  color: "inherit",
  cursor: "inherit",
}));
