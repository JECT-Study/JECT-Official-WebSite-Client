import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, pxToRem } from "utils";

import {
  iconButtonAccentColor,
  iconButtonAccentDisabledColor,
} from "../Button/IconButton/iconButton.css";
import { dividerColorVar } from "../Divider";

import { labelColorVar } from "@/utils/typography.css";

const chipColorVars = {
  label: createVar(),
  icon: createVar(),
  border: createVar(),
  background: createVar(),
  divider: createVar(),
} as const;

export const root = recipe({
  base: [
    overlay({ hierarchy: "primary", density: "normal" }),
    focusRing(),
    {
      position: "relative",
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      gap: vars.scheme.semantic.spacing["4"],
      boxSizing: "border-box",
      width: "fit-content",
      paddingTop: vars.scheme.semantic.spacing["4"],
      paddingRight: vars.scheme.semantic.spacing["8"],
      paddingBottom: vars.scheme.semantic.spacing["4"],
      paddingLeft: vars.scheme.semantic.spacing["10"],
      borderStyle: "solid",
      borderWidth: vars.scheme.semantic.strokeWeight["1"],
      borderColor: chipColorVars.border,
      borderRadius: vars.scheme.semantic.radius.max,
      backgroundColor: chipColorVars.background,
      whiteSpace: "nowrap",
      vars: {
        [chipColorVars.label]: vars.color.semantic.object.bold,
        [chipColorVars.icon]: vars.color.semantic.object.neutral,
        [chipColorVars.border]: vars.color.semantic.stroke.alpha.subtle,
        [chipColorVars.background]: "transparent",
        [chipColorVars.divider]: vars.color.semantic.stroke.alpha.alternative,
      },
      selectors: {
        "&::before, &::after": { inset: 0, borderRadius: "inherit" },
        "&[data-disabled][data-focus-visible]::before": { boxShadow: "none" },
      },
    },
  ],
  variants: {
    activated: {
      true: {
        vars: {
          [chipColorVars.label]: vars.color.semantic.accent.bold,
          [chipColorVars.icon]: vars.color.semantic.accent.normal,
          [chipColorVars.border]: vars.color.semantic.accent.alpha.neutral,
          [chipColorVars.background]: vars.color.semantic.accent.alpha.subtlest,
          [chipColorVars.divider]: vars.color.semantic.accent.alpha.assistive,
        },
      },
      false: {
        vars: {
          [chipColorVars.label]: vars.color.semantic.object.bold,
          [chipColorVars.icon]: vars.color.semantic.object.neutral,
          [chipColorVars.border]: vars.color.semantic.stroke.alpha.subtle,
          [chipColorVars.background]: "transparent",
          [chipColorVars.divider]: vars.color.semantic.stroke.alpha.alternative,
        },
      },
    },
    disabled: {
      true: { cursor: "not-allowed" },
      false: { cursor: "pointer" },
    },
  },
  compoundVariants: [
    {
      variants: { activated: false, disabled: true },
      style: {
        vars: {
          [chipColorVars.label]: vars.color.semantic.object.subtler,
          [chipColorVars.icon]: vars.color.semantic.object.subtler,
          [chipColorVars.border]: vars.color.semantic.stroke.alpha.subtler,
          [chipColorVars.background]: "transparent",
          [chipColorVars.divider]: vars.color.semantic.stroke.alpha.subtle,
        },
      },
    },
    {
      variants: { activated: true, disabled: true },
      style: {
        vars: {
          [chipColorVars.label]: vars.color.semantic.object.subtler,
          [chipColorVars.icon]: vars.color.semantic.object.subtler,
          [chipColorVars.border]: vars.color.semantic.accent.alpha.subtler,
          [chipColorVars.background]: "transparent",
          [chipColorVars.divider]: vars.color.semantic.stroke.alpha.subtle,
        },
      },
    },
  ],
});

export const contentButton = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  flexShrink: 0,
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["6"],
  padding: 0,
  border: "none",
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
  selectors: {
    "&[disabled]": {
      cursor: "not-allowed",
    },
  },
});

export const label = style({
  minWidth: 0,
  vars: {
    [labelColorVar]: chipColorVars.label,
  },
  selectors: {
    "&&": { cursor: "inherit" },
  },
});

export const dividerWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  height: pxToRem(12),
});

export const divider = style({
  flexShrink: 0,
  height: "100%",
  alignSelf: "center",
  vars: {
    [dividerColorVar]: chipColorVars.divider,
  },
});

export const closeButton = style({
  vars: {
    [iconButtonAccentColor]: chipColorVars.icon,
    [iconButtonAccentDisabledColor]: chipColorVars.icon,
  },
});
