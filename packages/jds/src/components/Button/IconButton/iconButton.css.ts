import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../tokens/vars.css";
import { pxToRem } from "../../../utils/cssUnit";
import { focusRing } from "../../../utils/focusRing.css";
import { overlay, overlayColor } from "../../../utils/overlay.css";

/**
 * @description
 * hierarchy="accent"일 때 색상을 외부에서 덮어쓰기 위한 CSS variable
 *
 * `feedback` (positive / destructive) 같은 사용처별 프리셋은 DS 안에 두지 않고,
 * 도메인 레이어에서 이 var를 inline으로 할당해 만든다.
 *
 * @example
 *   <IconButton hierarchy="accent" style={assignInlineVars({
 *     [iconButtonAccentColor]: vars.color.semantic.feedback.destructive.normal,
 *     [iconButtonAccentDisabledColor]: vars.color.semantic.feedback.destructive.alpha.subtle,
 *   })} />
 */
export const iconButtonAccentColor = createVar();
export const iconButtonAccentDisabledColor = createVar();

const baseStyles = {
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  userSelect: "none",
  flexShrink: 0,
  boxSizing: "content-box",
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
  },
} as const;

const sizeVariants = {
  "3xl": { width: pxToRem(32), height: pxToRem(32) },
  "2xl": { width: pxToRem(28), height: pxToRem(28) },
  xl: { width: pxToRem(24), height: pxToRem(24) },
  lg: { width: pxToRem(20), height: pxToRem(20) },
  md: { width: pxToRem(18), height: pxToRem(18) },
  sm: { width: pxToRem(16), height: pxToRem(16) },
  xs: { width: pxToRem(14), height: pxToRem(14) },
  "2xs": { width: pxToRem(12), height: pxToRem(12) },
} as const;

const condensedTrueOffset: Record<
  keyof typeof sizeVariants,
  { inset: string; borderRadius: string }
> = {
  "3xl": { inset: pxToRem(-4), borderRadius: "4px" },
  "2xl": { inset: pxToRem(-4), borderRadius: "4px" },
  xl: { inset: pxToRem(-3), borderRadius: "4px" },
  lg: { inset: pxToRem(-3), borderRadius: "4px" },
  md: { inset: pxToRem(-2), borderRadius: "2px" },
  sm: { inset: pxToRem(-2), borderRadius: "2px" },
  xs: { inset: pxToRem(-1), borderRadius: "2px" },
  "2xs": { inset: pxToRem(-1), borderRadius: "2px" },
};

const condensedFalseGeometry: Record<
  keyof typeof sizeVariants,
  { padding: string; borderRadius: string }
> = {
  "3xl": {
    padding: vars.scheme.semantic.spacing["8"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  "2xl": {
    padding: vars.scheme.semantic.spacing["8"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  xl: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  lg: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  md: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  sm: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  xs: {
    padding: vars.scheme.semantic.spacing["4"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  "2xs": {
    padding: vars.scheme.semantic.spacing["4"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
};

const sizeKeys = Object.keys(sizeVariants) as (keyof typeof sizeVariants)[];

const condensedCompoundVariants = [
  ...sizeKeys.map(size => ({
    variants: { size, condensed: true } as const,
    style: {
      padding: 0,
      borderRadius: 0,
      selectors: {
        "&::before": {
          inset: condensedTrueOffset[size].inset,
          borderRadius: condensedTrueOffset[size].borderRadius,
        },
        "&::after": {
          inset: condensedTrueOffset[size].inset,
          borderRadius: condensedTrueOffset[size].borderRadius,
        },
      },
    },
  })),
  ...sizeKeys.map(size => ({
    variants: { size, condensed: false } as const,
    style: {
      padding: condensedFalseGeometry[size].padding,
      borderRadius: condensedFalseGeometry[size].borderRadius,
    },
  })),
];

export const iconButton = recipe({
  base: [overlay, focusRing, baseStyles],
  variants: {
    hierarchy: {
      accent: {
        color: fallbackVar(iconButtonAccentColor, vars.color.semantic.accent.normal),
        vars: {
          [overlayColor]: fallbackVar(iconButtonAccentColor, vars.color.semantic.accent.normal),
        },
        selectors: {
          "&[data-disabled]": {
            color: fallbackVar(
              iconButtonAccentDisabledColor,
              vars.color.semantic.accent.alpha.subtle,
            ),
          },
        },
      },
      primary: {
        color: vars.color.semantic.object.boldest,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
      secondary: {
        color: vars.color.semantic.object.neutral,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
      tertiary: {
        color: vars.color.semantic.object.alternative,
        vars: { [overlayColor]: vars.color.semantic.interaction.normal },
        selectors: {
          "&[data-disabled]": { color: vars.color.semantic.object.subtle },
        },
      },
    },
    size: sizeVariants,
    condensed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: condensedCompoundVariants,
  defaultVariants: {
    hierarchy: "primary",
    size: "md",
    // TODO: Figma에 명시된 default가 없어 현재 동작(condensed=true)을 그대로 유지
    // 디자인 결정이 내려지면 이 값을 갱신
    condensed: true,
  },
});
