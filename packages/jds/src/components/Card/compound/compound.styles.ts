import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, shadow } from 'utils';

import type { CardTitleVariant } from '../Card.context';
import type { CardLayout, CardVariant, CardStyle } from '../Card.types';

const SHADOW_DEFAULT = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';

const getLayoutStyles = (layout: CardLayout): CSSObject => {
  const layoutMap: Record<CardLayout, CSSObject> = {
    vertical: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
    },
  };

  return layoutMap[layout];
};

const getVariantStyles = (
  theme: Theme,
  variant: CardVariant,
  style: CardStyle | undefined,
): { styles: CSSObject; borderRadius: number } => {
  const borderRadiusParams = {
    plate: theme.scheme.desktop.radius[12],
    post: {
      outlined: theme.scheme.desktop.radius[10],
      empty: 0,
    },
  } as const;

  const borderRadius =
    variant === 'plate' ? borderRadiusParams.plate : borderRadiusParams.post[style || 'outlined'];

  if (variant === 'post') {
    const styleParams = {
      outlined: {
        border: `1px solid ${theme.color.semantic.stroke.subtle}`,
        padding: pxToRem(theme.scheme.desktop.spacing[20]),
        borderRadius: `${borderRadius}px`,
        backgroundColor: theme.color.semantic.surface.shallow,
        boxShadow: SHADOW_DEFAULT,
      },
      empty: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
        borderRadius: borderRadius === 0 ? '0' : `${borderRadius}px`,
        boxShadow: 'none',
      },
    } as const;

    const selectedStyle = styleParams[style || 'outlined'];

    return {
      styles: {
        ...selectedStyle,
        overflow: 'hidden',
      },
      borderRadius,
    };
  }

  return {
    styles: {
      padding: 0,
      borderRadius: `${borderRadius}px`,
      backgroundColor: theme.color.semantic.surface.shallow,
      border: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      boxShadow: SHADOW_DEFAULT,
    },
    borderRadius,
  };
};

export const StyledCardRoot = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<{
  $layout: CardLayout;
  $variant: CardVariant;
  $cardStyle?: CardStyle;
  $isDisabled: boolean;
  $titleVariant: CardTitleVariant;
}>(({ theme, $layout, $variant, $cardStyle, $isDisabled, $titleVariant }) => {
  const layoutStyles = getLayoutStyles($layout);
  const { styles: variantStyles, borderRadius } = getVariantStyles(theme, $variant, $cardStyle);

  const offsetMap = {
    post: {
      empty: {
        title: { vertical: 12, horizontal: 12 },
        label: { vertical: 10, horizontal: 10 },
        none: { vertical: 0, horizontal: 0 },
      },
    },
  } as const;

  const offset =
    $variant === 'post' && $cardStyle === 'empty'
      ? offsetMap.post.empty[$titleVariant]
      : { vertical: 0, horizontal: 0 };

  const restStyle = InteractionLayer({
    theme,
    state: 'rest',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    offsetVertical: offset.vertical,
    offsetHorizontal: offset.horizontal,
    borderRadius,
  });

  const hoverStyle = InteractionLayer({
    theme,
    state: 'hover',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    offsetVertical: offset.vertical,
    offsetHorizontal: offset.horizontal,
    borderRadius,
  });

  const activeStyle = InteractionLayer({
    theme,
    state: 'active',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    offsetVertical: offset.vertical,
    offsetHorizontal: offset.horizontal,
    borderRadius,
  });

  const focusStyle = InteractionLayer({
    theme,
    state: 'focus',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: $isDisabled,
    offsetVertical: offset.vertical,
    offsetHorizontal: offset.horizontal,
    borderRadius,
  });

  const gapBaseMap = {
    plate: {
      vertical: 0,
      horizontal: 0,
    },
    post: {
      vertical: 0,
      horizontal: {
        outlined: pxToRem(theme.scheme.desktop.spacing[20]),
        empty: pxToRem(theme.scheme.desktop.spacing[24]),
      },
    },
  } as const;

  const gapMap = {
    plate: {
      vertical: gapBaseMap.plate.vertical,
      horizontal: gapBaseMap.plate.horizontal,
    },
    post: {
      vertical: gapBaseMap.post.vertical,
      horizontal: gapBaseMap.post.horizontal[$cardStyle || 'outlined'],
    },
  };

  const gap = gapMap[$variant][$layout];

  const baseStyles: CSSObject = {
    display: 'flex',
    gap,
    ...layoutStyles,
    ...variantStyles,
  };

  if ($isDisabled) {
    return {
      ...baseStyles,
      'a&, button&': {
        cursor: 'not-allowed',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        outline: 'none',
      },
    };
  }

  return {
    ...baseStyles,
    'a&, button&': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      ...restStyle,
      '::after': {
        ...restStyle['::after'],
        transition: `opacity ${theme.environment.duration[150]} ${theme.environment.motion.fluent}`,
      },
      '&:hover': {
        ...hoverStyle,
        transform: 'translateY(-2px)',
        ...shadow(theme, 'desktop', 'raised'),
        '::after': {
          ...hoverStyle['::after'],
          transition: `opacity ${theme.environment.duration[150]} ${theme.environment.motion.fluent}`,
        },
      },
      '&:active': {
        ...activeStyle,
        '::after': {
          ...activeStyle['::after'],
          transition: 'none',
        },
      },
      '&:focus-visible': {
        ...focusStyle,
        transform: 'translateY(-2px)',
        ...shadow(theme, 'desktop', 'raised'),
        '::after': {
          ...focusStyle['::after'],
          transition: `opacity ${theme.environment.duration[100]} ${theme.environment.motion.fluent}`,
        },
      },
    },
  };
});

