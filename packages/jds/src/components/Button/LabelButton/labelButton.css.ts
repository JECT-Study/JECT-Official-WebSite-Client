import { style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import type { IconSize } from "components";
import { vars } from "tokens";
import { pxToRem, focusRing, overlay, overlayColor } from "utils";

import type { LabelButtonFeedback, LabelButtonHierarchy, LabelButtonSize } from "./labelButton.types";

export const iconSizeMap: Record<LabelButtonSize, IconSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

type ColorEntry = { overlayColor: string; color: string; disabledColor: string };

const hierarchyColorsByHierarchy = {
  accent: {
    overlayColor: vars.color.semantic.accent.normal,
    color: vars.color.semantic.accent.normal,
    disabledColor: vars.color.semantic.accent.alpha.subtle,
  },
  primary: {
    overlayColor: vars.color.semantic.fill.boldest,
    color: vars.color.semantic.object.boldest,
    disabledColor: vars.color.semantic.object.subtle,
  },
  secondary: {
    overlayColor: vars.color.semantic.object.boldest,
    color: vars.color.semantic.object.neutral,
    disabledColor: vars.color.semantic.object.subtle,
  },
  tertiary: {
    overlayColor: vars.color.semantic.object.boldest,
    color: vars.color.semantic.object.alternative,
    disabledColor: vars.color.semantic.object.subtle,
  },
} satisfies Record<LabelButtonHierarchy, ColorEntry>;

const feedbackColorsByIntent = {
  positive: {
    overlayColor: vars.color.semantic.feedback.positive.normal,
    color: vars.color.semantic.feedback.positive.normal,
    disabledColor: vars.color.semantic.feedback.positive.alpha.subtle,
  },
  destructive: {
    overlayColor: vars.color.semantic.feedback.destructive.normal,
    color: vars.color.semantic.feedback.destructive.normal,
    disabledColor: vars.color.semantic.feedback.destructive.alpha.subtle,
  },
} satisfies Record<LabelButtonFeedback, ColorEntry>;

// padding이 0이라 탭/포커스 영역(::before·::after)을 size별 음수 inset으로 시각 영역 밖까지 확장한다.
const tapAreaBySize = {
  lg: { inset: `${pxToRem(-4)} ${pxToRem(-8)}`, borderRadius: vars.scheme.semantic.radius["6"] },
  md: { inset: `${pxToRem(-3)} ${pxToRem(-6)}`, borderRadius: vars.scheme.semantic.radius["6"] },
  sm: { inset: `${pxToRem(-2)} ${pxToRem(-4)}`, borderRadius: vars.scheme.semantic.radius["4"] },
  xs: { inset: `${pxToRem(-1)} ${pxToRem(-3)}`, borderRadius: vars.scheme.semantic.radius["4"] },
} satisfies Record<LabelButtonSize, { inset: string; borderRadius: string }>;

const sizeVariants = {
  lg: {
    selectors: {
      "&::before, &::after": tapAreaBySize.lg,
    },
  },
  md: {
    selectors: { "&::before, &::after": tapAreaBySize.md },
  },
  sm: {
    selectors: { "&::before, &::after": tapAreaBySize.sm },
  },
  xs: {
    selectors: { "&::before, &::after": tapAreaBySize.xs },
  },
} satisfies Record<LabelButtonSize, StyleRule>;

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
  },
});

const colorVariant = ({ overlayColor: oc, color, disabledColor }: ColorEntry) => ({
  vars: { [overlayColor]: oc },
  color,
  selectors: { "&[data-disabled]": { color: disabledColor } },
});

const hierarchyVariants = {
  accent: colorVariant(hierarchyColorsByHierarchy.accent),
  primary: colorVariant(hierarchyColorsByHierarchy.primary),
  secondary: colorVariant(hierarchyColorsByHierarchy.secondary),
  tertiary: colorVariant(hierarchyColorsByHierarchy.tertiary),
} satisfies Record<LabelButtonHierarchy, StyleRule>;

const feedbackVariants = {
  positive: colorVariant(feedbackColorsByIntent.positive),
  destructive: colorVariant(feedbackColorsByIntent.destructive),
} satisfies Record<LabelButtonFeedback, StyleRule>;

const rootBase = [overlay(), focusRing(), baseStyles];

export const basicRoot = recipe({
  base: rootBase,
  variants: {
    hierarchy: hierarchyVariants satisfies Record<LabelButtonHierarchy, StyleRule>,
    size: sizeVariants satisfies Record<LabelButtonSize, StyleRule>,
  },
});

export const feedbackRoot = recipe({
  base: rootBase,
  variants: {
    feedback: feedbackVariants satisfies Record<LabelButtonFeedback, StyleRule>,
    size: sizeVariants satisfies Record<LabelButtonSize, StyleRule>,
  },
});
