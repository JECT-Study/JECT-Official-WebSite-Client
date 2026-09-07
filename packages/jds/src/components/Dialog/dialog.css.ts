import { createVar, fallbackVar, keyframes, style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, pxToRem } from "utils";

import type { DialogButtonLayout } from "./dialog.types";

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
      animation: `${overlayFadeIn} ${vars.environment.semantic.duration["250"]} ${vars.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${overlayFadeOut} ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.leave}`,
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
      animation: `${slideIn} ${vars.environment.semantic.duration["250"]} ${vars.environment.semantic.motion.entrance}`,
    },
    '&[data-state="closed"]': {
      animation: `${slideOut} ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.leave}`,
    },
  },
});

const minPanelWidth = pxToRem(400);
const maxPanelWidth = pxToRem(560);
const availableWidth = `calc(100% - ${pxToRem(32)})`;

/**
 * `Dialog`의 `width` prop이 rem으로 변환해 주입하는 비공개 변수.
 * panel이 fallback으로만 읽으므로 인라인 값이 명시도 경쟁 없이 이긴다.
 */
export const dialogPanelWidth = createVar();

export const panel = style({
  display: "flex",
  flexDirection: "column",
  minWidth: `min(${fallbackVar(dialogPanelWidth, minPanelWidth)}, ${availableWidth})`,
  maxWidth: `min(${fallbackVar(dialogPanelWidth, maxPanelWidth)}, ${availableWidth})`,
  maxHeight: `calc(100dvh - ${pxToRem(32)})`,
  borderRadius: vars.scheme.semantic.radius["12"],
  border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  background: vars.color.semantic.surface.shallow,
  boxShadow: vars.environment.semantic.shadow.overlay,
  overflow: "hidden",
});

/**
 * focus는 `scrollBody`가 받고 ring은 스크롤되지 않는 이 래퍼가 그린다.
 * `scrollBody`의 `::before`는 콘텐츠와 함께 스크롤되어 사라지기 때문이다.
 *
 * @see ../../utils/PSEUDO_ELEMENT_POLICY.md 의 상태 위임
 */
export const scrollRegion = style([
  focusRing({ border: "inside", interaction: "delegated" }),
  {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    flex: "1 1 auto",
    minHeight: 0,
    selectors: {
      "&::before": { inset: 0 },
    },
  },
]);

export const scrollBody = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  flex: "1 1 auto",
  minHeight: 0,
  overflowY: "auto",
  outline: "none",
  paddingInline: vars.scheme.semantic.spacing["20"],
  paddingBottom: vars.scheme.semantic.spacing["12"],
});

export const title = style({
  display: "flex",
  alignItems: "center",
  color: vars.color.semantic.object.bolder,
  cursor: "default",
  margin: 0,
  alignSelf: "stretch",
  flexShrink: 0,
  paddingTop: vars.scheme.semantic.spacing["20"],
  paddingInline: vars.scheme.semantic.spacing["20"],
  paddingBottom: vars.scheme.semantic.spacing["12"],
});

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  flexShrink: 0,
  gap: vars.scheme.semantic.spacing["12"],
  paddingTop: vars.scheme.semantic.spacing["12"],
  paddingInline: vars.scheme.semantic.spacing["20"],
  paddingBottom: vars.scheme.semantic.spacing["20"],
});

export const bodyText = style({
  alignSelf: "stretch",
  textAlign: "left",
  color: vars.color.semantic.object.normal,
});

export const buttonGroup = recipe({
  base: {
    display: "flex",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["12"],
    flexShrink: 0,
  },
  variants: {
    buttonLayout: {
      horizontal: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "stretch",
      },
    } satisfies Record<DialogButtonLayout, StyleRule>,
  },
});
