import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { BADGE_SIZE_OPTIONS } from "../badge.types";
import type { BadgeSize, BasicHierarchy, FeedbackVariant } from "../badge.types";
import type { ContentBadgeStyle, ThemeVariant } from "./contentBadge.types";

type BadgeSizeConfig = {
  minWidth: number;
  paddingTopBottom: string;
  paddingLeftRight: string;
};

type BadgeStyle = {
  bg: string;
  color: string;
  border: string;
  iconColor?: string;
};

const badgeTextColor = createVar();
const badgeIconColor = createVar();

const contentBadgeMutedOpacity = `calc(${vars.scheme.semantic.opacity["36"]} / 100)`;

const contentBadgeSizeMap = {
  lg: {
    minWidth: 28,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  md: {
    minWidth: 27,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  sm: {
    minWidth: 24,
    paddingTopBottom: vars.scheme.semantic.spacing["2"],
    paddingLeftRight: vars.scheme.semantic.spacing["6"],
  },
  xs: {
    minWidth: 20,
    paddingTopBottom: vars.scheme.semantic.spacing["1"],
    paddingLeftRight: vars.scheme.semantic.spacing["4"],
  },
} satisfies Record<BadgeSize, BadgeSizeConfig>;

const createBadgeStyle = ({ bg, color, border, iconColor }: BadgeStyle) => ({
  backgroundColor: bg === "none" ? "transparent" : bg,
  borderWidth: border === "none" ? "0" : "1px",
  borderColor: border === "none" ? "transparent" : border,
  vars: {
    [badgeTextColor]: color,
    [badgeIconColor]: iconColor ?? color,
  },
});

const sizeVariants = Object.fromEntries(
  BADGE_SIZE_OPTIONS.map(size => [
    size,
    {
      minWidth: pxToRem(contentBadgeSizeMap[size].minWidth),
      padding: `${contentBadgeSizeMap[size].paddingTopBottom} ${contentBadgeSizeMap[size].paddingLeftRight}`,
    },
  ]),
) as Record<BadgeSize, { minWidth: string; padding: string }>;

const rootBase = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderWidth: "0",
  borderColor: "transparent",
  borderRadius: vars.scheme.semantic.radius["4"],
} as const;

const basicStyles = {
  solid: {
    accent: {
      bg: vars.color.semantic.accent.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
      iconColor: vars.color.semantic.object.static.inverse.boldest,
    },
    primary: {
      bg: vars.color.semantic.fill.bolder,
      color: vars.color.semantic.object.inverse.boldest,
      border: "none",
      iconColor: vars.color.semantic.object.inverse.boldest,
    },
    secondary: {
      bg: vars.color.semantic.fill.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
      iconColor: vars.color.semantic.object.static.inverse.boldest,
    },
    tertiary: {
      bg: vars.color.semantic.fill.subtler,
      color: vars.color.semantic.object.alternative,
      border: "none",
      iconColor: vars.color.semantic.object.alternative,
    },
  },
  alpha: {
    accent: {
      bg: vars.color.semantic.accent.alpha.subtler,
      color: vars.color.semantic.accent.normal,
      border: "none",
      iconColor: vars.color.semantic.accent.normal,
    },
    primary: {
      bg: vars.color.semantic.fill.subtle,
      color: vars.color.semantic.object.bold,
      border: "none",
      iconColor: vars.color.semantic.object.bold,
    },
    secondary: {
      bg: vars.color.semantic.fill.subtler,
      color: vars.color.semantic.object.neutral,
      border: "none",
      iconColor: vars.color.semantic.object.neutral,
    },
    tertiary: {
      bg: vars.color.semantic.fill.subtlest,
      color: vars.color.semantic.object.alternative,
      border: "none",
      iconColor: vars.color.semantic.object.alternative,
    },
  },
  outlined: {
    accent: {
      bg: "none",
      color: vars.color.semantic.accent.normal,
      border: vars.color.semantic.accent.alpha.subtle,
      iconColor: vars.color.semantic.accent.normal,
    },
    primary: {
      bg: "none",
      color: vars.color.semantic.object.bold,
      border: vars.color.semantic.stroke.alpha.assistive,
      iconColor: vars.color.semantic.object.bold,
    },
    secondary: {
      bg: "none",
      color: vars.color.semantic.object.neutral,
      border: vars.color.semantic.stroke.alpha.subtle,
      iconColor: vars.color.semantic.object.neutral,
    },
    tertiary: {
      bg: "none",
      color: vars.color.semantic.object.alternative,
      border: vars.color.semantic.stroke.alpha.subtle,
      iconColor: vars.color.semantic.object.alternative,
    },
  },
} satisfies Record<ContentBadgeStyle, Record<BasicHierarchy, BadgeStyle>>;

const feedbackStyles = {
  solid: {
    positive: {
      bg: vars.color.semantic.feedback.positive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
  },
  alpha: {
    positive: {
      bg: vars.color.semantic.feedback.positive.alpha.subtler,
      color: vars.color.semantic.feedback.positive.normal,
      border: "none",
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.alpha.subtler,
      color: vars.color.semantic.feedback.destructive.normal,
      border: "none",
    },
  },
  outlined: {
    positive: {
      bg: "none",
      color: vars.color.semantic.feedback.positive.normal,
      border: vars.color.semantic.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: "none",
      color: vars.color.semantic.feedback.destructive.normal,
      border: vars.color.semantic.feedback.destructive.alpha.subtle,
    },
  },
} satisfies Record<ContentBadgeStyle, Record<FeedbackVariant, BadgeStyle>>;

const feedbackMutedIconColors = {
  solid: vars.color.semantic.object.static.inverse.subtle,
  alpha: vars.color.semantic.object.subtler,
  outlined: vars.color.semantic.object.subtler,
} satisfies Record<ContentBadgeStyle, string>;

const themeStyles = {
  solid: {
    red: {
      bg: vars.color.semantic.theme.red.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    orange: {
      bg: vars.color.semantic.theme.orange.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    yellow: {
      bg: vars.color.semantic.theme.yellow.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    lime: {
      bg: vars.color.semantic.theme.lime.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    green: {
      bg: vars.color.semantic.theme.green.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    teal: {
      bg: vars.color.semantic.theme.teal.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    sky: {
      bg: vars.color.semantic.theme.sky.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    indigo: {
      bg: vars.color.semantic.theme.indigo.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    purple: {
      bg: vars.color.semantic.theme.purple.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    pink: {
      bg: vars.color.semantic.theme.pink.neutral,
      color: vars.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
  },
  alpha: {
    red: {
      bg: vars.color.semantic.theme.red.alpha.subtler,
      color: vars.color.semantic.theme.red.normal,
      border: "none",
    },
    orange: {
      bg: vars.color.semantic.theme.orange.alpha.subtler,
      color: vars.color.semantic.theme.orange.normal,
      border: "none",
    },
    yellow: {
      bg: vars.color.semantic.theme.yellow.alpha.subtler,
      color: vars.color.semantic.theme.yellow.normal,
      border: "none",
    },
    lime: {
      bg: vars.color.semantic.theme.lime.alpha.subtler,
      color: vars.color.semantic.theme.lime.normal,
      border: "none",
    },
    green: {
      bg: vars.color.semantic.theme.green.alpha.subtler,
      color: vars.color.semantic.theme.green.normal,
      border: "none",
    },
    teal: {
      bg: vars.color.semantic.theme.teal.alpha.subtler,
      color: vars.color.semantic.theme.teal.normal,
      border: "none",
    },
    sky: {
      bg: vars.color.semantic.theme.sky.alpha.subtler,
      color: vars.color.semantic.theme.sky.normal,
      border: "none",
    },
    indigo: {
      bg: vars.color.semantic.theme.indigo.alpha.subtler,
      color: vars.color.semantic.theme.indigo.normal,
      border: "none",
    },
    purple: {
      bg: vars.color.semantic.theme.purple.alpha.subtler,
      color: vars.color.semantic.theme.purple.normal,
      border: "none",
    },
    pink: {
      bg: vars.color.semantic.theme.pink.alpha.subtler,
      color: vars.color.semantic.theme.pink.normal,
      border: "none",
    },
  },
  outlined: {
    red: {
      bg: "none",
      color: vars.color.semantic.theme.red.normal,
      border: vars.color.semantic.theme.red.alpha.subtle,
    },
    orange: {
      bg: "none",
      color: vars.color.semantic.theme.orange.normal,
      border: vars.color.semantic.theme.orange.alpha.subtle,
    },
    yellow: {
      bg: "none",
      color: vars.color.semantic.theme.yellow.normal,
      border: vars.color.semantic.theme.yellow.alpha.subtle,
    },
    lime: {
      bg: "none",
      color: vars.color.semantic.theme.lime.normal,
      border: vars.color.semantic.theme.lime.alpha.subtle,
    },
    green: {
      bg: "none",
      color: vars.color.semantic.theme.green.normal,
      border: vars.color.semantic.theme.green.alpha.subtle,
    },
    teal: {
      bg: "none",
      color: vars.color.semantic.theme.teal.normal,
      border: vars.color.semantic.theme.teal.alpha.subtle,
    },
    sky: {
      bg: "none",
      color: vars.color.semantic.theme.sky.normal,
      border: vars.color.semantic.theme.sky.alpha.subtle,
    },
    indigo: {
      bg: "none",
      color: vars.color.semantic.theme.indigo.normal,
      border: vars.color.semantic.theme.indigo.alpha.subtle,
    },
    purple: {
      bg: "none",
      color: vars.color.semantic.theme.purple.normal,
      border: vars.color.semantic.theme.purple.alpha.subtle,
    },
    pink: {
      bg: "none",
      color: vars.color.semantic.theme.pink.normal,
      border: vars.color.semantic.theme.pink.alpha.subtle,
    },
  },
} satisfies Record<ContentBadgeStyle, Record<ThemeVariant, BadgeStyle>>;

const badgeStyleVariants = {
  solid: {},
  alpha: {},
  outlined: {},
} satisfies Record<ContentBadgeStyle, object>;

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
      true: { opacity: contentBadgeMutedOpacity },
      false: { opacity: 1 },
    },
    withIcon: {
      true: { gap: pxToRem(4) },
      false: { gap: 0 },
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
      variants: { badgeStyle: "outlined", hierarchy: "accent" },
      style: createBadgeStyle(basicStyles.outlined.accent),
    },
    {
      variants: { badgeStyle: "outlined", hierarchy: "primary" },
      style: createBadgeStyle(basicStyles.outlined.primary),
    },
    {
      variants: { badgeStyle: "outlined", hierarchy: "secondary" },
      style: createBadgeStyle(basicStyles.outlined.secondary),
    },
    {
      variants: { badgeStyle: "outlined", hierarchy: "tertiary" },
      style: createBadgeStyle(basicStyles.outlined.tertiary),
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
      variants: { badgeStyle: "outlined", isMuted: true },
      style: createBadgeStyle(basicStyles.outlined.tertiary),
    },
  ],
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
      true: { opacity: contentBadgeMutedOpacity },
      false: { opacity: 1 },
    },
    withIcon: {
      true: { gap: pxToRem(4) },
      false: { gap: 0 },
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
      variants: { badgeStyle: "outlined", variant: "positive" },
      style: createBadgeStyle(feedbackStyles.outlined.positive),
    },
    {
      variants: { badgeStyle: "outlined", variant: "destructive" },
      style: createBadgeStyle(feedbackStyles.outlined.destructive),
    },
    {
      variants: { badgeStyle: "solid", isMuted: true },
      style: {
        vars: {
          [badgeIconColor]: feedbackMutedIconColors.solid,
        },
      },
    },
    {
      variants: { badgeStyle: "alpha", isMuted: true },
      style: {
        vars: {
          [badgeIconColor]: feedbackMutedIconColors.alpha,
        },
      },
    },
    {
      variants: { badgeStyle: "outlined", isMuted: true },
      style: {
        vars: {
          [badgeIconColor]: feedbackMutedIconColors.outlined,
        },
      },
    },
  ],
});

export const themeRoot = recipe({
  base: rootBase,
  variants: {
    variant: {
      red: {},
      orange: {},
      yellow: {},
      lime: {},
      green: {},
      teal: {},
      sky: {},
      indigo: {},
      purple: {},
      pink: {},
    } satisfies Record<ThemeVariant, object>,
    size: sizeVariants,
    badgeStyle: badgeStyleVariants,
    isMuted: {
      true: { opacity: contentBadgeMutedOpacity },
      false: { opacity: 1 },
    },
  },
  compoundVariants: [
    {
      variants: { badgeStyle: "solid", variant: "red" },
      style: createBadgeStyle(themeStyles.solid.red),
    },
    {
      variants: { badgeStyle: "solid", variant: "orange" },
      style: createBadgeStyle(themeStyles.solid.orange),
    },
    {
      variants: { badgeStyle: "solid", variant: "yellow" },
      style: createBadgeStyle(themeStyles.solid.yellow),
    },
    {
      variants: { badgeStyle: "solid", variant: "lime" },
      style: createBadgeStyle(themeStyles.solid.lime),
    },
    {
      variants: { badgeStyle: "solid", variant: "green" },
      style: createBadgeStyle(themeStyles.solid.green),
    },
    {
      variants: { badgeStyle: "solid", variant: "teal" },
      style: createBadgeStyle(themeStyles.solid.teal),
    },
    {
      variants: { badgeStyle: "solid", variant: "sky" },
      style: createBadgeStyle(themeStyles.solid.sky),
    },
    {
      variants: { badgeStyle: "solid", variant: "indigo" },
      style: createBadgeStyle(themeStyles.solid.indigo),
    },
    {
      variants: { badgeStyle: "solid", variant: "purple" },
      style: createBadgeStyle(themeStyles.solid.purple),
    },
    {
      variants: { badgeStyle: "solid", variant: "pink" },
      style: createBadgeStyle(themeStyles.solid.pink),
    },
    {
      variants: { badgeStyle: "alpha", variant: "red" },
      style: createBadgeStyle(themeStyles.alpha.red),
    },
    {
      variants: { badgeStyle: "alpha", variant: "orange" },
      style: createBadgeStyle(themeStyles.alpha.orange),
    },
    {
      variants: { badgeStyle: "alpha", variant: "yellow" },
      style: createBadgeStyle(themeStyles.alpha.yellow),
    },
    {
      variants: { badgeStyle: "alpha", variant: "lime" },
      style: createBadgeStyle(themeStyles.alpha.lime),
    },
    {
      variants: { badgeStyle: "alpha", variant: "green" },
      style: createBadgeStyle(themeStyles.alpha.green),
    },
    {
      variants: { badgeStyle: "alpha", variant: "teal" },
      style: createBadgeStyle(themeStyles.alpha.teal),
    },
    {
      variants: { badgeStyle: "alpha", variant: "sky" },
      style: createBadgeStyle(themeStyles.alpha.sky),
    },
    {
      variants: { badgeStyle: "alpha", variant: "indigo" },
      style: createBadgeStyle(themeStyles.alpha.indigo),
    },
    {
      variants: { badgeStyle: "alpha", variant: "purple" },
      style: createBadgeStyle(themeStyles.alpha.purple),
    },
    {
      variants: { badgeStyle: "alpha", variant: "pink" },
      style: createBadgeStyle(themeStyles.alpha.pink),
    },
    {
      variants: { badgeStyle: "outlined", variant: "red" },
      style: createBadgeStyle(themeStyles.outlined.red),
    },
    {
      variants: { badgeStyle: "outlined", variant: "orange" },
      style: createBadgeStyle(themeStyles.outlined.orange),
    },
    {
      variants: { badgeStyle: "outlined", variant: "yellow" },
      style: createBadgeStyle(themeStyles.outlined.yellow),
    },
    {
      variants: { badgeStyle: "outlined", variant: "lime" },
      style: createBadgeStyle(themeStyles.outlined.lime),
    },
    {
      variants: { badgeStyle: "outlined", variant: "green" },
      style: createBadgeStyle(themeStyles.outlined.green),
    },
    {
      variants: { badgeStyle: "outlined", variant: "teal" },
      style: createBadgeStyle(themeStyles.outlined.teal),
    },
    {
      variants: { badgeStyle: "outlined", variant: "sky" },
      style: createBadgeStyle(themeStyles.outlined.sky),
    },
    {
      variants: { badgeStyle: "outlined", variant: "indigo" },
      style: createBadgeStyle(themeStyles.outlined.indigo),
    },
    {
      variants: { badgeStyle: "outlined", variant: "purple" },
      style: createBadgeStyle(themeStyles.outlined.purple),
    },
    {
      variants: { badgeStyle: "outlined", variant: "pink" },
      style: createBadgeStyle(themeStyles.outlined.pink),
    },
  ],
});

export const label = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: badgeTextColor,
});

export const icon = style({
  color: badgeIconColor,
});
