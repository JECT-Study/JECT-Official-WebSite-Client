import type { Theme } from "@emotion/react";

import type { IconSize } from "../../Icon";
import type {
  BadgeSize,
  BadgeStyle,
  BasicHierarchy,
  ContentBadgeStyle,
  FeedbackVariant,
  ThemeVariant,
} from "../badge.types";


export const iconSizeMap: Record<BadgeSize, IconSize> = {
  lg: "sm",
  md: "sm",
  sm: "xs",
  xs: "2xs",
};

export const iconColorMap = (theme: Theme) => ({
  solid: {
    accent: theme.color.semantic.object.static.inverse.boldest,
    primary: theme.color.semantic.object.inverse.boldest,
    secondary: theme.color.semantic.object.static.inverse.boldest,
    tertiary: theme.color.semantic.object.alternative,
  },
  alpha: {
    accent: theme.color.semantic.accent.normal,
    primary: theme.color.semantic.object.boldest,
    secondary: theme.color.semantic.object.neutral,
    tertiary: theme.color.semantic.object.alternative,
  },
  outlined: {
    accent: theme.color.semantic.accent.normal,
    primary: theme.color.semantic.object.boldest,
    secondary: theme.color.semantic.object.neutral,
    tertiary: theme.color.semantic.object.alternative,
  },
});

type ContentBadgeBasicStyle = {
  solid: Record<BasicHierarchy, BadgeStyle>;
  alpha: Record<BasicHierarchy, BadgeStyle>;
  outlined: Record<BasicHierarchy, BadgeStyle>;
};

export const contentBadgeBasicStylesMap = (theme: Theme): ContentBadgeBasicStyle => ({
  solid: {
    accent: {
      bg: theme.color.semantic.accent.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    primary: {
      bg: theme.color.semantic.fill.bold,
      color: theme.color.semantic.object.inverse.boldest,
      border: "none",
    },
    secondary: {
      bg: theme.color.semantic.fill.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    tertiary: {
      bg: theme.color.semantic.fill.subtle,
      color: theme.color.semantic.object.alternative,
      border: "none",
    },
  },
  alpha: {
    accent: {
      bg: theme.color.semantic.accent.alpha.subtler,
      color: theme.color.semantic.accent.normal,
      border: "none",
    },
    primary: {
      bg: theme.color.semantic.fill.subtler,
      color: theme.color.semantic.object.bolder,
      border: "none",
    },
    secondary: {
      bg: theme.color.semantic.fill.subtle,
      color: theme.color.semantic.object.neutral,
      border: "none",
    },
    tertiary: {
      bg: theme.color.semantic.fill.subtler,
      color: theme.color.semantic.object.alternative,
      border: "none",
    },
  },
  outlined: {
    accent: {
      bg: "none",
      color: theme.color.semantic.accent.normal,
      border: theme.color.semantic.accent.alpha.subtle,
    },
    primary: {
      bg: "none",
      color: theme.color.semantic.object.bolder,
      border: theme.color.semantic.stroke.alpha.assistive,
    },
    secondary: {
      bg: "none",
      color: theme.color.semantic.object.neutral,
      border: theme.color.semantic.stroke.alpha.assistive,
    },
    tertiary: {
      bg: "none",
      color: theme.color.semantic.object.alternative,
      border: theme.color.semantic.stroke.alpha.assistive,
    },
  },
});

export const contentBadgeBasicMutedStylesMap = (
  theme: Theme,
): Record<ContentBadgeStyle, BadgeStyle> => ({
  solid: {
    bg: theme.color.semantic.fill.subtler,
    color: theme.color.semantic.object.subtle,
    border: "none",
  },
  alpha: {
    bg: theme.color.semantic.fill.subtlest,
    color: theme.color.semantic.object.subtle,
    border: "none",
  },
  outlined: {
    bg: "none",
    color: theme.color.semantic.object.subtle,
    border: theme.color.semantic.stroke.alpha.subtler,
  },
});

type ContentBadgeFeedbackStyle = {
  solid: Record<FeedbackVariant, BadgeStyle>;
  alpha: Record<FeedbackVariant, BadgeStyle>;
  outlined: Record<FeedbackVariant, BadgeStyle>;
};

export const contentBadgeFeedbackStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.semantic.feedback.positive.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
  },
  alpha: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtle,
      color: theme.color.semantic.feedback.positive.normal,
      border: "none",
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtle,
      color: theme.color.semantic.feedback.destructive.normal,
      border: "none",
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtle,
      color: theme.color.semantic.feedback.notifying.normal,
      border: "none",
    },
  },
  outlined: {
    positive: {
      bg: "none",
      color: theme.color.semantic.feedback.positive.normal,
      border: theme.color.semantic.feedback.positive.alpha.subtle,
    },
    destructive: {
      bg: "none",
      color: theme.color.semantic.feedback.destructive.normal,
      border: theme.color.semantic.feedback.destructive.alpha.subtle,
    },
    notifying: {
      bg: "none",
      color: theme.color.semantic.feedback.notifying.normal,
      border: theme.color.semantic.feedback.notifying.alpha.subtle,
    },
  },
});

