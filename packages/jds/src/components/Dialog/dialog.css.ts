import { createVar, fallbackVar, keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "tokens";
import { focusRing, pxToRem } from "utils";

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
const availableWidth = `calc(100vw - ${pxToRem(32)})`;

/**
 * 패널 너비를 사용처에서 정하는 CSS 변수. 지정하지 않으면 내용에 따라 400~560px 사이에서 정해진다.
 *
 * 지정하면 min/maxWidth가 모두 이 값이 되어 너비가 고정된다. 어느 경우든 viewport를 넘지 않도록
 * `availableWidth`로 한 번 더 좁힌다. `panel`이 변수를 선언하지 않고 fallback으로만 읽으므로
 * 사용처가 명시도 경쟁 없이 덮어쓸 수 있다.
 *
 * @example
 *   <Dialog style={assignInlineVars({ [dialogPanelWidth]: "720px" })} />
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
 * focus를 받는 것은 스크롤 컨테이너인 `scrollBody`지만, ring은 스크롤되지 않는 이 래퍼가 그린다.
 * `scrollBody`의 `::before`는 스크롤 콘텐츠와 함께 올라가 사라지기 때문이다.
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
