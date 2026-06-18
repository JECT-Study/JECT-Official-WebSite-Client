import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, pxToRem } from "utils";

import { labelColorVar } from "@/utils/typography.css";

// 탭 영역이 시각 영역보다 상하 4px / 좌우 6px 큰 컴포넌트 — overlay/focusRing 케이스 2
const LAYER_INSET = `${pxToRem(-4)} ${pxToRem(-6)}`;
const LAYER_RADIUS = vars.scheme.semantic.radius["4"];

const motionTransition = `${vars.environment.semantic.duration["300"]} ${vars.environment.semantic.motion.fluent}`;

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.scheme.semantic.spacing["24"],
  width: "100%",
});

const triggerBase = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["16"],
  width: "100%",
  cursor: "pointer",
  borderRadius: LAYER_RADIUS,
  color: vars.color.semantic.object.bolder,
  vars: {
    [overlayColor]: vars.color.semantic.object.subtle,
  },
  selectors: {
    "&[data-disabled]": {
      pointerEvents: "none",
      cursor: "default",
      color: vars.color.semantic.object.subtle,
    },
    // ::before = focusRing, ::after = overlay
    "&::before, &::after": { inset: LAYER_INSET, borderRadius: LAYER_RADIUS },
  },
});

/**
 * @remarks
 * Radix Accordion 내부(usePressable 미경유)에서도 쓰이므로 native hover로 opt-in한다.
 * Radix는 disabled 상태를 `data-disabled` 속성으로 부여하므로 overlay가 자동으로 차단된다.
 */
export const trigger = recipe({
  base: [overlay({ nativeHover: true }), focusRing(), triggerBase],
  variants: {
    isStretched: {
      true: { padding: `${vars.scheme.semantic.spacing["0"]}` },
      false: {
        padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["16"]}`,
      },
    },
  },
  defaultVariants: {
    isStretched: true,
  },
});

export const labelContainer = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["8"],
  flex: 1,
});

export const label = style({
  textAlign: "left",
  textWrap: "wrap",
  // @TODO: labelToken defaultValue 처리 후 한번에 제거.
  vars: {
    [labelColorVar]: "inherit",
  },
});

export const chevron = style({
  display: "flex",
  alignItems: "center",
  transition: `transform ${motionTransition}`,
  selectors: {
    '[data-state="open"] &': {
      transform: "rotate(180deg)",
    },
  },
});

const RADIX_ACCORDION_CONTENT_HEIGHT_VAR = "var(--radix-accordion-content-height)";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: RADIX_ACCORDION_CONTENT_HEIGHT_VAR },
});

const slideUp = keyframes({
  from: { height: RADIX_ACCORDION_CONTENT_HEIGHT_VAR },
  to: { height: 0 },
});

export const content = style({
  overflow: "hidden",
  color: vars.color.semantic.object.bold,
  willChange: "height",
  selectors: {
    "&[data-disabled]": {
      color: vars.color.semantic.object.subtle,
    },
    '&[data-state="open"]': {
      animation: `${slideDown} ${motionTransition}`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} ${motionTransition}`,
    },
  },
});

export const contentText = recipe({
  base: {
    marginTop: vars.scheme.semantic.spacing["12"],
  },
  variants: {
    isStretched: {
      true: { padding: `${vars.scheme.semantic.spacing["0"]}` },
      false: {
        padding: `${vars.scheme.semantic.spacing["0"]} ${vars.scheme.semantic.spacing["16"]}`,
      },
    },
  },
  defaultVariants: {
    isStretched: true,
  },
});
