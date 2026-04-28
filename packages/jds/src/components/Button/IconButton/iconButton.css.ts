import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../tokens/vars.css";
import { pxToRem } from "../../../utils/cssUnit";
import { focusRing } from "../../../utils/focusRing.css";
import { overlay, overlayColor } from "../../../utils/overlay.css";

const iconButtonIconColor = createVar();

/**
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
  position: "relative",
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

const neutralHierarchy = (color: string) => ({
  vars: {
    [iconButtonIconColor]: color,
    [overlayColor]: vars.color.semantic.interaction.normal,
  },
  selectors: {
    "&[data-disabled]": {
      vars: { [iconButtonIconColor]: vars.color.semantic.object.subtle },
    },
  },
});

const sizeVariants = {
  "2xs": { width: pxToRem(12), height: pxToRem(12) },
  xs: { width: pxToRem(14), height: pxToRem(14) },
  sm: { width: pxToRem(16), height: pxToRem(16) },
  md: { width: pxToRem(18), height: pxToRem(18) },
  lg: { width: pxToRem(20), height: pxToRem(20) },
  xl: { width: pxToRem(24), height: pxToRem(24) },
  "2xl": { width: pxToRem(28), height: pxToRem(28) },
  "3xl": { width: pxToRem(32), height: pxToRem(32) },
};

type SizeKey = keyof typeof sizeVariants;
type TapAreaShape = { inset: string; borderRadius: string };
type PaddingGeometry = { padding: string; borderRadius: string };

const tapAreaInsetBySize: Record<SizeKey, TapAreaShape> = {
  "2xs": { inset: pxToRem(-1), borderRadius: vars.scheme.semantic.radius["2"] },
  xs: { inset: pxToRem(-1), borderRadius: vars.scheme.semantic.radius["2"] },
  sm: { inset: pxToRem(-2), borderRadius: vars.scheme.semantic.radius["2"] },
  md: { inset: pxToRem(-2), borderRadius: vars.scheme.semantic.radius["2"] },
  lg: { inset: pxToRem(-3), borderRadius: vars.scheme.semantic.radius["4"] },
  xl: { inset: pxToRem(-3), borderRadius: vars.scheme.semantic.radius["4"] },
  "2xl": { inset: pxToRem(-4), borderRadius: vars.scheme.semantic.radius["4"] },
  "3xl": { inset: pxToRem(-4), borderRadius: vars.scheme.semantic.radius["4"] },
};

const paddingGeometryBySize: Record<SizeKey, PaddingGeometry> = {
  "2xs": {
    padding: vars.scheme.semantic.spacing["4"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  xs: {
    padding: vars.scheme.semantic.spacing["4"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  sm: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  md: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  lg: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["4"],
  },
  xl: {
    padding: vars.scheme.semantic.spacing["6"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  "2xl": {
    padding: vars.scheme.semantic.spacing["8"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
  "3xl": {
    padding: vars.scheme.semantic.spacing["8"],
    borderRadius: vars.scheme.semantic.radius["6"],
  },
};

const elementMatchingPseudoShape = { inset: 0, borderRadius: "inherit" } as const;

const sizeKeys = Object.keys(sizeVariants) as SizeKey[];

const sizeCondensedCompoundVariants = sizeKeys.flatMap(size => [
  {
    variants: { size, condensed: true } as const,
    style: {
      padding: 0,
      borderRadius: 0,
      selectors: {
        "&::before, &::after": tapAreaInsetBySize[size],
      },
    },
  },
  {
    variants: { size, condensed: false } as const,
    style: {
      ...paddingGeometryBySize[size],
      selectors: {
        "&::before, &::after": elementMatchingPseudoShape,
      },
    },
  },
]);

export const root = recipe({
  // pseudo-element 정책: ::before=focusRing, ::after=overlay (../../../utils/PSEUDO_ELEMENT_POLICY.md)
  base: [overlay, focusRing, baseStyles],
  variants: {
    hierarchy: {
      accent: {
        vars: {
          [iconButtonIconColor]: fallbackVar(
            iconButtonAccentColor,
            vars.color.semantic.accent.normal,
          ),
          [overlayColor]: fallbackVar(iconButtonAccentColor, vars.color.semantic.accent.normal),
        },
        selectors: {
          "&[data-disabled]": {
            vars: {
              [iconButtonIconColor]: fallbackVar(
                iconButtonAccentDisabledColor,
                vars.color.semantic.accent.alpha.subtle,
              ),
            },
          },
        },
      },
      primary: neutralHierarchy(vars.color.semantic.object.boldest),
      secondary: neutralHierarchy(vars.color.semantic.object.neutral),
      tertiary: neutralHierarchy(vars.color.semantic.object.alternative),
    },
    size: sizeVariants,
    // recipe API 한계: variant를 선언해야 compoundVariants에서 매치 가능
    // 실제 스타일은 sizeCondensedCompoundVariants에서 size × condensed로 결정
    condensed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: sizeCondensedCompoundVariants,
  defaultVariants: {
    hierarchy: "primary",
    size: "md",
    // TODO: Figma에 명시된 default가 없어 현재 동작(condensed=true)을 그대로 유지
    condensed: true,
  },
});

export const icon = style({
  color: iconButtonIconColor,
});
