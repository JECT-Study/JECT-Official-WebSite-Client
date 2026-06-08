import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { IconSize } from "components";
import { vars } from "tokens";
import { pxToRem, focusRing, overlay, overlayColor } from "utils";

import type { LabelButtonHierarchy, LabelButtonIntent, LabelButtonSize } from "./labelButton.types";

export const iconSizeMap: Record<LabelButtonSize, IconSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

type ColorEntry = { overlayColor: string; color: string; disabledColor: string };

// Overlay colors per hierarchy
const hierarchyColorsByHierarchy = {
  accent: {
    overlayColor: vars.color.semantic.accent.bold,
    color: vars.color.semantic.accent.normal,
    disabledColor: vars.color.semantic.accent.alpha.subtle,
  },
  primary: {
    overlayColor: vars.color.semantic.interaction.bold,
    color: vars.color.semantic.object.bolder,
    disabledColor: vars.color.semantic.object.subtle,
  },
  secondary: {
    overlayColor: vars.color.semantic.interaction.bold,
    color: vars.color.semantic.object.neutral,
    disabledColor: vars.color.semantic.object.subtle,
  },
  tertiary: {
    overlayColor: vars.color.semantic.interaction.bold,
    color: vars.color.semantic.object.alternative,
    disabledColor: vars.color.semantic.object.subtle,
  },
} satisfies Record<LabelButtonHierarchy, ColorEntry>;

// Feedback colors per intent
const feedbackColorsByIntent = {
  positive: {
    overlayColor: vars.color.semantic.feedback.positive.bold,
    color: vars.color.semantic.feedback.positive.normal,
    disabledColor: vars.color.semantic.feedback.positive.alpha.subtle,
  },
  destructive: {
    overlayColor: vars.color.semantic.feedback.destructive.bold,
    color: vars.color.semantic.feedback.destructive.normal,
    disabledColor: vars.color.semantic.feedback.destructive.alpha.subtle,
  },
} satisfies Record<LabelButtonIntent, ColorEntry>;

// Typography per size
const typographyBySize = {
  lg: {
    fontSize: vars.typo.primitive.fontSize.label.lg,
    lineHeight: vars.typo.primitive.font.lineHeight.label.lg,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.lg,
  },
  md: {
    fontSize: vars.typo.primitive.fontSize.label.md,
    lineHeight: vars.typo.primitive.font.lineHeight.label.md,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.md,
  },
  sm: {
    fontSize: vars.typo.primitive.fontSize.label.sm,
    lineHeight: vars.typo.primitive.font.lineHeight.label.sm,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.sm,
  },
  xs: {
    fontSize: vars.typo.primitive.fontSize.label.xs,
    lineHeight: vars.typo.primitive.font.lineHeight.label.xs,
    fontFamily: vars.typo.primitive.typeface.label,
    fontWeight: vars.typo.primitive.fontWeight.label.bold,
    letterSpacing: vars.typo.primitive.font.letterSpacing.label.xs,
  },
} satisfies Record<LabelButtonSize, object>;

// LabelButton은 padding이 0이고 탭 영역이 시각 영역을 초과한다.
// ::before(focusRing)와 ::after(overlay)를 size별로 음수 inset으로 확장한다.
const tapAreaBySize = {
  lg: { inset: `${pxToRem(-4)} ${pxToRem(-8)}`, borderRadius: vars.scheme.semantic.radius["6"] },
  md: { inset: `${pxToRem(-3)} ${pxToRem(-6)}`, borderRadius: vars.scheme.semantic.radius["6"] },
  sm: { inset: `${pxToRem(-2)} ${pxToRem(-4)}`, borderRadius: vars.scheme.semantic.radius["4"] },
  xs: { inset: `${pxToRem(-1)} ${pxToRem(-3)}`, borderRadius: vars.scheme.semantic.radius["4"] },
} satisfies Record<LabelButtonSize, { inset: string; borderRadius: string }>;

// Size variants (typography + ::before/::after 확장 영역을 함께 결정)
// BlockButton과 달리 padding이 0이므로 borderRadius는 tapArea에서만 의미를 가진다.
const sizeVariants = {
  lg: {
    ...typographyBySize.lg,
    selectors: {
      // size별 음수 inset으로 탭/포커스 영역을 시각 영역 밖으로 확장한다.
      "&::before, &::after": tapAreaBySize.lg,
    },
  },
  md: {
    ...typographyBySize.md,
    selectors: { "&::before, &::after": tapAreaBySize.md },
  },
  sm: {
    ...typographyBySize.sm,
    selectors: { "&::before, &::after": tapAreaBySize.sm },
  },
  xs: {
    ...typographyBySize.xs,
    selectors: { "&::before, &::after": tapAreaBySize.xs },
  },
} satisfies Record<LabelButtonSize, object>;

