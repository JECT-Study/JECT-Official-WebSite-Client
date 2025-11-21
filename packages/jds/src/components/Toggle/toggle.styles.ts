import isPropValid from '@emotion/is-prop-valid';
import type { CSSObject, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { InteractionLayer, pxToRem } from 'utils';

import type { ToggleSize, ToggleStyledProps, ToggleThumbProps } from './toggle.types';

// 토글 크기별 원본 값 (px 단위)
const toggleSizeValues: Record<
  ToggleSize,
  { width: number; height: number; thumbSize: number; thumbOffset: number }
> = {
  lg: { width: 56, height: 32, thumbSize: 24, thumbOffset: 4 },
  md: { width: 44, height: 24, thumbSize: 18, thumbOffset: 3 },
};

// 토글 크기별 스타일 맵 (디자인 토큰 기반, 계산 자동화)
const sizeStyles: Record<
  ToggleSize,
  (theme: Theme) => {
    width: string;
    height: string;
    thumbSize: string;
    thumbOffset: string;
    borderRadius: string;
    moveDistance: number; // 자동 계산된 이동 거리
  }
> = {
  lg: (theme: Theme) => {
    const values = toggleSizeValues.lg;
    return {
      width: theme.scheme.semantic.spacing[56],
      height: theme.scheme.semantic.spacing[32],
      thumbSize: theme.scheme.semantic.spacing[24],
      thumbOffset: theme.scheme.semantic.spacing[4],
      borderRadius: theme.scheme.semantic.radius[16],
      moveDistance: values.width - values.thumbSize - values.thumbOffset * 2,
    };
  },
  md: (theme: Theme) => {
    const values = toggleSizeValues.md;
    return {
      width: pxToRem(values.width),
      height: theme.scheme.semantic.spacing[24],
      thumbSize: pxToRem(values.thumbSize),
      thumbOffset: theme.scheme.semantic.spacing[3],
      borderRadius: theme.scheme.semantic.radius[12],
      moveDistance: values.width - values.thumbSize - values.thumbOffset * 2,
    };
  },
};

// 애니메이션 관련 스타일
const interactionStyles = (theme: Theme, size: ToggleSize, disabled: boolean): CSSObject => {
  const borderRadius = size === 'lg' ? 16 : 12;

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
    '::after': {
      ...makeLayer('rest')['::after'],
      transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
    },
    '&:hover': {
      ...makeLayer('hover'),
      '::after': {
        ...makeLayer('hover')['::after'],
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
      },
    },
    '&:active': {
      ...makeLayer('active'),
      '::after': {
        ...makeLayer('active')['::after'],
        transition: 'none',
      },
    },
    '&:focus-visible': {
      ...makeLayer('focus'),
      '::after': {
        ...makeLayer('focus')['::after'],
        transition: 'none',
      },
    },
  };
};

// 토글 트랙 스타일
export const StyledToggleTrack = styled('button', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<ToggleStyledProps>(({ theme, $size, $isChecked, $disabled }) => {
  const styles = sizeStyles[$size](theme);

  const getBackgroundColor = () => {
    if ($disabled) {
      return $isChecked
        ? theme.color.semantic.accent.alpha.subtlest
        : theme.color.semantic.fill.subtlest;
    }
    return $isChecked ? theme.color.semantic.accent.neutral : theme.color.semantic.fill.neutral;
  };

  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: styles.width,
    height: styles.height,
    borderRadius: styles.borderRadius,
    backgroundColor: getBackgroundColor(),
    border: 'none',
    padding: 0,
    transition: `background-color ${theme.environment.semantic.duration[200]} ${theme.environment.semantic.motion.fluent}`,
    opacity: $disabled ? 0.5 : 1,
    ...interactionStyles(theme, $size, $disabled),

    '&:disabled': {
      cursor: 'not-allowed',
    },
  };
});

// 토글 썸
export const StyledToggleThumb = styled('span', {
  shouldForwardProp: prop => isPropValid(prop) && !prop.startsWith('$'),
})<ToggleThumbProps>(({ theme, $size, $isChecked, $disabled }) => {
  const styles = sizeStyles[$size](theme);

  const getThumbColor = () => {
    if ($disabled) {
      return $isChecked
        ? theme.color.semantic.accent.alpha.subtler
        : theme.color.semantic.object.assistive;
    }
    return $isChecked
      ? theme.color.semantic.object.static.inverse.boldest
      : theme.color.semantic.object.inverse.boldest;
  };

  const transitionDuration = theme.environment.semantic.duration[200];
  const transitionEasing = theme.environment.semantic.motion.fluent;

  return {
    position: 'absolute',
    left: styles.thumbOffset,
    width: styles.thumbSize,
    height: styles.thumbSize,
    borderRadius: '50%',
    backgroundColor: getThumbColor(),
    transform: $isChecked ? `translateX(${pxToRem(styles.moveDistance)})` : 'translateX(0)',
    transition: `transform ${transitionDuration} ${transitionEasing}, background-color ${transitionDuration} ${transitionEasing}`,
    pointerEvents: 'none',
  };
});