export const StyledCardImageContainer = styled.div<{
  $layout: CardLayout;
  $variant: CardVariant;
  $cardStyle?: CardStyle;
}>(({ $layout, $variant }) => {
  if ($variant === 'post') {
    return {
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: 0,
      width: $layout === 'vertical' ? '100%' : 'auto',
    };
  }

  const borderRadiusMap = {
    vertical: {
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    horizontal: {
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 0,
    },
  } as const;

  return {
    flexShrink: 0,
    overflow: 'hidden',
    ...borderRadiusMap[$layout],
    width: $layout === 'vertical' ? '100%' : 'auto',
  };
});

export const StyledCardContent = styled.div<{
  $variant: CardVariant;
  $layout: CardLayout;
}>(({ theme, $variant, $layout }) => {
  const baseStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    minWidth: 0,
  };

  const styleMap = {
    plate: {
      vertical: {
        maxHeight: pxToRem(233),
        padding: pxToRem(theme.scheme.desktop.spacing[20]),
        gap: pxToRem(theme.scheme.desktop.spacing[16]),
        alignSelf: 'stretch' as const,
      },
      horizontal: {
        maxHeight: pxToRem(233),
        padding: pxToRem(theme.scheme.desktop.spacing[20]),
        gap: pxToRem(theme.scheme.desktop.spacing[16]),
        flex: '1 0 0',
        alignSelf: 'stretch' as const,
      },
    },
    post: {
      vertical: {
        padding: 0,
        gap: pxToRem(theme.scheme.desktop.spacing[16]),
        flex: '1 0 0',
      },
      horizontal: {
        padding: 0,
        gap: pxToRem(theme.scheme.desktop.spacing[16]),
        flex: '1 0 0',
      },
    },
  };

  return {
    ...baseStyles,
    ...styleMap[$variant][$layout],
  };
});

export const StyledCardMeta = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: pxToRem(theme.scheme.desktop.spacing[8]),
  marginTop: pxToRem(theme.scheme.desktop.spacing[8]),

  [theme.breakPoint.tablet]: {
    gap: pxToRem(theme.scheme.tablet.spacing[6]),
    marginTop: pxToRem(theme.scheme.tablet.spacing[6]),
  },

  [theme.breakPoint.mobile]: {
    gap: pxToRem(theme.scheme.mobile.spacing[4]),
    marginTop: pxToRem(theme.scheme.mobile.spacing[4]),
  },
}));

export const StyledCardMetaDivider = styled.span(({ theme }) => ({
  width: '1px',
  height: pxToRem(12),
  backgroundColor: theme.color.semantic.stroke.alpha.subtler,
}));
