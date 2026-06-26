import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { focusRing, overlay, overlayColor } from "utils";

import {
  ICON_BUTTON_SIZE_OPTIONS,
  type IconButtonHierarchy,
  type IconButtonSize,
} from "./iconButton.types";

const iconButtonIconColor = createVar();

/**
 * `hierarchy="accent"`의 색을 외부에서 덮는 CSS 변수. feedback(positive/destructive)
 * 같은 프리셋은 DS에 두지 않고 도메인 레이어에서 이 변수로 만든다.
 *
 * 둘은 한 쌍이다. `iconButtonAccentColor`만 덮고 `iconButtonAccentDisabledColor`를
 * 빠뜨리면 disabled 색이 기본 accent의 alpha로 남으므로 함께 지정한다.
 *
 * @example
 *   <IconButton hierarchy="accent" style={assignInlineVars({
 *     [iconButtonAccentColor]: vars.color.semantic.feedback.destructive.normal,
 *     [iconButtonAccentDisabledColor]: vars.color.semantic.feedback.destructive.alpha.subtle,
 *   })} />
 */
export const iconButtonAccentColor = createVar();
export const iconButtonAccentDisabledColor = createVar();

const baseStyles = style({
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
});

const neutralHierarchy = (color: string) => ({
  vars: {
    [iconButtonIconColor]: color,
    [overlayColor]: vars.color.semantic.object.neutral,
  },
  selectors: {
    "&[data-disabled]": {
      vars: { [iconButtonIconColor]: vars.color.semantic.object.subtle },
    },
  },
});

const sizeVariants: Record<IconButtonSize, { width: string; height: string }> = {
  "2xs": { width: "12px", height: "12px" },
  xs: { width: "14px", height: "14px" },
  sm: { width: "16px", height: "16px" },
  md: { width: "18px", height: "18px" },
  lg: { width: "20px", height: "20px" },
  xl: { width: "24px", height: "24px" },
  "2xl": { width: "28px", height: "28px" },
  "3xl": { width: "32px", height: "32px" },
};

type TapAreaShape = { inset: string; borderRadius: string };
type PaddingGeometry = { padding: string; borderRadius: string };

const tapAreaInsetBySize: Record<IconButtonSize, TapAreaShape> = {
  "2xs": { inset: "-1px", borderRadius: vars.scheme.semantic.radius["2"] },
  xs: { inset: "-1px", borderRadius: vars.scheme.semantic.radius["2"] },
  sm: { inset: "-2px", borderRadius: vars.scheme.semantic.radius["2"] },
  md: { inset: "-2px", borderRadius: vars.scheme.semantic.radius["2"] },
  lg: { inset: "-3px", borderRadius: vars.scheme.semantic.radius["4"] },
  xl: { inset: "-3px", borderRadius: vars.scheme.semantic.radius["4"] },
  "2xl": { inset: "-4px", borderRadius: vars.scheme.semantic.radius["4"] },
  "3xl": { inset: "-4px", borderRadius: vars.scheme.semantic.radius["4"] },
};

const paddingGeometryBySize: Record<IconButtonSize, PaddingGeometry> = {
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

const sizeCondensedCompoundVariants = ICON_BUTTON_SIZE_OPTIONS.flatMap(size => [
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
  base: [overlay(), focusRing(), baseStyles],
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
    } satisfies Record<IconButtonHierarchy, unknown>,
    size: sizeVariants,
    // recipe API 한계: variant를 선언해야 compoundVariants에서 매치 가능
    // 실제 스타일은 sizeCondensedCompoundVariants에서 size × condensed로 결정
    condensed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: sizeCondensedCompoundVariants,
});

export const icon = style({
  color: iconButtonIconColor,
});
