import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem, overlay, overlayColorMap, overlayOpacityMap } from "utils";

import { CHECKBOX_SIZE_OPTIONS, type CheckboxSize } from "./checkbox.types";

import { labelColorVar } from "@/utils/typography.css";

export const checkboxGroupWrapper = style({ display: "contents" });

const checkboxVisualSizeMap = {
  lg: pxToRem(20),
  md: pxToRem(18),
  sm: pxToRem(16),
  xs: pxToRem(14),
} satisfies Record<CheckboxSize, string>;

// Checkbox.Control
export const checkboxVisual = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    appearance: "none",
    margin: 0,
    padding: 0,
    borderRadius: vars.scheme.semantic.radius["4"],
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: vars.color.semantic.surface.shallow,
    color: "transparent",
    cursor: "pointer",
    position: "relative",
    outline: "none",
    selectors: {
      '&[data-state="checked"]:not([data-disabled])': {
        backgroundColor: vars.color.semantic.accent.neutral,
        border: "none",
        color: vars.color.semantic.object.static.inverse.boldest,
      },
      '&[data-state="indeterminate"]:not([data-disabled])': {
        backgroundColor: vars.color.semantic.accent.neutral,
        border: "none",
        color: vars.color.semantic.object.static.inverse.boldest,
      },
      '&[data-disabled][data-state="unchecked"]': {
        backgroundColor: vars.color.semantic.surface.standard,
        borderColor: vars.color.semantic.stroke.alpha.subtle,
        cursor: "not-allowed",
      },
      '&[data-disabled][data-state="checked"]': {
        backgroundColor: vars.color.semantic.fill.subtlest,
        border: "none",
        color: vars.color.semantic.object.subtle,
        cursor: "not-allowed",
      },
      '&[data-disabled][data-state="indeterminate"]': {
        backgroundColor: vars.color.semantic.fill.subtlest,
        border: "none",
        color: vars.color.semantic.object.subtle,
        cursor: "not-allowed",
      },
      "&[data-invalid]:not([data-disabled])": {
        borderColor: vars.color.semantic.feedback.destructive.neutral,
      },
      "&[data-invalid][data-disabled]": {
        borderColor: vars.color.semantic.feedback.destructive.alpha.subtle,
      },
    },
  },
  variants: {
    size: {
      lg: { width: checkboxVisualSizeMap.lg, height: checkboxVisualSizeMap.lg },
      md: { width: checkboxVisualSizeMap.md, height: checkboxVisualSizeMap.md },
      sm: { width: checkboxVisualSizeMap.sm, height: checkboxVisualSizeMap.sm },
      xs: { width: checkboxVisualSizeMap.xs, height: checkboxVisualSizeMap.xs },
    } satisfies Record<CheckboxSize, object>,
    interaction: {
      on: {
        selectors: {
          "&:not([data-disabled])::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColorMap.primary,
            borderRadius: "inherit",
            opacity: 0,
            pointerEvents: "none",
          },
          "&:not([data-disabled]):active::after": {
            opacity: overlayOpacityMap.normal.pressed,
          },
          "&:focus-visible": {
            boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
          },
          "&[data-invalid]:focus-visible": {
            boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.feedback.destructive.alpha.alternative}`,
          },
        },
        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:not([data-disabled]):hover::after": {
                opacity: overlayOpacityMap.normal.hover,
              },
            },
          },
        },
      },
      off: {},
    },
  },
});

export const checkboxIndicator = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

// Checkbox.Item

const itemInsetBySize: Record<CheckboxSize, string> = {
  lg: `${pxToRem(-4)} ${pxToRem(-8)}`,
  md: `${pxToRem(-4)} ${pxToRem(-8)}`,
  sm: `${pxToRem(-4)} ${pxToRem(-6)}`,
  xs: `${pxToRem(-3)} ${pxToRem(-6)}`,
};

const itemOutlinedPaddingBySize: Record<CheckboxSize, string> = {
  lg: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
  md: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["10"]}`,
  sm: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
  xs: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["6"]}`,
};

const expansionCompoundVariants = CHECKBOX_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "hollow" as const },
  style: {
    selectors: {
      "&::before, &::after": { inset: itemInsetBySize[size] },
    },
  },
}));

const outlinedPaddingCompoundVariants = CHECKBOX_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "outlined" as const },
  style: { padding: itemOutlinedPaddingBySize[size] },
}));

const checkboxItemGrid = style({
  display: "inline-grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
});

export const checkboxControlSlot = style({ gridColumn: "1", gridRow: "1", alignItems: "center" });
export const checkboxLabelSlot = style({
  gridColumn: "2",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
});
export const checkboxHelperSlot = style({ gridColumn: "2", gridRow: "2" });

export const checkboxItem = recipe({
  base: [
    // focus ring은 invalid 상태에서 색이 달라지므로 Checkbox.tsx에서 focusRing({ feedback })으로 부여한다.
    checkboxItemGrid,
    overlay(),
    {
      position: "relative",
      selectors: {
        "&::before, &::after": { inset: 0, borderRadius: "inherit" },
      },
    },
  ],
  variants: {
    size: {
      lg: {
        gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["12"]}`,
        borderRadius: vars.scheme.semantic.radius["6"],
      },
      md: {
        gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["10"]}`,
        borderRadius: vars.scheme.semantic.radius["6"],
      },
      sm: {
        gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
        borderRadius: vars.scheme.semantic.radius["4"],
      },
      xs: {
        gap: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
        borderRadius: vars.scheme.semantic.radius["4"],
      },
    } satisfies Record<CheckboxSize, object>,
    styleOutlined: {
      outlined: {
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
        selectors: {
          "&[data-disabled]": { borderColor: vars.color.semantic.stroke.alpha.subtler },
          "&[data-invalid]": {
            borderColor: vars.color.semantic.feedback.destructive.neutral,
          },
          "&[data-invalid][data-disabled]": {
            borderColor: vars.color.semantic.feedback.destructive.alpha.subtle,
          },
          "&::after": { border: "inherit" },
        },
      },
      hollow: { border: "none", padding: 0 },
    },
  },
  compoundVariants: [...expansionCompoundVariants, ...outlinedPaddingCompoundVariants],
});

// Checkbox.Label / Checkbox.Helper
// disabled 및 invalid 색상은 조상의 data attribute로 제어한다.

export const checkboxLabel = style({
  whiteSpace: "nowrap",
  zIndex: 10,
  vars: { [labelColorVar]: vars.color.semantic.object.bolder },
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
  },
});

export const checkboxHelper = style({
  whiteSpace: "nowrap",
  vars: { [labelColorVar]: vars.color.semantic.object.alternative },
  position: "relative",
  zIndex: 10,
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
    "[data-invalid] &": {
      vars: { [labelColorVar]: vars.color.semantic.feedback.destructive.normal },
    },
    "[data-invalid][data-disabled] &": {
      vars: { [labelColorVar]: vars.color.semantic.feedback.destructive.alpha.assistive },
    },
  },
});
