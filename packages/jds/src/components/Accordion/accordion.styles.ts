import { keyframes, type Theme } from "@emotion/react";
import styled from "@emotion/styled";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { InteractionLayer } from "utils";

import type {
  AccordionSize,
  StyledAccordionContentProps,
  StyledAccordionTriggerProps,
} from "./accordion.types";
import type { IconSize } from "../Icon/Icon.types";

import { shouldForwardTypographyProp } from "@/utils/typography";
import type { LabelSize } from "@/utils/typography";

export const accordionSizeMap: Record<
  AccordionSize,
  {
    iconSize: IconSize;
    labelSize: LabelSize;
    contentTextStyle: keyof Theme["textStyle"];
  }
> = {
  lg: { iconSize: "sm", labelSize: "lg", contentTextStyle: "semantic-textStyle-body-lg-normal" },
  md: { iconSize: "xs", labelSize: "md", contentTextStyle: "semantic-textStyle-body-md-normal" },
  sm: { iconSize: "xs", labelSize: "sm", contentTextStyle: "semantic-textStyle-body-xs-normal" },
};

const createInteractionStyles = (theme: Theme, isReadonly: boolean) => {
  const borderRadius = 4;
  const offset = { vertical: 4, horizontal: 6 };

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
  width: "100%",
}));

export const StyledAccordionTrigger = styled(
  AccordionPrimitive.Trigger,
)<StyledAccordionTriggerProps>(({ theme, $isStretched }) => {
  const interactionStyles = createInteractionStyles(theme, false);
  const disabledInteractionStyles = createInteractionStyles(theme, true);

  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.scheme.semantic.spacing[16],
    width: "100%",
    padding: $isStretched
      ? 0
      : `${theme.scheme.semantic.spacing[4]} ${theme.scheme.semantic.spacing[16]}`,
    color: theme.color.semantic.object.bolder,
    ...interactionStyles.restStyle,

    "&:hover": {
      ...interactionStyles.hoverStyle,
    },

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
      pointerEvents: "none",
      color: theme.color.semantic.object.subtle,
      ...disabledInteractionStyles.restStyle,

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
  flex: 1,
}));

export const StyledAccordionChevron = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  transition: `transform ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent}`,
}));

export const StyleLabel = styled("span", { shouldForwardProp: shouldForwardTypographyProp })(
  () => ({
    "&&": {
      color: "inherit",
      cursor: "pointer",
    },
    textAlign: "left" as const,
    textWrap: "wrap" as const,
  }),
);

const slideUp = keyframes`
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  `;

const slideDown = keyframes`
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  `;

export const StyledAccordionContent = styled(AccordionPrimitive.Content)<
  Pick<StyledAccordionContentProps, "$size">
>(({ theme, $size }) => {
  return {
    overflow: "hidden",
    color: theme.color.semantic.object.bold,
    willChange: "height",

    "&[data-disabled]": {
      color: theme.color.semantic.object.subtle,
    },

    '&[data-state="open"]': {
      animation: `${slideDown} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent} `,
    },

    '&[data-state="closed"]': {
      animation: `${slideUp} ${theme.environment.semantic.duration[300]} ${theme.environment.semantic.motion.fluent}`,
    },

    ...theme.textStyle[accordionSizeMap[$size].contentTextStyle],
  };
});

export const StyledAccordionContentText = styled("div")<
  Pick<StyledAccordionContentProps, "$isStretched">
>(({ theme, $isStretched }) => ({
  marginTop: theme.scheme.semantic.spacing[12],
  padding: $isStretched ? 0 : `0 ${theme.scheme.semantic.spacing[16]}`,
}));