export const contentBadgeFeedbackMutedStylesMap = (theme: Theme): ContentBadgeFeedbackStyle => ({
  solid: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtler,
      color: theme.color.semantic.feedback.positive.alpha.subtle,
      border: "none",
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtler,
      color: theme.color.semantic.feedback.destructive.alpha.subtle,
      border: "none",
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtler,
      color: theme.color.semantic.feedback.notifying.alpha.subtle,
      border: "none",
    },
  },
  alpha: {
    positive: {
      bg: theme.color.semantic.feedback.positive.alpha.subtlest,
      color: theme.color.semantic.feedback.positive.alpha.subtle,
      border: "none",
    },
    destructive: {
      bg: theme.color.semantic.feedback.destructive.alpha.subtlest,
      color: theme.color.semantic.feedback.destructive.alpha.subtle,
      border: "none",
    },
    notifying: {
      bg: theme.color.semantic.feedback.notifying.alpha.subtlest,
      color: theme.color.semantic.feedback.notifying.alpha.subtle,
      border: "none",
    },
  },
  outlined: {
    positive: {
      bg: "none",
      color: theme.color.semantic.feedback.positive.alpha.subtle,
      border: theme.color.semantic.feedback.positive.alpha.subtler,
    },
    destructive: {
      bg: "none",
      color: theme.color.semantic.feedback.destructive.alpha.subtle,
      border: theme.color.semantic.feedback.destructive.alpha.subtler,
    },
    notifying: {
      bg: "none",
      color: theme.color.semantic.feedback.notifying.alpha.subtle,
      border: theme.color.semantic.feedback.notifying.alpha.subtler,
    },
  },
});

type ContentBadgeThemeStyle = {
  solid: Record<ThemeVariant, BadgeStyle>;
  alpha: Record<ThemeVariant, BadgeStyle>;
  outlined: Record<ThemeVariant, BadgeStyle>;
};

