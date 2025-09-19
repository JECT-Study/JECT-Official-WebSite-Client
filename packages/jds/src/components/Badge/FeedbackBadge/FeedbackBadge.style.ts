import styled from '@emotion/styled';
import { pxToRem } from 'utils';
import { Theme } from '@emotion/react';
import { TextStyle } from 'types';
import { BadgeSize, BadgeStyle, BadgeVariant } from '../Badge.types';

const FEEDBACK_BADGE_STYLE = (theme: Theme) => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.neutral,
      color: theme.color.object.inverse.boldest,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.neutral,
      color: theme.color.object.static.inverse.boldest,
      border: 'none',
    },
  },
  alpha: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtle,
      color: theme.color.feedback.positive.normal,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtle,
      color: theme.color.feedback.destructive.normal,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtle,
      color: theme.color.feedback.notifying.normal,
      border: 'none',
    },
  },
  outlined: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.normal,
      border: theme.color.feedback.positive.alpha.neutral,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.normal,
      border: theme.color.feedback.destructive.alpha.neutral,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.normal,
      border: theme.color.feedback.notifying.alpha.neutral,
    },
  },
});

const FEEDBACK_BADGE_STYLE_MUTED = (theme: Theme) => ({
  solid: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtle,
      color: theme.color.feedback.positive.alpha.alternative,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtle,
      color: theme.color.feedback.destructive.alpha.alternative,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtle,
      color: theme.color.feedback.notifying.alpha.alternative,
      border: 'none',
    },
  },
  alpha: {
    positive: {
      bg: theme.color.feedback.positive.alpha.subtlest,
      color: theme.color.feedback.positive.alpha.assistive,
      border: 'none',
    },
    destructive: {
      bg: theme.color.feedback.destructive.alpha.subtlest,
      color: theme.color.feedback.destructive.alpha.assistive,
      border: 'none',
    },
    notifying: {
      bg: theme.color.feedback.notifying.alpha.subtlest,
      color: theme.color.feedback.notifying.alpha.assistive,
      border: 'none',
    },
  },
  outlined: {
    positive: {
      bg: 'none',
      color: theme.color.feedback.positive.alpha.subtle,
      border: theme.color.feedback.positive.alpha.assistive,
    },
    destructive: {
      bg: 'none',
      color: theme.color.feedback.destructive.alpha.subtle,
      border: theme.color.feedback.destructive.alpha.assistive,
    },
    notifying: {
      bg: 'none',
      color: theme.color.feedback.notifying.alpha.subtle,
      border: theme.color.feedback.notifying.alpha.assistive,
    },
  },
});

const BASIC_BADGE_SIZE: Record<
  BadgeSize,
  { minWidth: number; padding: string; textStyle: TextStyle }
> = {
  lg: {
    minWidth: 28,
    padding: '2px 6px',
    textStyle: 'label.lg.normal',
  },
  md: {
    minWidth: 27,
    padding: '2px 6px',
    textStyle: 'label.md.normal',
  },
  sm: {
    minWidth: 24,
    padding: '2px 6px',
    textStyle: 'label.sm.normal',
  },
  xs: {
    minWidth: 20,
    padding: '1px 4px',
    textStyle: 'label.xs.normal',
  },
};

interface FeedbackBadgeDivProps {
  variant: BadgeVariant;
  size: BadgeSize;
  type: BadgeStyle;
  isMuted: boolean;
}

export const FeedbackBadgeDiv = styled.div<FeedbackBadgeDivProps>(
  ({ theme, variant, size, type, isMuted }) => {
    const backgroundColor = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].bg
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].bg;
    const color = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].color
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].color;
    const border = isMuted
      ? FEEDBACK_BADGE_STYLE_MUTED(theme)[type][variant].border
      : FEEDBACK_BADGE_STYLE(theme)[type][variant].border;

    return {
      minWidth: pxToRem(BASIC_BADGE_SIZE[size].minWidth),
      padding: BASIC_BADGE_SIZE[size].padding,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0px',
      backgroundColor,
      color,
      border: `1px solid ${border}`,
      borderRadius: theme.scheme.desktop.radius[4],
    };
  },
);
