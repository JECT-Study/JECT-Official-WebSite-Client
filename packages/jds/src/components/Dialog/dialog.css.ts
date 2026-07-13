import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

const overlayFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const overlayFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: "translate(-50%, calc(-50% + 60px))",
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%)",
  },
});

const slideOut = keyframes({
  from: {
    opacity: 1,
    transform: "translate(-50%, -50%)",
  },
  to: {
    opacity: 0,
    transform: "translate(-50%, calc(-50% + 60px))",
  },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: vars.environment.semantic.zIndex.overlay,
  backgroundColor: vars.color.semantic.curtain.static.dim,
  selectors: {
    '&[data-state="open"]': {
      animation: `${overlayFadeIn} ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${overlayFadeOut} ${vars.environment.semantic.duration["300"]} ${vars.environment.semantic.motion.leave}`,
    },
  },
});

export const content = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: vars.environment.semantic.zIndex.overlay,
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideIn} ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${slideOut} ${vars.environment.semantic.duration["300"]} ${vars.environment.semantic.motion.leave}`,
    },
  },
});

export const panel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: `calc(100vw - ${pxToRem(32)})`,
  maxWidth: pxToRem(500),
  padding: vars.scheme.semantic.spacing["0"],
  gap: vars.scheme.semantic.spacing["0"],
  borderRadius: vars.scheme.semantic.radius["12"],
  border: `1px solid ${vars.color.semantic.stroke.alpha.subtle}`,
  background: vars.color.semantic.surface.shallow,
  boxShadow: vars.environment.semantic.shadow.overlay,
});

export const inner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: vars.scheme.semantic.spacing["20"],
  gap: vars.scheme.semantic.spacing["24"],
});

export const contentGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: vars.scheme.semantic.spacing["0"],
  gap: vars.scheme.semantic.spacing["16"],
});

export const textGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  gap: vars.scheme.semantic.spacing["12"],
});

export const title = style({
  margin: 0,
  alignSelf: "stretch",
});

export const bodyText = style({
  margin: 0,
  alignSelf: "stretch",
  color: vars.color.semantic.object.normal,
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignSelf: "stretch",
  padding: vars.scheme.semantic.spacing["0"],
  gap: vars.scheme.semantic.spacing["12"],
});