export const contentBadgeThemeStylesMap = (theme: Theme): ContentBadgeThemeStyle => ({
  solid: {
    red: {
      bg: theme.color.semantic.theme.red.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    orange: {
      bg: theme.color.semantic.theme.orange.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    amber: {
      bg: theme.color.semantic.theme.amber.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    yellow: {
      bg: theme.color.semantic.theme.yellow.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    lime: {
      bg: theme.color.semantic.theme.lime.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    green: {
      bg: theme.color.semantic.theme.green.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    emerald: {
      bg: theme.color.semantic.theme.emerald.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    teal: {
      bg: theme.color.semantic.theme.teal.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    cyan: {
      bg: theme.color.semantic.theme.cyan.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    sky: {
      bg: theme.color.semantic.theme.sky.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    blue: {
      bg: theme.color.semantic.theme.blue.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    violet: {
      bg: theme.color.semantic.theme.violet.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    purple: {
      bg: theme.color.semantic.theme.purple.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    fuchsia: {
      bg: theme.color.semantic.theme.fuchsia.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    pink: {
      bg: theme.color.semantic.theme.pink.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
    rose: {
      bg: theme.color.semantic.theme.rose.neutral,
      color: theme.color.semantic.object.static.inverse.boldest,
      border: "none",
    },
  },
  alpha: {
    red: {
      bg: theme.color.semantic.theme.red.alpha.subtler,
      color: theme.color.semantic.theme.red.normal,
      border: "none",
    },
    orange: {
      bg: theme.color.semantic.theme.orange.alpha.subtler,
      color: theme.color.semantic.theme.orange.normal,
      border: "none",
    },
    amber: {
      bg: theme.color.semantic.theme.amber.alpha.subtler,
      color: theme.color.semantic.theme.amber.normal,
      border: "none",
    },
    yellow: {
      bg: theme.color.semantic.theme.yellow.alpha.subtler,
      color: theme.color.semantic.theme.yellow.normal,
      border: "none",
    },
    lime: {
      bg: theme.color.semantic.theme.lime.alpha.subtler,
      color: theme.color.semantic.theme.lime.normal,
      border: "none",
    },
    green: {
      bg: theme.color.semantic.theme.green.alpha.subtler,
      color: theme.color.semantic.theme.green.normal,
      border: "none",
    },
    emerald: {
      bg: theme.color.semantic.theme.emerald.alpha.subtler,
      color: theme.color.semantic.theme.emerald.normal,
      border: "none",
    },
    teal: {
      bg: theme.color.semantic.theme.teal.alpha.subtler,
      color: theme.color.semantic.theme.teal.normal,
      border: "none",
    },
    cyan: {
      bg: theme.color.semantic.theme.cyan.alpha.subtler,
      color: theme.color.semantic.theme.cyan.normal,
      border: "none",
    },
    sky: {
      bg: theme.color.semantic.theme.sky.alpha.subtler,
      color: theme.color.semantic.theme.sky.normal,
      border: "none",
    },
    blue: {
      bg: theme.color.semantic.theme.blue.alpha.subtler,
      color: theme.color.semantic.theme.blue.normal,
      border: "none",
    },
    violet: {
      bg: theme.color.semantic.theme.violet.alpha.subtler,
      color: theme.color.semantic.theme.violet.normal,
      border: "none",
    },
    purple: {
      bg: theme.color.semantic.theme.purple.alpha.subtler,
      color: theme.color.semantic.theme.purple.normal,
      border: "none",
    },
    fuchsia: {
      bg: theme.color.semantic.theme.fuchsia.alpha.subtler,
      color: theme.color.semantic.theme.fuchsia.normal,
      border: "none",
    },
    pink: {
      bg: theme.color.semantic.theme.pink.alpha.subtler,
      color: theme.color.semantic.theme.pink.normal,
      border: "none",
    },
    rose: {
      bg: theme.color.semantic.theme.rose.alpha.subtler,
      color: theme.color.semantic.theme.rose.normal,
      border: "none",
    },
  },
  outlined: {
    red: {
      bg: "none",
      color: theme.color.semantic.theme.red.normal,
      border: theme.color.semantic.theme.red.alpha.subtle,
    },
    orange: {
      bg: "none",
      color: theme.color.semantic.theme.orange.normal,
      border: theme.color.semantic.theme.orange.alpha.subtle,
    },
    amber: {
      bg: "none",
      color: theme.color.semantic.theme.amber.normal,
      border: theme.color.semantic.theme.amber.alpha.subtle,
    },
    yellow: {
      bg: "none",
      color: theme.color.semantic.theme.yellow.normal,
      border: theme.color.semantic.theme.yellow.alpha.subtle,
    },
    lime: {
      bg: "none",
      color: theme.color.semantic.theme.lime.normal,
      border: theme.color.semantic.theme.lime.alpha.subtle,
    },
    green: {
      bg: "none",
      color: theme.color.semantic.theme.green.normal,
      border: theme.color.semantic.theme.green.alpha.subtle,
    },
    emerald: {
      bg: "none",
      color: theme.color.semantic.theme.emerald.normal,
      border: theme.color.semantic.theme.emerald.alpha.subtle,
    },
    teal: {
      bg: "none",
      color: theme.color.semantic.theme.teal.normal,
      border: theme.color.semantic.theme.teal.alpha.subtle,
    },
    cyan: {
      bg: "none",
      color: theme.color.semantic.theme.cyan.normal,
      border: theme.color.semantic.theme.cyan.alpha.subtle,
    },
    sky: {
      bg: "none",
      color: theme.color.semantic.theme.sky.normal,
      border: theme.color.semantic.theme.sky.alpha.subtle,
    },
    blue: {
      bg: "none",
      color: theme.color.semantic.theme.blue.normal,
      border: theme.color.semantic.theme.blue.alpha.subtle,
    },
    violet: {
      bg: "none",
      color: theme.color.semantic.theme.violet.normal,
      border: theme.color.semantic.theme.violet.alpha.subtle,
    },
    purple: {
      bg: "none",
      color: theme.color.semantic.theme.purple.normal,
      border: theme.color.semantic.theme.purple.alpha.subtle,
    },
    fuchsia: {
      bg: "none",
      color: theme.color.semantic.theme.fuchsia.normal,
      border: theme.color.semantic.theme.fuchsia.alpha.subtle,
    },
    pink: {
      bg: "none",
      color: theme.color.semantic.theme.pink.normal,
      border: theme.color.semantic.theme.pink.alpha.subtle,
    },
    rose: {
      bg: "none",
      color: theme.color.semantic.theme.rose.normal,
      border: theme.color.semantic.theme.rose.alpha.subtle,
    },
  },
});

export const contentBadgeThemeMutedStylesMap = (theme: Theme): ContentBadgeThemeStyle => ({
  solid: {
    red: {
      bg: theme.color.semantic.theme.red.alpha.subtler,
      color: theme.color.semantic.theme.red.alpha.subtle,
      border: "none",
    },
    orange: {
      bg: theme.color.semantic.theme.orange.alpha.subtler,
      color: theme.color.semantic.theme.orange.alpha.subtle,
      border: "none",
    },
    amber: {
      bg: theme.color.semantic.theme.amber.alpha.subtler,
      color: theme.color.semantic.theme.amber.alpha.subtle,
      border: "none",
    },
    yellow: {
      bg: theme.color.semantic.theme.yellow.alpha.subtler,
      color: theme.color.semantic.theme.yellow.alpha.subtle,
      border: "none",
    },
    lime: {
      bg: theme.color.semantic.theme.lime.alpha.subtler,
      color: theme.color.semantic.theme.lime.alpha.subtle,
      border: "none",
    },
    green: {
      bg: theme.color.semantic.theme.green.alpha.subtler,
      color: theme.color.semantic.theme.green.alpha.subtle,
      border: "none",
    },
    emerald: {
      bg: theme.color.semantic.theme.emerald.alpha.subtler,
      color: theme.color.semantic.theme.emerald.alpha.subtle,
      border: "none",
    },
    teal: {
      bg: theme.color.semantic.theme.teal.alpha.subtler,
      color: theme.color.semantic.theme.teal.alpha.subtle,
      border: "none",
    },
    cyan: {
      bg: theme.color.semantic.theme.cyan.alpha.subtler,
      color: theme.color.semantic.theme.cyan.alpha.subtle,
      border: "none",
    },
    sky: {
      bg: theme.color.semantic.theme.sky.alpha.subtler,
      color: theme.color.semantic.theme.sky.alpha.subtle,
      border: "none",
    },
    blue: {
      bg: theme.color.semantic.theme.blue.alpha.subtler,
      color: theme.color.semantic.theme.blue.alpha.subtle,
      border: "none",
    },
    violet: {
      bg: theme.color.semantic.theme.violet.alpha.subtler,
      color: theme.color.semantic.theme.violet.alpha.subtle,
      border: "none",
    },
    purple: {
      bg: theme.color.semantic.theme.purple.alpha.subtler,
      color: theme.color.semantic.theme.purple.alpha.subtle,
      border: "none",
    },
    fuchsia: {
      bg: theme.color.semantic.theme.fuchsia.alpha.subtler,
      color: theme.color.semantic.theme.fuchsia.alpha.subtle,
      border: "none",
    },
    pink: {
      bg: theme.color.semantic.theme.pink.alpha.subtler,
      color: theme.color.semantic.theme.pink.alpha.subtle,
      border: "none",
    },
    rose: {
      bg: theme.color.semantic.theme.rose.alpha.subtler,
      color: theme.color.semantic.theme.rose.alpha.subtle,
      border: "none",
    },
  },
  alpha: {
    red: {
      bg: theme.color.semantic.theme.red.alpha.subtlest,
      color: theme.color.semantic.theme.red.alpha.assistive,
      border: "none",
    },
    orange: {
      bg: theme.color.semantic.theme.orange.alpha.subtlest,
      color: theme.color.semantic.theme.orange.alpha.assistive,
      border: "none",
    },
    amber: {
      bg: theme.color.semantic.theme.amber.alpha.subtlest,
      color: theme.color.semantic.theme.amber.alpha.assistive,
      border: "none",
    },
    yellow: {
      bg: theme.color.semantic.theme.yellow.alpha.subtlest,
      color: theme.color.semantic.theme.yellow.alpha.assistive,
      border: "none",
    },
    lime: {
      bg: theme.color.semantic.theme.lime.alpha.subtlest,
      color: theme.color.semantic.theme.lime.alpha.assistive,
      border: "none",
    },
    green: {
      bg: theme.color.semantic.theme.green.alpha.subtlest,
      color: theme.color.semantic.theme.green.alpha.assistive,
      border: "none",
    },
    emerald: {
      bg: theme.color.semantic.theme.emerald.alpha.subtlest,
      color: theme.color.semantic.theme.emerald.alpha.assistive,
      border: "none",
    },
    teal: {
      bg: theme.color.semantic.theme.teal.alpha.subtlest,
      color: theme.color.semantic.theme.teal.alpha.assistive,
      border: "none",
    },
    cyan: {
      bg: theme.color.semantic.theme.cyan.alpha.subtlest,
      color: theme.color.semantic.theme.cyan.alpha.assistive,
      border: "none",
    },
    sky: {
      bg: theme.color.semantic.theme.sky.alpha.subtlest,
      color: theme.color.semantic.theme.sky.alpha.assistive,
      border: "none",
    },
    blue: {
      bg: theme.color.semantic.theme.blue.alpha.subtlest,
      color: theme.color.semantic.theme.blue.alpha.assistive,
      border: "none",
    },
    violet: {
      bg: theme.color.semantic.theme.violet.alpha.subtlest,
      color: theme.color.semantic.theme.violet.alpha.assistive,
      border: "none",
    },
    purple: {
      bg: theme.color.semantic.theme.purple.alpha.subtlest,
      color: theme.color.semantic.theme.purple.alpha.assistive,
      border: "none",
    },
    fuchsia: {
      bg: theme.color.semantic.theme.fuchsia.alpha.subtlest,
      color: theme.color.semantic.theme.fuchsia.alpha.assistive,
      border: "none",
    },
    pink: {
      bg: theme.color.semantic.theme.pink.alpha.subtlest,
      color: theme.color.semantic.theme.pink.alpha.assistive,
      border: "none",
    },
    rose: {
      bg: theme.color.semantic.theme.rose.alpha.subtlest,
      color: theme.color.semantic.theme.rose.alpha.assistive,
      border: "none",
    },
  },
  outlined: {
    red: {
      bg: "none",
      color: theme.color.semantic.theme.red.alpha.assistive,
      border: theme.color.semantic.theme.red.alpha.subtler,
    },
    orange: {
      bg: "none",
      color: theme.color.semantic.theme.orange.alpha.assistive,
      border: theme.color.semantic.theme.orange.alpha.subtler,
    },
    amber: {
      bg: "none",
      color: theme.color.semantic.theme.amber.alpha.assistive,
      border: theme.color.semantic.theme.amber.alpha.subtler,
    },
    yellow: {
      bg: "none",
      color: theme.color.semantic.theme.yellow.alpha.assistive,
      border: theme.color.semantic.theme.yellow.alpha.subtler,
    },
    lime: {
      bg: "none",
      color: theme.color.semantic.theme.lime.alpha.assistive,
      border: theme.color.semantic.theme.lime.alpha.subtler,
    },
    green: {
      bg: "none",
      color: theme.color.semantic.theme.green.alpha.assistive,
      border: theme.color.semantic.theme.green.alpha.subtler,
    },
    emerald: {
      bg: "none",
      color: theme.color.semantic.theme.emerald.alpha.assistive,
      border: theme.color.semantic.theme.emerald.alpha.subtler,
    },
    teal: {
      bg: "none",
      color: theme.color.semantic.theme.teal.alpha.assistive,
      border: theme.color.semantic.theme.teal.alpha.subtler,
    },
    cyan: {
      bg: "none",
      color: theme.color.semantic.theme.cyan.alpha.assistive,
      border: theme.color.semantic.theme.cyan.alpha.subtler,
    },
    sky: {
      bg: "none",
      color: theme.color.semantic.theme.sky.alpha.assistive,
      border: theme.color.semantic.theme.sky.alpha.subtler,
    },
    blue: {
      bg: "none",
      color: theme.color.semantic.theme.blue.alpha.assistive,
      border: theme.color.semantic.theme.blue.alpha.subtler,
    },
    violet: {
      bg: "none",
      color: theme.color.semantic.theme.violet.alpha.assistive,
      border: theme.color.semantic.theme.violet.alpha.subtler,
    },
    purple: {
      bg: "none",
      color: theme.color.semantic.theme.purple.alpha.assistive,
      border: theme.color.semantic.theme.purple.alpha.subtler,
    },
    fuchsia: {
      bg: "none",
      color: theme.color.semantic.theme.fuchsia.alpha.assistive,
      border: theme.color.semantic.theme.fuchsia.alpha.subtler,
    },
    pink: {
      bg: "none",
      color: theme.color.semantic.theme.pink.alpha.assistive,
      border: theme.color.semantic.theme.pink.alpha.subtler,
    },
    rose: {
      bg: "none",
      color: theme.color.semantic.theme.rose.alpha.assistive,
      border: theme.color.semantic.theme.rose.alpha.subtler,
    },
  },
});
