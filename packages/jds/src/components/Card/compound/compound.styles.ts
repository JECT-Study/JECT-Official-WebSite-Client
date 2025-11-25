import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem, shadow } from 'utils';

import { createLabelStyles } from '../../Label/createLabelStyles';
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
    plate: 12,
    post: {
      outlined: 10,
      empty: 0,
    },
  } as const;

  const borderRadius =
    variant === 'plate' ? borderRadiusParams.plate : borderRadiusParams.post[style || 'outlined'];

  if (variant === 'post') {
    const styleParams = {
      outlined: {
        border: `1px solid ${theme.color.semantic.stroke.subtle}`,
        padding: theme.scheme.semantic.spacing[20],
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
}>(({ theme, $layout, $variant, $cardStyle, $isDisabled }) => {
  const positionStyle = {
    position: 'relative' as const,
    zIndex: 0,
  };

  const layoutStyles = getLayoutStyles($layout);
  const { styles: variantStyles, borderRadius } = getVariantStyles(theme, $variant, $cardStyle);

  const interactiveFocusStyle = InteractionLayer({
    theme,
    state: 'focus',
    variant: 'normal',
    density: 'assistive',
    fillColor: 'default',
    isDisabled: false,
    offsetVertical: 0,
    offsetHorizontal: 0,
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
        outlined: theme.scheme.semantic.spacing[20],
        empty: theme.scheme.semantic.spacing[24],
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
    ...positionStyle,
    display: 'flex',
    gap,
    ...layoutStyles,
    ...variantStyles,
    '--card-title-color': $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.bolder,
    '--card-label-color': $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.neutral,
    '--card-body-color': $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.normal,
    '--card-caption-color': $isDisabled
      ? theme.color.semantic.object.subtle
      : theme.color.semantic.object.alternative,
  };

  return {
    ...baseStyles,
    '&[data-interactive="true"]': {
      transition: `transform ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}, box-shadow ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`,
      '&:hover': {
        transform: 'translateY(-2px)',
        ...shadow(theme, 'raised'),
      },
      '&:active': {
        transform: 'translateY(0)',
        transition: 'none',
      },
      '&:has([data-overlay]:focus-visible)': {
        transform: 'translateY(-2px)',
        ...shadow(theme, 'raised'),
        ...interactiveFocusStyle,
        '::after': {
          ...interactiveFocusStyle['::after'],
          transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
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

  const sizeMap = {
    plate: {
      vertical: {
        width: '100%',
        height: pxToRem(200),
      },
      horizontal: {
        width: pxToRem(120),
        height: '100%',
      },
    },
    post: {
      vertical: {
        width: '100%',
        height: pxToRem(200),
      },
      horizontal: {
        width: pxToRem(80),
        height: pxToRem(80),
      },
    },
  } as const;

  const borderRadius = $variant === 'post' ? 0 : borderRadiusMap[$layout];

  return {
    flexShrink: 0,
    overflow: 'hidden',
    ...(typeof borderRadius === 'number' ? {} : borderRadius),
    ...sizeMap[$variant][$layout],
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
    flex: '1 0 0',
  };

  const styleMap = {
    plate: {
      vertical: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
        alignSelf: 'stretch' as const,
        borderTop: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      },
      horizontal: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
        alignSelf: 'stretch' as const,
        borderLeft: `1px solid ${theme.color.semantic.stroke.alpha.subtler}`,
      },
    },
    post: {
      vertical: {
        padding: theme.scheme.semantic.spacing[20],
        gap: theme.scheme.semantic.spacing[16],
      },
      horizontal: {
        gap: theme.scheme.semantic.spacing[16],
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
  padding: 0,
  alignSelf: 'stretch',
  gap: theme.scheme.semantic.spacing[16],
  [theme.breakPoint.tablet]: {
    gap: theme.scheme.semantic.spacing[16],
  },
  [theme.breakPoint.mobile]: {
    gap: theme.scheme.semantic.spacing[16],
  },
}));

export const StyledCardMetaItem = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: 'sm', weight: 'normal' }),
  color: 'var(--card-caption-color)',
}));

export const StyledCardMetaNudgeItem = styled.span(({ theme }) => ({
  display: 'flex',
  padding: 0,
  alignItems: 'center',
  gap: theme.scheme.semantic.spacing[4],
  marginLeft: 'auto',
  flexShrink: 0,
  opacity: 0,
  color: 'var(--card-caption-color)',
  transition: `opacity ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}, transform ${theme.environment.semantic.duration[150]} ${theme.environment.semantic.motion.fluent}`,

  '[data-interactive="true"]:hover &': {
    opacity: 1,
    transform: 'translateX(2px)',
  },
}));

export const StyledCardMetaNudgeItemLabel = styled.span(({ theme }) => ({
  ...createLabelStyles(theme, { size: 'sm', weight: 'normal' }),
  color: 'var(--card-caption-color)',
}));

export const StyledCardTitle = styled('h3', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(({ theme }) => ({
  //Todo: Title에는 weight가 존재하지 않음, 수정된 토큰명으로 변경 필요
  ...createLabelStyles(theme, { size: 'lg', weight: 'normal' }),
  color: 'var(--card-title-color)',
  margin: 0,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  alignSelf: 'stretch',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const StyledCardLabel = styled('h4', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: 'lg', weight: 'bold' }),
  color: 'var(--card-label-color)',
  margin: 0,
  flex: '1 0 0',
  alignSelf: 'stretch',
}));

export const StyledCardBody = styled('p', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: 'sm', weight: 'normal' }),
  color: 'var(--card-body-color)',
  margin: 0,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  alignSelf: 'stretch',
  overflow: 'hidden',
}));

export const StyledCardCaption = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(({ theme }) => ({
  ...createLabelStyles(theme, { size: 'xs', weight: 'subtle' }),
  color: 'var(--card-caption-color)',
}));

export const StyledCardOverlay = styled('a', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})(() => {
  return {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 'inherit',
    outline: 'none',
  };
});
