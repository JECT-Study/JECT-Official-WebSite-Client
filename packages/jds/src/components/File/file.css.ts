import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { iconButtonAccentColor } from "../Button/IconButton/iconButton.css";

import { focusRing } from "@/utils/focusRing.css";
import { overlay, overlayHoverOpacity, overlayPressedOpacity } from "@/utils/overlay.css";
import { labelColorVar } from "@/utils/typography.css";

const LAYER_INSET = `${pxToRem(-6)} ${pxToRem(-8)}`;
const LAYER_RADIUS = vars.scheme.semantic.radius["6"];

export const root = style([
  overlay({ hierarchy: "secondary", density: "normal", interaction: "delegated" }),
  focusRing({ interaction: "delegated" }),
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: 0,
    gap: vars.scheme.semantic.spacing["8"],
    borderRadius: LAYER_RADIUS,
    background: "transparent",
    textAlign: "left",
    WebkitAppearance: "none",
    selectors: {
      "&::before, &::after": {
        inset: LAYER_INSET,
        borderRadius: LAYER_RADIUS,
      },
      "&[data-readonly]": {
        vars: {
          [overlayHoverOpacity]: "0",
          [overlayPressedOpacity]: "0",
        },
      },
    },
  },
]);

export const mainAction = style({
  display: "flex",
  flex: 1,
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["8"],
  minWidth: 0,
  padding: 0,
  border: "none",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  textAlign: "left",
  appearance: "none",
  WebkitAppearance: "none",
  cursor: "inherit",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
    },
    "&:disabled": {
      pointerEvents: "none",
      cursor: "inherit",
    },
  },
});

export const fileInfo = style({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["6"],
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.semantic.object.alternative,
  selectors: {
    [`${root}[data-disabled] &`]: {
      color: vars.color.semantic.object.subtler,
    },
  },
});

export const interactive = style({
  cursor: "pointer",
});

export const fileName = style({
  display: "block",
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "inherit",

  // native underline을 유지해 text-decoration-skip-ink 동작을 보장한다.
  textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationSkipInk: "auto",
  textDecorationColor: "transparent",
  transition: `text-decoration-color ${vars.environment.semantic.duration[100]} ${vars.environment.semantic.motion.fluent}`,

  vars: {
    [labelColorVar]: vars.color.semantic.object.bolder,
  },
  "@media": {
    "(hover: hover) and (pointer: fine)": {
      selectors: {
        [`${root}:hover:not([data-readonly]):not([data-disabled]) &`]: {
          textDecorationColor: "currentColor",
        },
      },
    },
  },
  selectors: {
    // readonly/disabled 상태에서는 선택 중에도 밑줄이 드러나지 않도록 제거한다.
    [`${root}[data-readonly] &, ${root}[data-disabled] &`]: {
      textDecorationLine: "none",
    },
    [`${root}[data-disabled] &`]: {
      vars: {
        [labelColorVar]: vars.color.semantic.object.subtle,
      },
    },
  },
});

export const readonly = style({
  cursor: "text",
});

export const disabled = style({
  cursor: "not-allowed",
});

export const fileSize = style({
  flexShrink: 0,
  cursor: "inherit",
  vars: {
    [labelColorVar]: vars.color.semantic.object.alternative,
  },
  selectors: {
    [`${root}[data-disabled] &`]: {
      vars: {
        [labelColorVar]: vars.color.semantic.object.subtle,
      },
    },
  },
});

export const removeButton = style({
  position: "relative",
  zIndex: 1,
  vars: {
    [iconButtonAccentColor]: vars.color.semantic.object.alternative,
  },
});
