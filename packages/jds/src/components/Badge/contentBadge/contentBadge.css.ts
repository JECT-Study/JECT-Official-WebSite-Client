import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { pxToRem } from "utils";

import { vars } from "../../../tokens/vars.css";
import type { IconSize } from "../../Icon";
import { BASIC_HIERARCHY_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "../badge.types";
import type { BadgeSize, BasicHierarchy, FeedbackVariant } from "../badge.types";
import { contentBadgeSizeMap } from "../badge.variants";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";
import type { ContentBadgeStyle, ThemeVariant } from "./contentBadge.types";

type BadgeStyle = {
  bg: string;
  color: string;
  border: string;
  iconColor?: string;
};

const badgeBackgroundColor = createVar();
const badgeTextColor = createVar();
const badgeBorderWidth = createVar();
const badgeBorderColor = createVar();
const badgeIconColor = createVar();

const contentBadgeMutedOpacity = `calc(${vars.scheme.semantic.opacity["36"]} / 100)`;

const createBadgeVars = ({ bg, color, border, iconColor }: BadgeStyle) => ({
  vars: {
    [badgeBackgroundColor]: bg === "none" ? "transparent" : bg,
    [badgeTextColor]: color,
    [badgeBorderWidth]: border === "none" ? "0" : "1px",
    [badgeBorderColor]: border === "none" ? "transparent" : border,
    [badgeIconColor]: iconColor ?? color,
  },
});

const sizeVariants: Record<BadgeSize, { minWidth: string; padding: string }> = {
  lg: {
    minWidth: pxToRem(contentBadgeSizeMap.lg.minWidth),
    padding: `${pxToRem(contentBadgeSizeMap.lg.paddingTopBottom)} ${pxToRem(contentBadgeSizeMap.lg.paddingLeftRight)}`,
  },
  md: {
    minWidth: pxToRem(contentBadgeSizeMap.md.minWidth),
    padding: `${pxToRem(contentBadgeSizeMap.md.paddingTopBottom)} ${pxToRem(contentBadgeSizeMap.md.paddingLeftRight)}`,
  },
  sm: {
    minWidth: pxToRem(contentBadgeSizeMap.sm.minWidth),
    padding: `${pxToRem(contentBadgeSizeMap.sm.paddingTopBottom)} ${pxToRem(contentBadgeSizeMap.sm.paddingLeftRight)}`,
  },
  xs: {
    minWidth: pxToRem(contentBadgeSizeMap.xs.minWidth),
    padding: `${pxToRem(contentBadgeSizeMap.xs.paddingTopBottom)} ${pxToRem(contentBadgeSizeMap.xs.paddingLeftRight)}`,
  },
};

const rootBase = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 0,
  backgroundColor: badgeBackgroundColor,
  borderStyle: "solid",
  borderWidth: badgeBorderWidth,
  borderColor: badgeBorderColor,
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
      bg: vars.color.semantic.fill.boldest,
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
      color: vars.color.semantic.accent.bold,
      border: "none",
      iconColor: vars.color.semantic.accent.bold,
    },
    primary: {
      bg: vars.color.semantic.fill.subtler,
      color: vars.color.semantic.object.bolder,
      border: "none",
      iconColor: vars.color.semantic.object.bolder,
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
      color: vars.color.semantic.accent.bold,
      border: vars.color.semantic.accent.alpha.subtle,
      iconColor: vars.color.semantic.accent.bold,
    },
    primary: {
      bg: "none",
      color: vars.color.semantic.object.bolder,
      border: vars.color.semantic.stroke.alpha.assistive,
      iconColor: vars.color.semantic.object.bolder,
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

const basicMutedStyles = {
  solid: {
    bg: vars.color.semantic.fill.subtler,
    color: vars.color.semantic.object.subtle,
    border: "none",
    iconColor: vars.color.semantic.object.subtle,
  },
  alpha: {
    bg: vars.color.semantic.fill.subtlest,
    color: vars.color.semantic.object.subtle,
    border: "none",
    iconColor: vars.color.semantic.object.subtle,
  },
  outlined: {
    bg: "none",
    color: vars.color.semantic.object.subtle,
    border: vars.color.semantic.stroke.alpha.subtler,
    iconColor: vars.color.semantic.object.subtle,
  },
} satisfies Record<ContentBadgeStyle, BadgeStyle>;

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
      color: vars.color.semantic.feedback.positive.bold,
      border: "none",
    },
    destructive: {
      bg: vars.color.semantic.feedback.destructive.alpha.subtler,
      color: vars.color.semantic.feedback.destructive.bold,
      border: "none",
    },
  },
  outlined: {
    positive: {
      bg: "none",
      color: vars.color.semantic.feedback.positive.bold,
      border: vars.color.semantic.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: "none",
      color: vars.color.semantic.feedback.destructive.bold,
      border: vars.color.semantic.feedback.destructive.alpha.subtle,
    },
  },
} satisfies Record<ContentBadgeStyle, Record<FeedbackVariant, BadgeStyle>>;

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
      bg: vars.color.semantic.theme.violet.neutral,
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
      color: vars.color.semantic.theme.red.bold,
      border: "none",
    },
    orange: {
      bg: vars.color.semantic.theme.orange.alpha.subtler,
      color: vars.color.semantic.theme.orange.bold,
      border: "none",
    },
    yellow: {
      bg: vars.color.semantic.theme.yellow.alpha.subtler,
      color: vars.color.semantic.theme.yellow.bold,
      border: "none",
    },
    lime: {
      bg: vars.color.semantic.theme.lime.alpha.subtler,
      color: vars.color.semantic.theme.lime.bold,
      border: "none",
    },
    green: {
      bg: vars.color.semantic.theme.green.alpha.subtler,
      color: vars.color.semantic.theme.green.bold,
      border: "none",
    },
    teal: {
      bg: vars.color.semantic.theme.teal.alpha.subtler,
      color: vars.color.semantic.theme.teal.bold,
      border: "none",
    },
    sky: {
      bg: vars.color.semantic.theme.sky.alpha.subtler,
      color: vars.color.semantic.theme.sky.bold,
      border: "none",
    },
    indigo: {
      bg: vars.color.semantic.theme.violet.alpha.subtler,
      color: vars.color.semantic.theme.violet.bold,
      border: "none",
    },
    purple: {
      bg: vars.color.semantic.theme.purple.alpha.subtler,
      color: vars.color.semantic.theme.purple.bold,
      border: "none",
    },
    pink: {
      bg: vars.color.semantic.theme.pink.alpha.subtler,
      color: vars.color.semantic.theme.pink.bold,
      border: "none",
    },
  },
  outlined: {
    red: {
      bg: "none",
      color: vars.color.semantic.theme.red.bold,
      border: vars.color.semantic.theme.red.alpha.subtle,
    },
    orange: {
      bg: "none",
      color: vars.color.semantic.theme.orange.bold,
      border: vars.color.semantic.theme.orange.alpha.subtle,
    },
    yellow: {
      bg: "none",
      color: vars.color.semantic.theme.yellow.bold,
      border: vars.color.semantic.theme.yellow.alpha.subtle,
    },
    lime: {
      bg: "none",
      color: vars.color.semantic.theme.lime.bold,
      border: vars.color.semantic.theme.lime.alpha.subtle,
    },
    green: {
      bg: "none",
      color: vars.color.semantic.theme.green.bold,
      border: vars.color.semantic.theme.green.alpha.subtle,
    },
    teal: {
      bg: "none",
      color: vars.color.semantic.theme.teal.bold,
      border: vars.color.semantic.theme.teal.alpha.subtle,
    },
    sky: {
      bg: "none",
      color: vars.color.semantic.theme.sky.bold,
      border: vars.color.semantic.theme.sky.alpha.subtle,
    },
    indigo: {
      bg: "none",
      color: vars.color.semantic.theme.violet.bold,
      border: vars.color.semantic.theme.violet.alpha.subtle,
    },
    purple: {
      bg: "none",
      color: vars.color.semantic.theme.purple.bold,
      border: vars.color.semantic.theme.purple.alpha.subtle,
    },
    pink: {
      bg: "none",
      color: vars.color.semantic.theme.pink.bold,
      border: vars.color.semantic.theme.pink.alpha.subtle,
    },
  },
} satisfies Record<ContentBadgeStyle, Record<ThemeVariant, BadgeStyle>>;

const basicCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  BASIC_HIERARCHY_OPTIONS.map(hierarchy => ({
    variants: { badgeStyle, hierarchy },
    style: createBadgeVars(basicStyles[badgeStyle][hierarchy]),
  })),
);

const basicMutedCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => ({
  variants: { badgeStyle, isMuted: true },
  style: createBadgeVars(basicMutedStyles[badgeStyle]),
}));

const feedbackCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  FEEDBACK_VARIANT_OPTIONS.map(variant => ({
    variants: { badgeStyle, variant },
    style: createBadgeVars(feedbackStyles[badgeStyle][variant]),
  })),
);

const themeCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  THEME_VARIANT_OPTIONS.map(variant => ({
    variants: { badgeStyle, variant },
    style: createBadgeVars(themeStyles[badgeStyle][variant]),
  })),
);

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
      true: {},
      false: {},
    },
    withIcon: {
      true: { gap: pxToRem(4) },
      false: { gap: 0 },
    },
  },
  compoundVariants: [...basicCompoundVariants, ...basicMutedCompoundVariants],
  defaultVariants: {
    hierarchy: "secondary",
    size: "md",
    badgeStyle: "solid",
    isMuted: false,
    withIcon: false,
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
      true: { opacity: contentBadgeMutedOpacity },
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
  compoundVariants: themeCompoundVariants,
  defaultVariants: {
    variant: "red",
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

export const iconSizeMap: Record<BadgeSize, IconSize> = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

export const icon = style({
  color: badgeIconColor,
});
