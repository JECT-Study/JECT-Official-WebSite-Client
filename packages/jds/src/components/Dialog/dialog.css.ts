import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

const restingTransform = "translate(-50%, -50%)";
const offsetTransform = `translate(-50%, calc(-50% + ${pxToRem(60)}))`;

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
    transform: offsetTransform,
  },
  to: {
    opacity: 1,
    transform: restingTransform,
  },
});

const slideOut = keyframes({
  from: {
    opacity: 1,
    transform: restingTransform,
  },
  to: {
    opacity: 0,
    transform: offsetTransform,
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

export const positioner = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: restingTransform,
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

const minPanelWidth = pxToRem(400);
const maxPanelWidth = pxToRem(560);
const availableWidth = `calc(100vw - ${pxToRem(32)})`;

export const panel = style({
  display: "flex",
  flexDirection: "column",
  minWidth: `min(${minPanelWidth}, ${availableWidth})`,
  maxWidth: `min(${maxPanelWidth}, ${availableWidth})`,
  maxHeight: `calc(100vh - ${pxToRem(32)})`,
  borderRadius: vars.scheme.semantic.radius["12"],
  border: `1px solid ${vars.color.semantic.stroke.alpha.subtle}`,
  background: vars.color.semantic.surface.shallow,
  boxShadow: vars.environment.semantic.shadow.overlay,
});

export const contentArea = style({
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  padding: vars.scheme.semantic.spacing["20"],
  gap: vars.scheme.semantic.spacing["24"],
});

export const contentGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  gap: vars.scheme.semantic.spacing["16"],
  minHeight: 0,
  overflowY: "auto",
});

export const textGroup = style({
  display: "flex",
  flexDirection: "column",
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

export const buttonGroup = styleVariants({
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["12"],
    flexShrink: 0,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["12"],
    flexShrink: 0,
  },
});
