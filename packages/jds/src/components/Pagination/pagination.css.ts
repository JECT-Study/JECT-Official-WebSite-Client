import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { focusRing, overlay, pxToRem } from "utils";

export const list = style({
  display: "flex",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["4"],
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const item = style({
  display: "flex",
  flexShrink: 0,
});

const baseStyles = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.scheme.semantic.radius["6"],
  backgroundColor: "transparent",
  cursor: "pointer",
  userSelect: "none",
  textDecoration: "none",
  selectors: {
    "&::before, &::after": {
      inset: 0,
      borderRadius: "inherit",
    },
    "&:disabled, &[data-disabled]": {
      cursor: "not-allowed",
    },
  },
});

const interactiveBase = [overlay({ hierarchy: "primary" }), focusRing(), baseStyles];

export const page = style([
  ...interactiveBase,
  {
    minWidth: pxToRem(20),
    minHeight: pxToRem(20),
    padding: vars.scheme.semantic.spacing["4"],
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid transparent`,
    boxSizing: "content-box",
    color: vars.color.semantic.object.neutral,
    transition: [
      `color ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
      `background-color ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
      `border-color ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
      `font-weight ${vars.environment.semantic.duration["150"]} ${vars.environment.semantic.motion.fluent}`,
    ].join(", "),
    selectors: {
      // 페이지 번호가 key라서 구간이 밀리면 이전 선택 노드가 옆 칸으로 옮겨진다. 그 칸에 선택 강조가 남지 않도록 즉시 전환한다.
      [`${list}[data-window-shifted] &`]: {
        transition: "none",
      },
      "&[aria-current='page']": {
        borderColor: vars.color.semantic.stroke.alpha.subtle,
        backgroundColor: vars.color.semantic.fill.subtlest,
        color: vars.color.semantic.object.bolder,
      },
      "&:disabled, &[data-disabled]": {
        color: vars.color.semantic.object.subtle,
      },
      "&[aria-current='page']:disabled, &[aria-current='page'][data-disabled]": {
        color: vars.color.semantic.object.subtle,
      },
    },
  },
]);

export const ellipsis = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: pxToRem(20),
  height: pxToRem(20),
  padding: vars.scheme.semantic.spacing["4"],
  borderRadius: vars.scheme.semantic.radius["6"],
  color: vars.color.semantic.object.neutral,
  boxSizing: "content-box",
  userSelect: "none",
});

export const arrow = style([
  ...interactiveBase,
  {
    padding: vars.scheme.semantic.spacing["6"],
    border: "none",
    color: vars.color.semantic.object.alternative,
    boxSizing: "content-box",
    selectors: {
      "&[data-disabled]": {
        color: vars.color.semantic.object.subtler,
      },
    },
  },
]);
