import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { BASIC_HIERARCHY_OPTIONS, FEEDBACK_VARIANT_OPTIONS } from "../badge.types";
import type { BadgeSize, BasicHierarchy, FeedbackVariant } from "../badge.types";
import { CONTENT_BADGE_STYLE_OPTIONS, THEME_VARIANT_OPTIONS } from "./contentBadge.types";
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

const badgeBackgroundColor = createVar();
const badgeTextColor = createVar();
const badgeBorderWidth = createVar();
const badgeBorderColor = createVar();
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
    padding: `${contentBadgeSizeMap.lg.paddingTopBottom} ${contentBadgeSizeMap.lg.paddingLeftRight}`,
  },
  md: {
    minWidth: pxToRem(contentBadgeSizeMap.md.minWidth),
    padding: `${contentBadgeSizeMap.md.paddingTopBottom} ${contentBadgeSizeMap.md.paddingLeftRight}`,
  },
  sm: {
    minWidth: pxToRem(contentBadgeSizeMap.sm.minWidth),
    padding: `${contentBadgeSizeMap.sm.paddingTopBottom} ${contentBadgeSizeMap.sm.paddingLeftRight}`,
  },
  xs: {
    minWidth: pxToRem(contentBadgeSizeMap.xs.minWidth),
    padding: `${contentBadgeSizeMap.xs.paddingTopBottom} ${contentBadgeSizeMap.xs.paddingLeftRight}`,
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

const basicCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  BASIC_HIERARCHY_OPTIONS.map(hierarchy => ({
    variants: { badgeStyle, hierarchy },
    style: createBadgeVars(basicStyles[badgeStyle][hierarchy]),
  })),
);

const basicMutedCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => ({
  variants: { badgeStyle, isMuted: true },
  style: createBadgeVars(basicStyles[badgeStyle].tertiary),
}));

const feedbackCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.flatMap(badgeStyle =>
  FEEDBACK_VARIANT_OPTIONS.map(variant => ({
    variants: { badgeStyle, variant },
    style: createBadgeVars(feedbackStyles[badgeStyle][variant]),
  })),
);

const feedbackMutedCompoundVariants = CONTENT_BADGE_STYLE_OPTIONS.map(badgeStyle => ({
  variants: { badgeStyle, isMuted: true },
  style: {
    vars: {
      [badgeIconColor]: feedbackMutedIconColors[badgeStyle],
    },
  },
}));

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
      true: { opacity: contentBadgeMutedOpacity },
      false: { opacity: 1 },
    },
    withIcon: {
      true: { gap: pxToRem(4) },
      false: { gap: 0 },
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
      true: { opacity: contentBadgeMutedOpacity },
      false: { opacity: 1 },
    },
    withIcon: {
      true: { gap: pxToRem(4) },
      false: { gap: 0 },
    },
  },
  compoundVariants: [...feedbackCompoundVariants, ...feedbackMutedCompoundVariants],
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
