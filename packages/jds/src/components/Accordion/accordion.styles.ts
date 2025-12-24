import { keyframes, type Theme } from "@emotion/react";
import styled from "@emotion/styled";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { InteractionLayer } from "utils";

import type { StyledAccordionContentProps, StyledAccordionTriggerProps } from "./accordion.types";
import { Label } from "../Label";

const createInteractionStyles = (theme: Theme, isStretched: boolean, isReadonly: boolean) => {
  const borderRadius = 4;
  const offset = isStretched ? { vertical: 0, horizontal: 0 } : { vertical: 4, horizontal: 6 };

  const makeLayer = (state: "rest" | "hover" | "active" | "focus") =>
    InteractionLayer({
      theme,
      state,
      variant: "normal",
      density: "subtle",
      fillColor: "default",
      isReadonly,
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

export const StyledAccordionRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.scheme.semantic.spacing[24],
}));

export const StyledAccordionTrigger = styled(
  AccordionPrimitive.Trigger,
)<StyledAccordionTriggerProps>(({ theme, $isStretched }) => {
  const interactionStyles = createInteractionStyles(theme, $isStretched, false);
  const disabledInteractionStyles = createInteractionStyles(theme, $isStretched, true);

  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: $isStretched
      ? 0
      : `${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.spacing[16]}`,
    color: theme.color.semantic.object.bolder,
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
      ...disabledInteractionStyles.restStyle,

      "&:hover": {
        ...disabledInteractionStyles.hoverStyle,
        "::after": {
          ...interactionStyles.hoverStyle["::after"],
          transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
        },
      },

      "&:active": {
        ...disabledInteractionStyles.activeStyle,
        "::after": {
          ...disabledInteractionStyles.activeStyle["::after"],
          transition: "none",
        },
      },

      "&:focus-visible": {
        ...disabledInteractionStyles.focusStyle,
      },
    },

    '&[data-state="open"] .arrowIcon': {
      transform: "rotate(180deg)",
    },
  };
});

export const StyledAccordionLabelContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.scheme.semantic.spacing[8],
}));

export const StyledAccordionChevron = styled("div")(({ theme }) => ({
  transition: `transform ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent}`,
}));

export const StyleLabel = styled(Label)(() => ({
  color: "inherit",
  textAlign: "left" as const,
}));

const slideUp = keyframes`
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  `;

const slideDown = keyframes`
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  `;

export const StyledAccordionContent = styled(AccordionPrimitive.Content)(({ theme }) => {
  return {
    overflow: "hidden",
    ...theme.textStyle["semantic-textStyle-body-sm-normal"],
    color: theme.color.semantic.object.bold,
    ...theme.textStyle["semantic-textStyle-body-sm-normal"],

    "&[data-disabled]": {
      color: theme.color.semantic.object.subtle,
    },

    '&[data-state="open"]': {
      animation: `${slideDown} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent} `,
    },

    '&[data-state="closed"]': {
      animation: `${slideUp} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent}`,
    },
  };
});

export const StyledAccordionContentText = styled("div")<StyledAccordionContentProps>(
  ({ theme, $isStretched }) => ({
    marginTop: theme.scheme.semantic.spacing[12],
    padding: $isStretched ? 0 : `0 ${theme.scheme.semantic.spacing[16]}`,
  }),
);
