import { recipe } from "@vanilla-extract/recipes";
import { objectKeys, pxToRem } from "utils";

import { vars } from "../../../tokens/vars.css";
import type { FeedbackVariant, BadgeSize } from "../badge.types";
import { dotBadgeSizeMap } from "../badge.variants";

const variantBg = {
  positive: {
    normal: vars.color.semantic.feedback.positive.neutral,
    muted: vars.color.semantic.feedback.positive.alpha.subtle,
  },
  destructive: {
    normal: vars.color.semantic.feedback.destructive.neutral,
    muted: vars.color.semantic.feedback.destructive.alpha.subtle,
  },
} satisfies Record<FeedbackVariant, { normal: string; muted: string }>;

const sizeVariants = Object.fromEntries(
  objectKeys(dotBadgeSizeMap).map(size => [
    size,
    {
      width: pxToRem(dotBadgeSizeMap[size].width),
      height: pxToRem(dotBadgeSizeMap[size].height),
    },
  ]),
) as Record<BadgeSize, { width: string; height: string }>;

const feedbackCompoundVariants = objectKeys(variantBg).flatMap(variant => [
  {
    variants: { variant, isMuted: false },
    style: { backgroundColor: variantBg[variant].normal },
  },
  {
    variants: { variant, isMuted: true },
    style: { backgroundColor: variantBg[variant].muted },
  },
]);

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
    isMuted: { true: {}, false: {} },
  },
  compoundVariants: feedbackCompoundVariants,
  defaultVariants: {
    variant: "positive",
    size: "md",
    isMuted: false,
  },
});
