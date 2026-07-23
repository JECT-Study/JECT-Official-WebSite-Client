import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor, overlayColorMap, pxToRem } from "utils";

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
    overlay({ density: "normal", interaction: "delegated" }),
    focusRing({ interaction: "delegated" }),
    {
      position: "relative",
      display: "inline-flex",
      flexDirection: "row",
      flexShrink: 0,
      width: "fit-content",
      alignItems: "center",
      boxSizing: "border-box",
      gap: vars.scheme.semantic.spacing["4"],
      paddingBlock: vars.scheme.semantic.spacing["4"],
      paddingInline: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["8"]}`,
      border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${chipColorVars.border}`,
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
        "&::before, &::after": {
          inset: 0,
          borderRadius: "inherit",
        },
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
          [overlayColor]: overlayColorMap.accent,
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        vars: {
          [chipColorVars.label]: vars.color.semantic.object.subtler,
          [chipColorVars.icon]: vars.color.semantic.object.subtler,
          [chipColorVars.background]: "transparent",
          [chipColorVars.divider]: vars.color.semantic.stroke.alpha.subtle,
        },
      },
      false: {
        cursor: "pointer",
      },
    },
  },
  compoundVariants: [
    {
      variants: { activated: false, disabled: true },
      style: {
        vars: {
          [chipColorVars.border]: vars.color.semantic.stroke.alpha.subtler,
        },
      },
    },
    {
      variants: { activated: true, disabled: true },
      style: {
        vars: {
          [chipColorVars.border]: vars.color.semantic.accent.alpha.subtler,
        },
      },
    },
  ],
});

export const mainAction = style({
  display: "inline-flex",
  alignItems: "center",
  minWidth: 0,
  gap: vars.scheme.semantic.spacing["6"],
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "inherit",
  cursor: "inherit",
  font: "inherit",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: vars.scheme.semantic.radius.max,
    },
  },
});

export const label = style({
  flexShrink: 0,
  whiteSpace: "nowrap",
  vars: {
    [labelColorVar]: chipColorVars.label,
  },
  selectors: {
    "&&": {
      cursor: "inherit",
    },
  },
});

export const valueLabel = style({
  minWidth: 0,
  maxWidth: pxToRem(160),
  vars: {
    [labelColorVar]: chipColorVars.label,
  },
  selectors: {
    "&&": {
      cursor: "inherit",
    },
  },
});

export const valueLabelText = style({
  display: "block",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const dividerWrapper = style({
  display: "inline-flex",
  flexShrink: 0,
  height: pxToRem(12),
  vars: {
    [dividerColorVar]: chipColorVars.divider,
  },
});

export const removeButton = style({
  position: "relative",
  zIndex: 1,
  vars: {
    [iconButtonAccentColor]: chipColorVars.icon,
    [iconButtonAccentDisabledColor]: chipColorVars.icon,
  },
});
