import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { BADGE_SIZE_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "../badge.types";
import type { BadgeSize, FeedbackVariant } from "../badge.types";

type DotBadgeSizeConfig = {
  width: number;
  height: number;
};

const dotBadgeMutedOpacity = `calc(${vars.scheme.semantic.opacity["36"]} / 100)`;

const dotBadgeSizeMap = {
  lg: {
    width: 16,
    height: 16,
  },
  md: {
    width: 12,
    height: 12,
  },
  sm: {
    width: 8,
    height: 8,
  },
  xs: {
    width: 4,
    height: 4,
  },
} satisfies Record<BadgeSize, DotBadgeSizeConfig>;

const variantBg = {
  positive: {
    solid: vars.color.semantic.feedback.positive.neutral,
  },
  destructive: {
    solid: vars.color.semantic.feedback.destructive.neutral,
  },
} satisfies Record<FeedbackVariant, { solid: string }>;

const sizeVariants = Object.fromEntries(
  BADGE_SIZE_OPTIONS.map(size => [
    size,
    {
      width: pxToRem(dotBadgeSizeMap[size].width),
      height: pxToRem(dotBadgeSizeMap[size].height),
    },
  ]),
) as Record<BadgeSize, { width: string; height: string }>;

const feedbackCompoundVariants = FEEDBACK_VARIANT_OPTIONS.map(variant => ({
  variants: { variant },
  style: { backgroundColor: variantBg[variant].solid },
}));

export const feedbackRoot = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    aspectRatio: "1/1",
    borderRadius: vars.scheme.semantic.radius.max,
  },
  variants: {
    variant: {
      positive: {},
      destructive: {},
    } satisfies Record<FeedbackVariant, object>,
    size: sizeVariants,
    isMuted: {
      true: { opacity: dotBadgeMutedOpacity },
      false: { opacity: 1 },
    },
  },
  compoundVariants: feedbackCompoundVariants,
});
