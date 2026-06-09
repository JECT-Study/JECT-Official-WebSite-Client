import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars, type textStyleClassNames } from "tokens";
import { pxToRem } from "utils";

import {
  BADGE_SIZE_OPTIONS,
  BASIC_HIERARCHY_OPTIONS,
  FEEDBACK_VARIANT_OPTIONS,
} from "../badge.types";
import type { FeedbackVariant, BadgeSize, BasicHierarchy } from "../badge.types";
import { NUMERIC_BADGE_STYLE_OPTIONS, type NumericBadgeStyle } from "./numericBadge.types";

type TextStyleClassName = (typeof textStyleClassNames)[number];

type BadgeSizeConfig = {
  minWidth: number;
  paddingTopBottom: string;
  paddingLeftRight: string;
};

type BadgeStyle = { bg: string; color: string };

const badgeBackgroundColor = createVar();
const badgeTextColor = createVar();

const numericBadgeMutedOpacity = `calc(${vars.scheme.semantic.opacity["36"]} / 100)`;

const numericBadgeSizeMap = {
  lg: {
    minWidth: 24,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  md: {
    minWidth: 23,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  sm: {
    minWidth: 20,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
  xs: {
    minWidth: 18,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
} satisfies Record<BadgeSize, BadgeSizeConfig>;

const createBadgeVars = ({ bg, color }: BadgeStyle) => ({
  vars: {
    [badgeBackgroundColor]: bg === "none" ? "transparent" : bg,
    [badgeTextColor]: color,
  },
});

const sizeVariants = Object.fromEntries(
  BADGE_SIZE_OPTIONS.map(size => [
    size,
    {
      minWidth: pxToRem(numericBadgeSizeMap[size].minWidth),
      padding: `${numericBadgeSizeMap[size].paddingTopBottom} ${numericBadgeSizeMap[size].paddingLeftRight}`,
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
  alpha: {},
  hollow: { padding: vars.scheme.semantic.spacing["0"] },
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
  alpha: {
    accent: {
      bg: vars.color.semantic.accent.alpha.subtler,
      color: vars.color.semantic.accent.normal,
    },
    primary: {
      bg: vars.color.semantic.fill.subtle,
      color: vars.color.semantic.object.bold,
    },
    secondary: {
      bg: vars.color.semantic.fill.subtler,
      color: vars.color.semantic.object.neutral,
    },
    tertiary: {
      bg: vars.color.semantic.fill.subtlest,
      color: vars.color.semantic.object.alternative,
    },
  },
  hollow: {
    accent: { bg: "none", color: vars.color.semantic.accent.bold },
    primary: { bg: "none", color: vars.color.semantic.object.bolder },
    secondary: { bg: "none", color: vars.color.semantic.object.neutral },
    tertiary: { bg: "none", color: vars.color.semantic.object.alternative },
  },
} satisfies Record<NumericBadgeStyle, Record<BasicHierarchy, BadgeStyle>>;

const feedbackStyles = {
  solid: {
    positive: {
      bg: vars.color.semantic.feedback.positive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
    },
  },
  alpha: {
    positive: {
      bg: vars.color.semantic.feedback.positive.alpha.subtler,
      color: vars.color.semantic.feedback.positive.normal,
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.alpha.subtler,
      color: vars.color.semantic.feedback.destructive.normal,
    },
  },
  hollow: {
    positive: { bg: "none", color: vars.color.semantic.feedback.positive.normal },
    destructive: { bg: "none", color: vars.color.semantic.feedback.destructive.normal },
  },
} satisfies Record<NumericBadgeStyle, Record<FeedbackVariant, BadgeStyle>>;

const basicCompoundVariants = NUMERIC_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  BASIC_HIERARCHY_OPTIONS.map(hierarchy => ({
    variants: { badgeStyle, hierarchy },
    style: createBadgeVars(basicStyles[badgeStyle][hierarchy]),
  })),
);

const basicMutedCompoundVariants = NUMERIC_BADGE_STYLE_OPTIONS.map(badgeStyle => ({
  variants: { badgeStyle, isMuted: true },
  style: createBadgeVars(basicStyles[badgeStyle].tertiary),
}));

const feedbackCompoundVariants = NUMERIC_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  FEEDBACK_VARIANT_OPTIONS.map(variant => ({
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
    isMuted: {
      true: { opacity: numericBadgeMutedOpacity },
      false: { opacity: 1 },
    },
  },
  compoundVariants: [...basicCompoundVariants, ...basicMutedCompoundVariants],
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
});

export const label = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: badgeTextColor,
});

export const labelTextStyle = {
  lg: "semantic-textStyle-label-lg-subtle",
  md: "semantic-textStyle-label-md-subtle",
  sm: "semantic-textStyle-label-sm-subtle",
  xs: "semantic-textStyle-label-xs-subtle",
} satisfies Record<BadgeSize, TextStyleClassName>;
