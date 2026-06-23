import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import type { ToastFeedback } from "./toast.types";

import { breakpoints } from "@/tokens/breakpoints";
import { labelColorVar } from "@/utils/typography.css";

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(100%)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const slideOut = keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(100%)" },
});

export const stackContainer = style({
  position: "fixed",
  right: 0,
  bottom: 0,
  zIndex: vars.environment.semantic.zIndex.overlay,
  display: "flex",
  flexDirection: "column-reverse",
  gap: vars.scheme.semantic.spacing["16"],
  padding: vars.scheme.semantic.spacing["40"],
  overflow: "hidden",
  "@media": {
    [`screen and (max-width: ${breakpoints.mobile.max}px)`]: {
      left: 0,
      padding: vars.scheme.semantic.spacing["24"],
      boxSizing: "border-box",
      alignItems: "center",
    },
  },
});

export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
});

export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    boxSizing: "border-box",
    width: pxToRem(280),
    maxWidth: "100%",
    padding: `${vars.scheme.semantic.spacing["12"]} ${vars.scheme.semantic.spacing["16"]}`,
    borderRadius: vars.scheme.semantic.radius["10"],
    backgroundColor: vars.color.semantic.surface.shallow,
    boxShadow: `inset 0 0 0 ${vars.scheme.semantic.strokeWeight["1"]} ${vars.color.semantic.stroke.subtle}, ${vars.environment.semantic.shadow.overlay}`,
  },
  variants: {
    feedback: {
      none: { gap: 0 },
      positive: { gap: vars.scheme.semantic.spacing["10"] },
      destructive: { gap: vars.scheme.semantic.spacing["10"] },
      notifying: { gap: vars.scheme.semantic.spacing["10"] },
    } satisfies Record<ToastFeedback, object>,
  },
  defaultVariants: {
    feedback: "none",
  },
});

export const content = recipe({
  base: {
    display: "flex",
    flex: 1,
    minWidth: 0,
    flexDirection: "column",
  },
  variants: {
    withDescription: {
      true: { gap: vars.scheme.semantic.spacing["2"] },
      false: { gap: vars.scheme.semantic.spacing["0"] },
    },
  },
  defaultVariants: {
    withDescription: false,
  },
});

export const label = style({
  vars: {
    [labelColorVar]: vars.color.semantic.object.boldest,
  },
});

export const description = style({
  color: vars.color.semantic.object.neutral,
});

export const icon = recipe({
  base: {
    flexShrink: 0,
    padding: `${vars.scheme.semantic.spacing["2"]} ${vars.scheme.semantic.spacing["0"]}`,
  },
  variants: {
    feedback: {
      none: {},
      positive: { color: vars.color.semantic.feedback.positive.normal },
      destructive: { color: vars.color.semantic.feedback.destructive.normal },
      notifying: { color: vars.color.semantic.feedback.notifying.inverse.bold },
    } satisfies Record<ToastFeedback, object>,
  },
});

export const enter = style({
  animation: `${slideIn} ${vars.environment.semantic.duration["250"]} ${vars.environment.semantic.motion.bouncy} forwards`,
});

export const exit = style({
  animation: `${slideOut} ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.leave} forwards`,
});
