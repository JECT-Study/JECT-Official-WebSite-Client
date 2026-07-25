import { createVar, style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem, overlay } from "utils";

import { RADIO_SIZE_OPTIONS } from "./radio.types";
import type { RadioSize } from "./radio.types";

import { labelColorVar } from "@/utils/typography.css";

type StrokeWeightKey = keyof typeof vars.scheme.semantic.strokeWeight;

const radioSizeMap: Record<RadioSize, { sizeRem: string; borderKey: StrokeWeightKey }> = {
  lg: { sizeRem: pxToRem(20), borderKey: "6" },
  md: { sizeRem: pxToRem(18), borderKey: "5" },
  sm: { sizeRem: pxToRem(16), borderKey: "5" },
  xs: { sizeRem: pxToRem(14), borderKey: "4" },
};

export const radioGroupColumnsVar = createVar();

export const radioGroupWrapper = recipe({
  variants: {
    layout: {
      vertical: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: vars.scheme.semantic.spacing["12"],
      },
      grid: {
        display: "grid",
        width: "100%",
        gridTemplateColumns: `repeat(${radioGroupColumnsVar}, minmax(0, 1fr))`,
        justifyItems: "start",
        gap: vars.scheme.semantic.spacing["10"],
      },
    },
  },
  defaultVariants: { layout: "vertical" },
});

// Radio.Indicator
const ancestorCheckedEnabled = '[role="radio"][data-state="checked"]:not([data-disabled]) &';
const ancestorUncheckedDisabled = '[role="radio"][data-disabled][data-state="unchecked"] &';
const ancestorCheckedDisabled = '[role="radio"][data-disabled][data-state="checked"] &';
const selfCheckedEnabled = '&[data-state="checked"]:not([data-disabled])';
const selfUncheckedDisabled = '&[data-disabled][data-state="unchecked"]';
const selfCheckedDisabled = '&[data-disabled][data-state="checked"]';

const baseCheckedEnabledStyle = {
  backgroundColor: vars.color.semantic.surface.static.standard,
} satisfies StyleRule;
const baseUncheckedDisabledStyle = {
  backgroundColor: vars.color.semantic.surface.standard,
  borderColor: vars.color.semantic.stroke.alpha.subtle,
} satisfies StyleRule;
const baseCheckedDisabledStyle = {
  backgroundColor: vars.color.semantic.fill.subtlest,
} satisfies StyleRule;

const makeSizeVariant = (size: RadioSize) => {
  const borderChecked = `${vars.scheme.semantic.strokeWeight[radioSizeMap[size].borderKey]} solid ${vars.color.semantic.accent.neutral}`;
  const borderCheckedDisabled = `${vars.scheme.semantic.strokeWeight[radioSizeMap[size].borderKey]} solid ${vars.color.semantic.stroke.alpha.subtle}`;

  return {
    width: radioSizeMap[size].sizeRem,
    height: radioSizeMap[size].sizeRem,
    selectors: {
      [ancestorCheckedEnabled]: { border: borderChecked },
      [selfCheckedEnabled]: { border: borderChecked },
      [ancestorCheckedDisabled]: { border: borderCheckedDisabled },
      [selfCheckedDisabled]: { border: borderCheckedDisabled },
    },
  };
};

export const radioVisual = recipe({
  base: {
    flexShrink: 0,
    boxSizing: "border-box",
    borderRadius: vars.scheme.semantic.radius.max,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: vars.color.semantic.surface.shallow,
    selectors: {
      [ancestorCheckedEnabled]: baseCheckedEnabledStyle,
      [selfCheckedEnabled]: baseCheckedEnabledStyle,
      [ancestorUncheckedDisabled]: baseUncheckedDisabledStyle,
      [selfUncheckedDisabled]: baseUncheckedDisabledStyle,
      [ancestorCheckedDisabled]: baseCheckedDisabledStyle,
      [selfCheckedDisabled]: baseCheckedDisabledStyle,
    },
  },
  variants: {
    size: {
      lg: makeSizeVariant("lg"),
      md: makeSizeVariant("md"),
      sm: makeSizeVariant("sm"),
      xs: makeSizeVariant("xs"),
    } satisfies Record<RadioSize, StyleRule>,
  },
});

// Radio.Item
const itemSizeVariants = {
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
} satisfies Record<RadioSize, StyleRule>;

const itemInsetBySize: Record<RadioSize, string> = {
  lg: `${pxToRem(-4)} ${pxToRem(-8)}`,
  md: `${pxToRem(-4)} ${pxToRem(-8)}`,
  sm: `${pxToRem(-4)} ${pxToRem(-6)}`,
  xs: `${pxToRem(-3)} ${pxToRem(-6)}`,
};

const itemOutlinedPaddingBySize: Record<RadioSize, string> = {
  lg: `${vars.scheme.semantic.spacing["10"]} ${vars.scheme.semantic.spacing["12"]}`,
  md: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["10"]}`,
  sm: `${vars.scheme.semantic.spacing["6"]} ${vars.scheme.semantic.spacing["8"]}`,
  xs: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["6"]}`,
};

const expansionCompoundVariants = RADIO_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "hollow" as const },
  style: {
    selectors: {
      "&::before, &::after": { inset: itemInsetBySize[size] },
    },
  },
}));

const outlinedPaddingCompoundVariants = RADIO_SIZE_OPTIONS.map(size => ({
  variants: { size, styleOutlined: "outlined" as const },
  style: { padding: itemOutlinedPaddingBySize[size] },
}));

const radioItemGrid = style({
  display: "inline-grid",
  gridTemplateColumns: "auto minmax(0, 1fr)",
  alignItems: "start",
  maxWidth: "100%",
});

const buttonReset = style({
  appearance: "none",
  margin: 0,
  padding: 0,
  font: "inherit",
  color: "inherit",
  textAlign: "left",
  backgroundColor: "transparent",
  cursor: "pointer",
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
  },
});

export const radioIndicatorSlot = style({ gridColumn: "1", gridRow: "1", marginTop: pxToRem(1) });
export const radioLabelSlot = style({
  gridColumn: "2",
  gridRow: "1",
  display: "flex",
  alignItems: "center",
});
export const radioHelperSlot = style({ gridColumn: "2", gridRow: "2" });

export const radioItem = recipe({
  base: [
    radioItemGrid,
    buttonReset,
    overlay(),
    {
      position: "relative",
      selectors: {
        "&::before, &::after": { inset: 0, borderRadius: "inherit" },
      },
    },
  ],
  variants: {
    size: itemSizeVariants satisfies Record<RadioSize, StyleRule>,
    styleOutlined: {
      outlined: {
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
        selectors: {
          "&[data-disabled]": { borderColor: vars.color.semantic.stroke.alpha.subtler },
          "&::after": { border: "inherit" },
        },
      },
      hollow: { border: "none", padding: 0 },
    },
    stretched: {
      true: {
        display: "grid",
        width: "100%",
      },
    },
  },
  compoundVariants: [...expansionCompoundVariants, ...outlinedPaddingCompoundVariants],
});

export const radioLabel = style({
  vars: { [labelColorVar]: vars.color.semantic.object.bolder },
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
  },
});

export const radioHelper = style({
  vars: { [labelColorVar]: vars.color.semantic.object.alternative },
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
  },
});
