import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { vars } from "../../../tokens/vars.css";
import type {
  FeedbackVariant,
  BadgeSize,
  BasicHierarchy,
  NumericBadgeStyle,
} from "../badge.types";
import { numericBadgeSizeMap } from "../badge.variants";

type BadgeVisualStyle = { bg: string; color: string };

const keysOf = <T extends string>(obj: Record<T, unknown>) => Object.keys(obj) as T[];

const badgeBackgroundColor = createVar();
const badgeTextColor = createVar();

const numericBadgeMutedOpacity = `calc(${vars.scheme.semantic.opacity["36"]} / 100)`;

const createBadgeVars = ({ bg, color }: BadgeVisualStyle) => ({
  vars: {
    [badgeBackgroundColor]: bg === "none" ? "transparent" : bg,
    [badgeTextColor]: color,
  },
});

const sizeVariants = Object.fromEntries(
  keysOf(numericBadgeSizeMap).map(size => [
    size,
    {
      minWidth: pxToRem(numericBadgeSizeMap[size].minWidth),
      padding: `${pxToRem(numericBadgeSizeMap[size].paddingTopBottom)} ${pxToRem(numericBadgeSizeMap[size].paddingLeftRight)}`,
    },
  ]),
) as Record<BadgeSize, { minWidth: string; padding: string }>;

const rootBase = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: badgeBackgroundColor,
  borderRadius: vars.scheme.semantic.radius["4"],
} as const;

const badgeStyleVariants = {
  solid: {},
  hollow: { padding: 0 },
} satisfies Record<NumericBadgeStyle, object>;

const basicStyles = {
  solid: {
    accent: {
      bg: vars.color.semantic.accent.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    primary: {
      bg: vars.color.semantic.fill.boldest,
      color: vars.color.semantic.object.inverse.boldest,
    },
    secondary: {
      bg: vars.color.semantic.fill.normal,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    tertiary: {
      bg: vars.color.semantic.fill.subtler,
      color: vars.color.semantic.object.alternative,
    },
  },
  hollow: {
    accent: { bg: "none", color: vars.color.semantic.accent.bold },
    primary: { bg: "none", color: vars.color.semantic.object.bolder },
    secondary: { bg: "none", color: vars.color.semantic.object.neutral },
    tertiary: { bg: "none", color: vars.color.semantic.object.alternative },
  },
} satisfies Record<NumericBadgeStyle, Record<BasicHierarchy, BadgeVisualStyle>>;

const basicMutedStyles = {
  solid: { bg: vars.color.semantic.fill.subtler, color: vars.color.semantic.object.subtle },
  hollow: { bg: "none", color: vars.color.semantic.object.subtle },
} satisfies Record<NumericBadgeStyle, BadgeVisualStyle>;

const feedbackStyles = {
  solid: {
    positive: {
      bg: vars.color.semantic.feedback.positive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.neutral,
      color: vars.color.semantic.object.inverse.boldest,
    },
  },
  hollow: {
    positive: { bg: "none", color: vars.color.semantic.feedback.positive.bold },
    destructive: { bg: "none", color: vars.color.semantic.feedback.destructive.bold },
  },
} satisfies Record<NumericBadgeStyle, Record<FeedbackVariant, BadgeVisualStyle>>;

const basicCompoundVariants = keysOf(basicStyles).flatMap(badgeStyle =>
  keysOf(basicStyles[badgeStyle]).map(hierarchy => ({
    variants: { badgeStyle, hierarchy },
    style: createBadgeVars(basicStyles[badgeStyle][hierarchy]),
  })),
);

const basicMutedCompoundVariants = keysOf(basicMutedStyles).map(badgeStyle => ({
  variants: { badgeStyle, isMuted: true },
  style: createBadgeVars(basicMutedStyles[badgeStyle]),
}));

const feedbackCompoundVariants = keysOf(feedbackStyles).flatMap(badgeStyle =>
  keysOf(feedbackStyles[badgeStyle]).map(variant => ({
    variants: { badgeStyle, variant },
    style: createBadgeVars(feedbackStyles[badgeStyle][variant]),
  })),
);

export const basicRoot = recipe({
  base: rootBase,
  variants: {
    hierarchy: {
      accent: {},
      primary: {},
      secondary: {},
      tertiary: {},
    } satisfies Record<BasicHierarchy, object>,
    size: sizeVariants,
    badgeStyle: badgeStyleVariants,
    isMuted: { true: {}, false: {} },
  },
  compoundVariants: [...basicCompoundVariants, ...basicMutedCompoundVariants],
  defaultVariants: {
    hierarchy: "secondary",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
  },
});

export const feedbackRoot = recipe({
  base: rootBase,
  variants: {
    variant: {
      positive: {},
      destructive: {},
    } satisfies Record<FeedbackVariant, object>,
    size: sizeVariants,
    badgeStyle: badgeStyleVariants,
    isMuted: {
      true: { opacity: numericBadgeMutedOpacity },
      false: { opacity: 1 },
    },
  },
  compoundVariants: feedbackCompoundVariants,
  defaultVariants: {
    variant: "positive",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
  },
});

export const label = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: badgeTextColor,
});

export const labelTextStyle: Record<BadgeSize, string> = {
  lg: "semantic-textStyle-label-lg-normal",
  md: "semantic-textStyle-label-md-normal",
  sm: "semantic-textStyle-label-sm-normal",
  xs: "semantic-textStyle-label-xs-normal",
};
