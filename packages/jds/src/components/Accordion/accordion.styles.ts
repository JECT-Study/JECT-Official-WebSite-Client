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

const sizeStyles: Record<AccordionSize, { padding: string; gap: number; borderRadius: number }> = {
  lg: {
    padding: `${pxToRem(16)} ${pxToRem(20)}`,
    gap: 16,
    borderRadius: 8,
  },
  md: {
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    gap: 12,
    borderRadius: 6,
  },
  sm: {
    padding: `${pxToRem(8)} ${pxToRem(12)}`,
    gap: 8,
    borderRadius: 4,
  },
};

const headerSizeStyles: Record<AccordionSize, CSSObject> = {
  lg: {
    minHeight: pxToRem(56),
  },
  md: {
    minHeight: pxToRem(48),
  },
  sm: {
    minHeight: pxToRem(40),
  },
};

const interactionStyles = (theme: Theme, size: AccordionSize, disabled: boolean): CSSObject => {
  const { borderRadius } = sizeStyles[size];

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
      borderRadius,
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
})<AccordionStyledProps>(({ $isStretched, $disabled }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: $isStretched ? '100%' : 'auto',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    opacity: $disabled ? 0.5 : 1,
    transition: 'all 200ms ease-in-out',
  };
});

export const StyledAccordionHeader = styled('button', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<AccordionHeaderProps>(({ theme, $size, $disabled }) => {
  const { padding, gap } = sizeStyles[$size];

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding,
    gap: pxToRem(gap),
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    ...headerSizeStyles[$size],
    ...interactionStyles(theme, $size, $disabled),

    '&:disabled': {
      cursor: 'not-allowed',
    },
  };
});

export const StyledHeaderContent = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: pxToRem(8),
  flex: 1,
});

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
  transition: 'transform 200ms ease-in-out',
  color: $disabled ? theme.color.semantic.object.assistive : theme.color.semantic.object.normal,
}));

export const StyledAccordionBody = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<AccordionBodyProps>(({ $size, $isExpanded }) => {
  const { padding } = sizeStyles[$size];

  return {
    display: $isExpanded ? 'block' : 'none',
    padding,
    paddingTop: 0,
    animation: $isExpanded ? 'slideDown 200ms ease-in-out' : 'slideUp 200ms ease-in-out',

    '@keyframes slideDown': {
      from: {
        opacity: 0,
        transform: 'translateY(-10px)',
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
        transform: 'translateY(-10px)',
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
