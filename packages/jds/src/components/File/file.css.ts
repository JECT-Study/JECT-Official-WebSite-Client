import { style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { pxToRem } from "utils";

import {
  iconButtonAccentColor,
  iconButtonAccentDisabledColor,
} from "../Button/IconButton/iconButton.css";

import { focusRing } from "@/utils/focusRing.css";
import { overlay } from "@/utils/overlay.css";
import { labelColorVar } from "@/utils/typography.css";

const LAYER_INSET = `${pxToRem(-6)} ${pxToRem(-8)}`;
const LAYER_RADIUS = vars.scheme.semantic.radius["6"];

export const root = style([
  overlay({ hierarchy: "secondary", density: "normal" }),
  focusRing(),
  {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 0,
    gap: vars.scheme.semantic.spacing["8"],
    border: "none",
    borderRadius: LAYER_RADIUS,
    background: "transparent",
    font: "inherit",
    textAlign: "left",
    appearance: "none",
    WebkitAppearance: "none",
    selectors: {
      "&::before, &::after": {
        inset: LAYER_INSET,
        borderRadius: LAYER_RADIUS,
      },
    },
  },
]);

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
    [`${root}[data-file-disabled] &`]: {
      color: vars.color.semantic.object.subtler,
    },
  },
});

export const interactive = style({
  cursor: "pointer",
});

export const fileName = style({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "inherit",
  vars: {
    [labelColorVar]: vars.color.semantic.object.bolder,
  },
  selectors: {
    [`${interactive}:hover &`]: {
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationSkipInk: "auto",
    },
    [`${root}[data-file-disabled] &`]: {
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
  selectors: {
    "&:focus-visible::before": {
      boxShadow: "none",
    },
  },
});

export const fileSize = style({
  flexShrink: 0,
  cursor: "inherit",
  vars: {
    [labelColorVar]: vars.color.semantic.object.alternative,
  },
  selectors: {
    [`${root}[data-file-disabled] &`]: {
      vars: {
        [labelColorVar]: vars.color.semantic.object.subtle,
      },
    },
  },
});

export const removeButton = style({
  vars: {
    [iconButtonAccentColor]: vars.color.semantic.object.alternative,
    [iconButtonAccentDisabledColor]: vars.color.semantic.object.subtler,
  },
});
