import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { BADGE_SIZE_OPTIONS } from "../badge.types";
import type { FeedbackVariant, BadgeSize, BasicHierarchy } from "../badge.types";
import type { NumericBadgeStyle } from "./numericBadge.types";

type BadgeSizeConfig = {
  minWidth: number;
  paddingTopBottom: string;
  paddingLeftRight: string;
};

type BadgeStyle = { bg: string; color: string };

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

const createBadgeStyle = ({ bg, color }: BadgeStyle) => ({
  backgroundColor: bg === "none" ? "transparent" : bg,
  vars: {
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

const root = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: vars.scheme.semantic.radius["4"],
});

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

export const basicRoot = recipe({
  base: root,
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
  compoundVariants: [
    {
      variants: { badgeStyle: "solid", hierarchy: "accent" },
      style: createBadgeStyle(basicStyles.solid.accent),
    },
    {
      variants: { badgeStyle: "solid", hierarchy: "primary" },
      style: createBadgeStyle(basicStyles.solid.primary),
    },
    {
      variants: { badgeStyle: "solid", hierarchy: "secondary" },
      style: createBadgeStyle(basicStyles.solid.secondary),
    },
    {
      variants: { badgeStyle: "solid", hierarchy: "tertiary" },
      style: createBadgeStyle(basicStyles.solid.tertiary),
    },
    {
      variants: { badgeStyle: "alpha", hierarchy: "accent" },
      style: createBadgeStyle(basicStyles.alpha.accent),
    },
    {
      variants: { badgeStyle: "alpha", hierarchy: "primary" },
      style: createBadgeStyle(basicStyles.alpha.primary),
    },
    {
      variants: { badgeStyle: "alpha", hierarchy: "secondary" },
      style: createBadgeStyle(basicStyles.alpha.secondary),
    },
    {
      variants: { badgeStyle: "alpha", hierarchy: "tertiary" },
      style: createBadgeStyle(basicStyles.alpha.tertiary),
    },
    {
      variants: { badgeStyle: "hollow", hierarchy: "accent" },
      style: createBadgeStyle(basicStyles.hollow.accent),
    },
    {
      variants: { badgeStyle: "hollow", hierarchy: "primary" },
      style: createBadgeStyle(basicStyles.hollow.primary),
    },
    {
      variants: { badgeStyle: "hollow", hierarchy: "secondary" },
      style: createBadgeStyle(basicStyles.hollow.secondary),
    },
    {
      variants: { badgeStyle: "hollow", hierarchy: "tertiary" },
      style: createBadgeStyle(basicStyles.hollow.tertiary),
    },
    {
      variants: { badgeStyle: "solid", isMuted: true },
      style: createBadgeStyle(basicStyles.solid.tertiary),
    },
    {
      variants: { badgeStyle: "alpha", isMuted: true },
      style: createBadgeStyle(basicStyles.alpha.tertiary),
    },
    {
      variants: { badgeStyle: "hollow", isMuted: true },
      style: createBadgeStyle(basicStyles.hollow.tertiary),
    },
  ],
});

export const feedbackRoot = recipe({
  base: root,
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
  compoundVariants: [
    {
      variants: { badgeStyle: "solid", variant: "positive" },
      style: createBadgeStyle(feedbackStyles.solid.positive),
    },
    {
      variants: { badgeStyle: "solid", variant: "destructive" },
      style: createBadgeStyle(feedbackStyles.solid.destructive),
    },
    {
      variants: { badgeStyle: "alpha", variant: "positive" },
      style: createBadgeStyle(feedbackStyles.alpha.positive),
    },
    {
      variants: { badgeStyle: "alpha", variant: "destructive" },
      style: createBadgeStyle(feedbackStyles.alpha.destructive),
    },
    {
      variants: { badgeStyle: "hollow", variant: "positive" },
      style: createBadgeStyle(feedbackStyles.hollow.positive),
    },
    {
      variants: { badgeStyle: "hollow", variant: "destructive" },
      style: createBadgeStyle(feedbackStyles.hollow.destructive),
    },
  ],
});

export const label = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: badgeTextColor,
});
