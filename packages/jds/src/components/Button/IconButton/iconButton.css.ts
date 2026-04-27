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

// `as const`로 literal narrowing 필요 — vanilla-extract의 StyleRule은
// boxSizing/cursor 등이 literal union 타입이라 widened string은 거부됨
const baseStyles = {
  // overlay/focusRing의 ::before/::after를 absolute로 위치시키기 위해 호출자(여기)가 명시
  // (outline: none은 focusRing 유틸이 자체 책임)
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

/**
 * accent를 제외한 hierarchy(primary / secondary / tertiary)는 글자 색만 다르고
 * overlay 색상과 disabled 색상은 모두 공유한다
 */
const neutralHierarchy = (color: string) => ({
  color,
  vars: { [overlayColor]: vars.color.semantic.interaction.normal },
  selectors: {
    "&[data-disabled]": { color: vars.color.semantic.object.subtle },
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

/**
 * condensed=true: 시각적 버튼 외경 = 아이콘 크기, ::before/::after로 탭 영역만 외부로 확장
 * (시각적 직관성 보강용)
 */
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

/**
 * condensed=false: 아이콘 주위에 padding을 두어 버튼 외경 자체가 커짐
 * (::before/::after는 compoundVariants의 elementMatchingPseudoShape로 element 외경에 정렬)
 */
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

const sizeKeys = Object.keys(sizeVariants) as SizeKey[];

/**
 * condensed=false에서 ::before/::after는 element 외경(=탭 영역)을 따라간다 (size 무관)
 */
const elementMatchingPseudoShape = { inset: 0, borderRadius: "inherit" } as const;

/**
 * size × condensed 매트릭스 스타일
 * - condensed=true: padding 0 + ::before/::after에 같은 음수 inset (focus ring과 overlay 둘 다 탭 영역 공유)
 * - condensed=false: 사이즈별 padding + radius로 element 자체를 확장. ::before/::after는 element 외경을 따라감
 *
 * focus ring과 overlay가 모두 같은 shape를 공유하므로 condensed 모드에서도
 * focus ring이 *탭 영역*에 정확히 그려진다 (a11y 정합성)
 */
const sizeCondensedCompoundVariants = [
  {
    variants: { condensed: false } as const,
    style: {
      selectors: {
        "&::before": elementMatchingPseudoShape,
        "&::after": elementMatchingPseudoShape,
      },
    },
  },
  ...sizeKeys.map(size => {
    const overlayShape = tapAreaInsetBySize[size];
    return {
      variants: { size, condensed: true } as const,
      style: {
        padding: 0,
        borderRadius: 0,
        selectors: {
          "&::before": overlayShape,
          "&::after": overlayShape,
        },
      },
    };
  }),
  ...sizeKeys.map(size => ({
    variants: { size, condensed: false } as const,
    style: paddingGeometryBySize[size],
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
      primary: neutralHierarchy(vars.color.semantic.object.boldest),
      secondary: neutralHierarchy(vars.color.semantic.object.neutral),
      tertiary: neutralHierarchy(vars.color.semantic.object.alternative),
    },
    size: sizeVariants,
    // size × condensed 매트릭스를 compoundVariants로 표현하기 위한 placeholder
    // 실제 스타일은 sizeCondensedCompoundVariants에서 결정된다
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
    // 디자인 결정이 내려지면 이 값을 갱신
    condensed: true,
  },
});