// Base styles
const baseStyles = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  gap: vars.scheme.semantic.spacing["4"],
  border: "none",
  background: "transparent",
  cursor: "pointer",
  userSelect: "none",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
    // inset/borderRadius는 tapArea가 size에 따라 다르므로 base가 아닌 sizeVariants에서 설정
  },
});

// Hierarchy variant styles
// compoundVariants 없이 hierarchy variant에 color까지 포함하며, 항목 수가 적어 인라인 객체로 작성한다.
const hierarchyVariants = {
  accent: {
    vars: { [overlayColor]: hierarchyColorsByHierarchy.accent.overlayColor },
    color: hierarchyColorsByHierarchy.accent.color,
    selectors: { "&[data-disabled]": { color: hierarchyColorsByHierarchy.accent.disabledColor } },
  },
  primary: {
    vars: { [overlayColor]: hierarchyColorsByHierarchy.primary.overlayColor },
    color: hierarchyColorsByHierarchy.primary.color,
    selectors: { "&[data-disabled]": { color: hierarchyColorsByHierarchy.primary.disabledColor } },
  },
  secondary: {
    vars: { [overlayColor]: hierarchyColorsByHierarchy.secondary.overlayColor },
    color: hierarchyColorsByHierarchy.secondary.color,
    selectors: {
      "&[data-disabled]": { color: hierarchyColorsByHierarchy.secondary.disabledColor },
    },
  },
  tertiary: {
    vars: { [overlayColor]: hierarchyColorsByHierarchy.tertiary.overlayColor },
    color: hierarchyColorsByHierarchy.tertiary.color,
    selectors: { "&[data-disabled]": { color: hierarchyColorsByHierarchy.tertiary.disabledColor } },
  },
} satisfies Record<LabelButtonHierarchy, unknown>;

// Intent variant styles
const intentVariants = {
  positive: {
    vars: { [overlayColor]: feedbackColorsByIntent.positive.overlayColor },
    color: feedbackColorsByIntent.positive.color,
    selectors: { "&[data-disabled]": { color: feedbackColorsByIntent.positive.disabledColor } },
  },
  destructive: {
    vars: { [overlayColor]: feedbackColorsByIntent.destructive.overlayColor },
    color: feedbackColorsByIntent.destructive.color,
    selectors: { "&[data-disabled]": { color: feedbackColorsByIntent.destructive.disabledColor } },
  },
} satisfies Record<LabelButtonIntent, unknown>;

/**
 * `LabelButton.Basic`용 VE recipe.
 *
 * @remarks
 * 인터랙션 상태는 `usePressable`이 부여하는 data attribute를 소비한다.
 * - `data-hovered` / `data-pressed` → `::after` overlay opacity (0.08 / 0.12)
 * - `data-focus-visible`            → `::before` focus ring box-shadow
 * - `data-disabled`                 → overlay 차단 + `cursor: not-allowed`
 *
 * `::before`/`::after`는 size별 음수 inset으로 시각 영역 밖으로 확장된다.
 * `usePressable` 없이 단독으로 사용하면 hover·focus·disabled 스타일이 동작하지 않는다.
 *
 * @see {@link overlay} — hover/pressed overlay 유틸
 * @see {@link focusRing} — focus ring 유틸
 */
export const basicRoot = recipe({
  base: [overlay, focusRing(), baseStyles],
  variants: {
    hierarchy: hierarchyVariants satisfies Record<LabelButtonHierarchy, unknown>,
    size: sizeVariants satisfies Record<LabelButtonSize, unknown>,
  },
});

/**
 * `LabelButton.Feedback`용 VE recipe.
 *
 * @remarks
 * `hierarchy` 없이 `intent`만으로 색상과 overlay color가 결정된다.
 * 인터랙션 상태 처리는 {@link basicRoot}와 동일하게 `usePressable` data attribute에 의존한다.
 */
export const feedbackRoot = recipe({
  base: [overlay, focusRing(), baseStyles],
  variants: {
    intent: intentVariants satisfies Record<LabelButtonIntent, unknown>,
    size: sizeVariants satisfies Record<LabelButtonSize, unknown>,
  },
});
