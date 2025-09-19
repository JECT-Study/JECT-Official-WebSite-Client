import { Theme } from '@emotion/react';
import { BadgeStyle, ThemeVariant } from '../badge.types';

type FeedbackBadgeStyle = {
  solid: Record<ThemeVariant, BadgeStyle>;
  alpha: Record<ThemeVariant, BadgeStyle>;
  outlined: Record<ThemeVariant, BadgeStyle>;
};

export const THEME_BADGE_STYLE = (theme: Theme): FeedbackBadgeStyle => ({
  solid: {
    red: {
      bg: theme.color.theme.red.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    orange: {
      bg: theme.color.theme.orange.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    amber: {
      bg: theme.color.theme.amber.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    yellow: {
      bg: theme.color.theme.yellow.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    lime: {
      bg: theme.color.theme.lime.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    green: {
      bg: theme.color.theme.green.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    emerald: {
      bg: theme.color.theme.emerald.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    teal: {
      bg: theme.color.theme.teal.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    cyan: {
      bg: theme.color.theme.cyan.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    sky: {
      bg: theme.color.theme.sky.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    blue: {
      bg: theme.color.theme.blue.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    violet: {
      bg: theme.color.theme.violet.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    purple: {
      bg: theme.color.theme.purple.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    fuchsia: {
      bg: theme.color.theme.fuchsia.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    pink: {
      bg: theme.color.theme.pink.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    rose: {
      bg: theme.color.theme.rose.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
  },
  alpha: {
    red: {
      bg: theme.color.theme.red.alpha.subtler,
      color: theme.color.theme.red.normal,
      border: 'none',
    },
    orange: {
      bg: theme.color.theme.orange.alpha.subtler,
      color: theme.color.theme.orange.normal,
      border: 'none',
    },
    amber: {
      bg: theme.color.theme.amber.alpha.subtler,
      color: theme.color.theme.amber.normal,
      border: 'none',
    },
    yellow: {
      bg: theme.color.theme.yellow.alpha.subtler,
      color: theme.color.theme.yellow.normal,
      border: 'none',
    },
    lime: {
      bg: theme.color.theme.lime.alpha.subtler,
      color: theme.color.theme.lime.normal,
      border: 'none',
    },
    green: {
      bg: theme.color.theme.green.alpha.subtler,
      color: theme.color.theme.green.normal,
      border: 'none',
    },
    emerald: {
      bg: theme.color.theme.emerald.alpha.subtler,
      color: theme.color.theme.emerald.normal,
      border: 'none',
    },
    teal: {
      bg: theme.color.theme.teal.alpha.subtler,
      color: theme.color.theme.teal.normal,
      border: 'none',
    },
    cyan: {
      bg: theme.color.theme.cyan.alpha.subtler,
      color: theme.color.theme.cyan.normal,
      border: 'none',
    },
    sky: {
      bg: theme.color.theme.sky.alpha.subtler,
      color: theme.color.theme.sky.normal,
      border: 'none',
    },
    blue: {
      bg: theme.color.theme.blue.alpha.subtler,
      color: theme.color.theme.blue.normal,
      border: 'none',
    },
    violet: {
      bg: theme.color.theme.violet.alpha.subtler,
      color: theme.color.theme.violet.normal,
      border: 'none',
    },
    purple: {
      bg: theme.color.theme.purple.alpha.subtler,
      color: theme.color.theme.purple.normal,
      border: 'none',
    },
    fuchsia: {
      bg: theme.color.theme.fuchsia.alpha.subtler,
      color: theme.color.theme.fuchsia.normal,
      border: 'none',
    },
    pink: {
      bg: theme.color.theme.pink.alpha.subtler,
      color: theme.color.theme.pink.normal,
      border: 'none',
    },
    rose: {
      bg: theme.color.theme.rose.alpha.subtler,
      color: theme.color.theme.rose.normal,
      border: 'none',
    },
  },
  outlined: {
    red: {
      bg: 'none',
      color: theme.color.theme.red.normal,
      border: theme.color.theme.red.alpha.neutral,
    },
    orange: {
      bg: 'none',
      color: theme.color.theme.orange.normal,
      border: theme.color.theme.orange.alpha.neutral,
    },
    amber: {
      bg: 'none',
      color: theme.color.theme.amber.normal,
      border: theme.color.theme.amber.alpha.neutral,
    },
    yellow: {
      bg: 'none',
      color: theme.color.theme.yellow.normal,
      border: theme.color.theme.yellow.alpha.neutral,
    },
    lime: {
      bg: 'none',
      color: theme.color.theme.lime.normal,
      border: theme.color.theme.lime.alpha.neutral,
    },
    green: {
      bg: 'none',
      color: theme.color.theme.green.normal,
      border: theme.color.theme.green.alpha.neutral,
    },
    emerald: {
      bg: 'none',
      color: theme.color.theme.emerald.normal,
      border: theme.color.theme.emerald.alpha.neutral,
    },
    teal: {
      bg: 'none',
      color: theme.color.theme.teal.normal,
      border: theme.color.theme.teal.alpha.neutral,
    },
    cyan: {
      bg: 'none',
      color: theme.color.theme.cyan.normal,
      border: theme.color.theme.cyan.alpha.neutral,
    },
    sky: {
      bg: 'none',
      color: theme.color.theme.sky.normal,
      border: theme.color.theme.sky.alpha.neutral,
    },
    blue: {
      bg: 'none',
      color: theme.color.theme.blue.normal,
      border: theme.color.theme.blue.alpha.neutral,
    },
    violet: {
      bg: 'none',
      color: theme.color.theme.violet.normal,
      border: theme.color.theme.violet.alpha.neutral,
    },
    purple: {
      bg: 'none',
      color: theme.color.theme.purple.normal,
      border: theme.color.theme.purple.alpha.neutral,
    },
    fuchsia: {
      bg: 'none',
      color: theme.color.theme.fuchsia.normal,
      border: theme.color.theme.fuchsia.alpha.neutral,
    },
    pink: {
      bg: 'none',
      color: theme.color.theme.pink.normal,
      border: theme.color.theme.pink.alpha.neutral,
    },
    rose: {
      bg: 'none',
      color: theme.color.theme.rose.normal,
      border: theme.color.theme.rose.alpha.neutral,
    },
  },
});

export const THEME_BADGE_STYLE_MUTED = (theme: Theme) => ({
  solid: {
    red: {
      bg: theme.color.theme.red.alpha.subtle,
      color: theme.color.theme.red.alpha.alternative,
      border: 'none',
    },
    orange: {
      bg: theme.color.theme.orange.alpha.subtle,
      color: theme.color.theme.orange.alpha.alternative,
      border: 'none',
    },
    amber: {
      bg: theme.color.theme.amber.alpha.subtle,
      color: theme.color.theme.amber.alpha.alternative,
      border: 'none',
    },
    yellow: {
      bg: theme.color.theme.yellow.alpha.subtle,
      color: theme.color.theme.yellow.alpha.alternative,
      border: 'none',
    },
    lime: {
      bg: theme.color.theme.lime.alpha.subtle,
      color: theme.color.theme.lime.alpha.alternative,
      border: 'none',
    },
    green: {
      bg: theme.color.theme.green.alpha.subtle,
      color: theme.color.theme.green.alpha.alternative,
      border: 'none',
    },
    emerald: {
      bg: theme.color.theme.emerald.alpha.subtle,
      color: theme.color.theme.emerald.alpha.alternative,
      border: 'none',
    },
    teal: {
      bg: theme.color.theme.teal.alpha.subtle,
      color: theme.color.theme.teal.alpha.alternative,
      border: 'none',
    },
    cyan: {
      bg: theme.color.theme.cyan.alpha.subtle,
      color: theme.color.theme.cyan.alpha.alternative,
      border: 'none',
    },
    sky: {
      bg: theme.color.theme.sky.alpha.subtle,
      color: theme.color.theme.sky.alpha.alternative,
      border: 'none',
    },
    blue: {
      bg: theme.color.theme.blue.alpha.subtle,
      color: theme.color.theme.blue.alpha.alternative,
      border: 'none',
    },
    violet: {
      bg: theme.color.theme.violet.alpha.subtle,
      color: theme.color.theme.violet.alpha.alternative,
      border: 'none',
    },
    purple: {
      bg: theme.color.theme.purple.alpha.subtle,
      color: theme.color.theme.purple.alpha.alternative,
      border: 'none',
    },
    fuchsia: {
      bg: theme.color.theme.fuchsia.alpha.subtle,
      color: theme.color.theme.fuchsia.alpha.alternative,
      border: 'none',
    },
    pink: {
      bg: theme.color.theme.pink.alpha.subtle,
      color: theme.color.theme.pink.alpha.alternative,
      border: 'none',
    },
    rose: {
      bg: theme.color.theme.rose.alpha.subtle,
      color: theme.color.theme.rose.alpha.alternative,
      border: 'none',
    },
  },
  alpha: {
    red: {
      bg: theme.color.theme.red.alpha.subtlest,
      color: theme.color.theme.red.alpha.assistive,
      border: 'none',
    },
    orange: {
      bg: theme.color.theme.orange.alpha.subtlest,
      color: theme.color.theme.orange.alpha.assistive,
      border: 'none',
    },
    amber: {
      bg: theme.color.theme.amber.alpha.subtlest,
      color: theme.color.theme.amber.alpha.assistive,
      border: 'none',
    },
    yellow: {
      bg: theme.color.theme.yellow.alpha.subtlest,
      color: theme.color.theme.yellow.alpha.assistive,
      border: 'none',
    },
    lime: {
      bg: theme.color.theme.lime.alpha.subtlest,
      color: theme.color.theme.lime.alpha.assistive,
      border: 'none',
    },
    green: {
      bg: theme.color.theme.green.alpha.subtlest,
      color: theme.color.theme.green.alpha.assistive,
      border: 'none',
    },
    emerald: {
      bg: theme.color.theme.emerald.alpha.subtlest,
      color: theme.color.theme.emerald.alpha.assistive,
      border: 'none',
    },
    teal: {
      bg: theme.color.theme.teal.alpha.subtlest,
      color: theme.color.theme.teal.alpha.assistive,
      border: 'none',
    },
    cyan: {
      bg: theme.color.theme.cyan.alpha.subtlest,
      color: theme.color.theme.cyan.alpha.assistive,
      border: 'none',
    },
    sky: {
      bg: theme.color.theme.sky.alpha.subtlest,
      color: theme.color.theme.sky.alpha.assistive,
      border: 'none',
    },
    blue: {
      bg: theme.color.theme.blue.alpha.subtlest,
      color: theme.color.theme.blue.alpha.assistive,
      border: 'none',
    },
    violet: {
      bg: theme.color.theme.violet.alpha.subtlest,
      color: theme.color.theme.violet.alpha.assistive,
      border: 'none',
    },
    purple: {
      bg: theme.color.theme.purple.alpha.subtlest,
      color: theme.color.theme.purple.alpha.assistive,
      border: 'none',
    },
    fuchsia: {
      bg: theme.color.theme.fuchsia.alpha.subtlest,
      color: theme.color.theme.fuchsia.alpha.assistive,
      border: 'none',
    },
    pink: {
      bg: theme.color.theme.pink.alpha.subtlest,
      color: theme.color.theme.pink.alpha.assistive,
      border: 'none',
    },
    rose: {
      bg: theme.color.theme.rose.alpha.subtlest,
      color: theme.color.theme.rose.alpha.assistive,
      border: 'none',
    },
  },
  outlined: {
    red: {
      bg: 'none',
      color: theme.color.theme.red.alpha.assistive,
      border: theme.color.theme.red.alpha.subtle,
    },
    orange: {
      bg: 'none',
      color: theme.color.theme.orange.alpha.assistive,
      border: theme.color.theme.orange.alpha.subtle,
    },
    amber: {
      bg: 'none',
      color: theme.color.theme.amber.alpha.assistive,
      border: theme.color.theme.amber.alpha.subtle,
    },
    yellow: {
      bg: 'none',
      color: theme.color.theme.yellow.alpha.assistive,
      border: theme.color.theme.yellow.alpha.subtle,
    },
    lime: {
      bg: 'none',
      color: theme.color.theme.lime.alpha.assistive,
      border: theme.color.theme.lime.alpha.subtle,
    },
    green: {
      bg: 'none',
      color: theme.color.theme.green.alpha.assistive,
      border: theme.color.theme.green.alpha.subtle,
    },
    emerald: {
      bg: 'none',
      color: theme.color.theme.emerald.alpha.assistive,
      border: theme.color.theme.emerald.alpha.subtle,
    },
    teal: {
      bg: 'none',
      color: theme.color.theme.teal.alpha.assistive,
      border: theme.color.theme.teal.alpha.subtle,
    },
    cyan: {
      bg: 'none',
      color: theme.color.theme.cyan.alpha.assistive,
      border: theme.color.theme.cyan.alpha.subtle,
    },
    sky: {
      bg: 'none',
      color: theme.color.theme.sky.alpha.assistive,
      border: theme.color.theme.sky.alpha.subtle,
    },
    blue: {
      bg: 'none',
      color: theme.color.theme.blue.alpha.assistive,
      border: theme.color.theme.blue.alpha.subtle,
    },
    violet: {
      bg: 'none',
      color: theme.color.theme.violet.alpha.assistive,
      border: theme.color.theme.violet.alpha.subtle,
    },
    purple: {
      bg: 'none',
      color: theme.color.theme.purple.alpha.assistive,
      border: theme.color.theme.purple.alpha.subtle,
    },
    fuchsia: {
      bg: 'none',
      color: theme.color.theme.fuchsia.alpha.assistive,
      border: theme.color.theme.fuchsia.alpha.subtle,
    },
    pink: {
      bg: 'none',
      color: theme.color.theme.pink.alpha.assistive,
      border: theme.color.theme.pink.alpha.subtle,
    },
    rose: {
      bg: 'none',
      color: theme.color.theme.rose.alpha.assistive,
      border: theme.color.theme.rose.alpha.subtle,
    },
  },
});
