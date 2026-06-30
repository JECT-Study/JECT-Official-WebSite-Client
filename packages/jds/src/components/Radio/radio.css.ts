import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem, overlay, overlayColorMap, overlayOpacityMap } from "utils";

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

export const radioGroupWrapper = style({ display: "contents" });

export const radioInput = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

export const radioControlRoot = style({
  display: "inline-flex",
  position: "relative",
});

export const radioVisual = recipe({
  base: {
    flexShrink: 0,
    borderRadius: vars.scheme.semantic.radius.max,
    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.alpha.assistive}`,
    backgroundColor: vars.color.semantic.surface.shallow,
    cursor: "pointer",
    position: "relative",
    outline: "none",
    selectors: {
      'input[type="radio"]:not(:disabled):checked + &': {
        backgroundColor: vars.color.semantic.surface.static.standard,
      },
      'input[type="radio"]:not(:checked):disabled + &': {
        backgroundColor: vars.color.semantic.surface.standard,
        borderColor: vars.color.semantic.stroke.alpha.subtle,
        cursor: "not-allowed",
      },
      'input[type="radio"]:checked:disabled + &': {
        backgroundColor: vars.color.semantic.fill.subtlest,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      lg: {
        width: radioSizeMap.lg.sizeRem,
        height: radioSizeMap.lg.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.lg.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.lg.borderKey]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
          },
        },
      },
      md: {
        width: radioSizeMap.md.sizeRem,
        height: radioSizeMap.md.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.md.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.md.borderKey]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
          },
        },
      },
      sm: {
        width: radioSizeMap.sm.sizeRem,
        height: radioSizeMap.sm.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.sm.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.sm.borderKey]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
          },
        },
      },
      xs: {
        width: radioSizeMap.xs.sizeRem,
        height: radioSizeMap.xs.sizeRem,
        selectors: {
          'input[type="radio"]:not(:disabled):checked + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.xs.borderKey]} solid ${vars.color.semantic.accent.neutral}`,
          },
          'input[type="radio"]:checked:disabled + &': {
            border: `${vars.scheme.semantic.strokeWeight[radioSizeMap.xs.borderKey]} solid ${vars.color.semantic.stroke.alpha.subtle}`,
          },
        },
      },
    } satisfies Record<RadioSize, unknown>,
    interaction: {
      on: {
        selectors: {
          'input[type="radio"]:not(:disabled) + &::after': {
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
          'input[type="radio"]:not(:disabled) + &:hover::after': {
            opacity: overlayOpacityMap.normal.hover,
          },
          'input[type="radio"]:not(:disabled) + &:active::after': {
            opacity: overlayOpacityMap.normal.pressed,
          },
          'input[type="radio"]:focus-visible + &': {
            boxShadow: `0 0 0 ${vars.scheme.semantic.strokeWeight["2"]} ${vars.color.semantic.accent.alpha.alternative}`,
          },
        },
      },
      off: {},
    },
  },
});

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
} satisfies Record<RadioSize, object>;

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
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
});

export const radioControlSlot = style({ gridColumn: "1", gridRow: "1", alignItems: "center" });
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
    overlay(),
    {
      position: "relative",
      selectors: {
        "&::before, &::after": { inset: 0, borderRadius: "inherit" },
      },
    },
  ],
  variants: {
    size: itemSizeVariants satisfies Record<RadioSize, unknown>,
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
  },
  compoundVariants: [...expansionCompoundVariants, ...outlinedPaddingCompoundVariants],
});

export const radioLabel = style({
  whiteSpace: "nowrap",
  zIndex: 10,
  vars: { [labelColorVar]: vars.color.semantic.object.bolder },
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
  },
});

export const radioHelper = style({
  whiteSpace: "nowrap",
  vars: { [labelColorVar]: vars.color.semantic.object.alternative },
  position: "relative",
  zIndex: 10,
  selectors: {
    "[data-disabled] &": { vars: { [labelColorVar]: vars.color.semantic.object.subtle } },
  },
});
