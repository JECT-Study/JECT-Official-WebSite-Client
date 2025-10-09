import { Theme } from '@emotion/react';
import { Density, FillColor, InteractionState, Variant } from 'types';

export function interaction(
  theme: Theme,
  variant: Variant,
  density: Density,
  fillColor: FillColor,
  state: InteractionState = 'default',
) {
  const createAfter = (backgroundColor: string) => {
    const baseStyle = {
      position: 'relative',
      outline: 'none',
    };

    const afterBaseStyle = {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: backgroundColor,
      borderRadius: 'inherit',
    };

    if (state === 'locked') {
      return {
        ...baseStyle,
        '::after': { ...afterBaseStyle, opacity: 0.08 },
      };
    }

    if (state === 'disabled') {
      return {
        ...baseStyle,
        '::after': { ...afterBaseStyle, opacity: 0.05 },
      };
    }

    if (state === 'readonly') {
      return {
        ...baseStyle,
        '::after': { ...afterBaseStyle, opacity: 0 },
      };
    }

    return {
      ...baseStyle,
      '::after': { ...afterBaseStyle, opacity: 0 },
      '&:hover::after': { opacity: 0.08 },
      '&:active::after': { opacity: 0.12 },
      '&:focus-visible': { boxShadow: `0 0 0 3px ${theme.color.interaction.focus}` },
    };
  };

  if (fillColor === 'default') {
    if (variant === 'normal') {
      if (density === 'bold') return createAfter(theme.color.interaction.bold);
      if (density === 'normal') return createAfter(theme.color.interaction.normal);
      if (density === 'assistive') return createAfter(theme.color.interaction.assistive);
      if (density === 'subtle') return createAfter(theme.color.interaction.subtle);
    } else if (variant === 'accent') {
      if (density === 'bold') return createAfter(theme.color.accent.bold);
      if (density === 'normal') return createAfter(theme.color.accent.normal);
      if (density === 'assistive') return createAfter(theme.color.accent.neutral);
      if (density === 'subtle') return createAfter(theme.color.accent.alternative);
    } else if (variant === 'positive') {
      if (density === 'bold') return createAfter(theme.color.feedback.positive.bold);
      if (density === 'normal') return createAfter(theme.color.feedback.positive.normal);
      if (density === 'assistive') return createAfter(theme.color.feedback.positive.neutral);
      if (density === 'subtle') return createAfter(theme.color.feedback.positive.alternative);
    } else if (variant === 'destructive') {
      if (density === 'bold') return createAfter(theme.color.feedback.destructive.bold);
      if (density === 'normal') return createAfter(theme.color.feedback.destructive.normal);
      if (density === 'assistive') return createAfter(theme.color.feedback.destructive.neutral);
      if (density === 'subtle') return createAfter(theme.color.feedback.destructive.alternative);
    }
  } else if (fillColor === 'inverse') {
    if (variant === 'normal') {
      if (density === 'bold') return createAfter(theme.color.interaction.inverse.bold);
      if (density === 'normal') return createAfter(theme.color.interaction.inverse.normal);
      if (density === 'assistive') return createAfter(theme.color.interaction.inverse.assistive);
      if (density === 'subtle') return createAfter(theme.color.interaction.inverse.subtle);
    } else if (variant === 'accent') {
      if (density === 'bold') return createAfter(theme.color.accent.inverse.bold);
      if (density === 'normal') return createAfter(theme.color.accent.inverse.normal);
      if (density === 'assistive') return createAfter(theme.color.accent.inverse.neutral);
      if (density === 'subtle') return createAfter(theme.color.accent.inverse.alternative);
    } else if (variant === 'positive') {
      if (density === 'bold') return createAfter(theme.color.feedback.positive.inverse.bold);
      if (density === 'normal') return createAfter(theme.color.feedback.positive.inverse.normal);
      if (density === 'assistive')
        return createAfter(theme.color.feedback.positive.inverse.neutral);
      if (density === 'subtle')
        return createAfter(theme.color.feedback.positive.inverse.alternative);
    } else if (variant === 'destructive') {
      if (density === 'bold') return createAfter(theme.color.feedback.destructive.inverse.bold);
      if (density === 'normal') return createAfter(theme.color.feedback.destructive.inverse.normal);
      if (density === 'assistive')
        return createAfter(theme.color.feedback.destructive.inverse.neutral);
      if (density === 'subtle')
        return createAfter(theme.color.feedback.destructive.inverse.alternative);
    }
  }

  return {};
}
