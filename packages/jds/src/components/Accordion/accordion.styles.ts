import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem } from 'utils';

import type {
  AccordionSize,
  AccordionStyledProps,
  AccordionHeaderProps,
  AccordionBodyProps,
} from './accordion.types';

import type { IconSize } from '@/components/Icon/Icon.types';

export const iconSizeMap: Record<AccordionSize, IconSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
};

const sizeStyles: Record<AccordionSize, (theme: Theme) => { padding: string; gap: string; borderRadius: string }> = {
  lg: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[16]} ${theme.scheme.semantic.spacing[20]}`,
    gap: theme.scheme.semantic.spacing[16],
    borderRadius: `${theme.scheme.semantic.radius[8]}px`,
  }),
  md: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[12]} ${theme.scheme.semantic.spacing[16]}`,
    gap: theme.scheme.semantic.spacing[12],
    borderRadius: `${theme.scheme.semantic.radius[6]}px`,
  }),
  sm: (theme: Theme) => ({
    padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[12]}`,
    gap: theme.scheme.semantic.spacing[8],
    borderRadius: `${theme.scheme.semantic.radius[4]}px`,
  }),
};

const headerSizeStyles: Record<AccordionSize, (theme: Theme) => CSSObject> = {
  lg: (theme: Theme) => ({
    minHeight: theme.scheme.semantic.spacing[56],
  }),
  md: (theme: Theme) => ({
    minHeight: theme.scheme.semantic.spacing[48],
  }),
  sm: (theme: Theme) => ({
    minHeight: theme.scheme.semantic.spacing[40],
  }),
};

const interactionStyles = (theme: Theme, size: AccordionSize, disabled: boolean): CSSObject => {
  const styles = sizeStyles[size](theme);
  const borderRadiusValue = parseInt(styles.borderRadius);

  const makeLayer = (state: 'rest' | 'hover' | 'active' | 'focus') =>
    InteractionLayer({
      theme,
      state,
      variant: 'normal',
      density: 'subtle',
      fillColor: 'default',
      isDisabled: disabled,
      offsetVertical: 0,
      offsetHorizontal: 0,
      borderRadius: borderRadiusValue,
    });

  if (disabled) {
    return {
      ...makeLayer('rest'),
      cursor: 'not-allowed',
    };
  }

  return {
    ...makeLayer('rest'),
    cursor: 'pointer',
    '&:hover': {
      ...makeLayer('hover'),
    },
    '&:active': {
      ...makeLayer('active'),
    },
    '&:focus-visible': {
      ...makeLayer('focus'),
    },
  };
};

export const StyledAccordionContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<AccordionStyledProps>(({ theme, $isStretched, $disabled }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: $isStretched ? '100%' : 'auto',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    opacity: $disabled ? 0.5 : 1,
    transition: `all ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
  };
});

export const StyledAccordionHeader = styled('button', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<AccordionHeaderProps>(({ theme, $size, $disabled }) => {
  const styles = sizeStyles[$size](theme);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: styles.padding,
    gap: styles.gap,
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    ...headerSizeStyles[$size](theme),
    ...interactionStyles(theme, $size, $disabled),

    '&:disabled': {
      cursor: 'not-allowed',
    },
  };
});

export const StyledHeaderContent = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[8],
  flex: 1,
}));

export const StyledLabelText = styled.span<{ $size: AccordionSize; $disabled: boolean }>(
  ({ theme, $size, $disabled }) => {
    const textStyleMap: Record<AccordionSize, keyof typeof theme.textStyle> = {
      lg: 'semantic-textStyle-body-md-bold',
      md: 'semantic-textStyle-body-sm-bold',
      sm: 'semantic-textStyle-body-xs-bold',
    };

    return {
      ...theme.textStyle[textStyleMap[$size]],
      color: $disabled ? theme.color.semantic.object.assistive : theme.color.semantic.object.normal,
      flex: 1,
    };
  },
);

export const StyledChevronIcon = styled.div<{
  $isExpanded: boolean;
  $disabled: boolean;
}>(({ theme, $isExpanded, $disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: $isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: `transform ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
  color: $disabled ? theme.color.semantic.object.assistive : theme.color.semantic.object.normal,
}));

export const StyledAccordionBody = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<AccordionBodyProps>(({ theme, $size, $isExpanded }) => {
  const styles = sizeStyles[$size](theme);
  const duration = theme.environment.semantic.duration[200];
  const easing = theme.environment.semantic.motion.fluent;

  return {
    display: $isExpanded ? 'block' : 'none',
    padding: styles.padding,
    paddingTop: 0,
    animation: $isExpanded ? `slideDown ${duration} ${easing}` : `slideUp ${duration} ${easing}`,

    '@keyframes slideDown': {
      from: {
        opacity: 0,
        transform: `translateY(${pxToRem(-10)})`,
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },

    '@keyframes slideUp': {
      from: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      to: {
        opacity: 0,
        transform: `translateY(${pxToRem(-10)})`,
      },
    },
  };
});

export const StyledBodyText = styled.div<{ $size: AccordionSize }>(({ theme, $size }) => {
  const textStyleMap: Record<AccordionSize, keyof typeof theme.textStyle> = {
    lg: 'semantic-textStyle-body-md-normal',
    md: 'semantic-textStyle-body-sm-normal',
    sm: 'semantic-textStyle-body-xs-normal',
  };

  return {
    ...theme.textStyle[textStyleMap[$size]],
    color: theme.color.semantic.object.normal,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };
});
