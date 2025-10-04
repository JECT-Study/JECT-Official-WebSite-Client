import type { CSSObject, Theme } from '@emotion/react';
import type { InteractionLayerState, Density, FillColor, Variant } from 'types';

import { pxToRem } from './cssUnit';

export interface InteractionLayerParams {
  theme: Theme;
  state: InteractionLayerState;
  variant: Variant;
  density: Density;
  fillColor: FillColor;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isLocked?: boolean;
}

const STATE_OPACITY = {
  rest: 0,
  hover: 0.08,
  active: 0.12,
  focus: 0,
} as const;

const SPECIAL_STATE_OPACITY = {
  readonly: 0,
  disabled: 0.05,
  locked: 0.08,
} as const;

const FOCUS_OUTLINE_WIDTH = pxToRem(3);

const getBackgroundColor = (
  theme: Theme,
  variant: Variant,
  density: Density,
  fillColor: FillColor,
): string => {
  const colorMap = {
    normal: {
      bold: {
        default: theme.color.interaction.bold,
        inverse: theme.color.interaction.inverse.bold,
      },
      normal: {
        default: theme.color.interaction.normal,
        inverse: theme.color.interaction.inverse.normal,
      },
      assistive: {
        default: theme.color.interaction.assistive,
        inverse: theme.color.interaction.inverse.assistive,
      },
      subtle: {
        default: theme.color.interaction.subtle,
        inverse: theme.color.interaction.inverse.subtle,
      },
    },
    accent: {
      bold: {
        default: theme.color.accent.bold,
        inverse: theme.color.accent.inverse.bold,
      },
      normal: {
        default: theme.color.accent.normal,
        inverse: theme.color.accent.inverse.normal,
      },
      assistive: {
        default: theme.color.accent.neutral,
        inverse: theme.color.accent.inverse.neutral,
      },
      subtle: {
        default: theme.color.accent.alternative,
        inverse: theme.color.accent.inverse.alternative,
      },
    },
    positive: {
      bold: {
        default: theme.color.feedback.positive.bold,
        inverse: theme.color.feedback.positive.inverse.bold,
      },
      normal: {
        default: theme.color.feedback.positive.normal,
        inverse: theme.color.feedback.positive.inverse.normal,
      },
      assistive: {
        default: theme.color.feedback.positive.neutral,
        inverse: theme.color.feedback.positive.inverse.neutral,
      },
      subtle: {
        default: theme.color.feedback.positive.alternative,
        inverse: theme.color.feedback.positive.inverse.alternative,
      },
    },
    destructive: {
      bold: {
        default: theme.color.feedback.destructive.bold,
        inverse: theme.color.feedback.destructive.inverse.bold,
      },
      normal: {
        default: theme.color.feedback.destructive.normal,
        inverse: theme.color.feedback.destructive.inverse.normal,
      },
      assistive: {
        default: theme.color.feedback.destructive.neutral,
        inverse: theme.color.feedback.destructive.inverse.neutral,
      },
      subtle: {
        default: theme.color.feedback.destructive.alternative,
        inverse: theme.color.feedback.destructive.inverse.alternative,
      },
    },
  };

  return colorMap[variant][density][fillColor];
};

const getOpacity = (
  state: InteractionLayerState,
  isReadonly: boolean,
  isDisabled: boolean,
  isLocked: boolean,
): number => {
  if (isReadonly) return SPECIAL_STATE_OPACITY.readonly;
  if (isDisabled) return SPECIAL_STATE_OPACITY.disabled;
  if (isLocked) return SPECIAL_STATE_OPACITY.locked;
  return STATE_OPACITY[state];
};

const hasSpecialState = (isReadonly: boolean, isDisabled: boolean, isLocked: boolean): boolean => {
  return isReadonly || isDisabled || isLocked;
};

/**
 * 인터랙션 레이어 스타일 생성
 *
 * @description
 * Figma 스펙에 맞춰 variant + density + fillColor 조합으로 색상 토큰을 결정합니다.
 * ::after 의사 요소를 사용하여 hover, active, focus 상태를 시각적으로 표현합니다.
 *
 * @param theme - Emotion 테마 객체
 * @param state - 인터랙션 상태 (rest, hover, active, focus)
 * @param variant - 색상 변형 (normal, accent, positive, destructive)
 * @param density - 색상 강도 (bold, normal, assistive, subtle)
 * @param fillColor - 배경 타입 (default, inverse)
 * @param isReadonly - 읽기 전용 상태
 * @param isDisabled - 비활성화 상태
 * @param isLocked - 잠김 상태
 *
 * @example
 * // 기본 사용
 * InteractionLayer({
 *   theme,
 *   state: 'rest',
 *   variant: 'normal',
 *   density: 'normal',
 *   fillColor: 'default',
 * })
 *
 * @example
 * // accent variant + assistive density
 * InteractionLayer({
 *   theme,
 *   state: 'hover',
 *   variant: 'accent',
 *   density: 'assistive',
 *   fillColor: 'default',
 * })
 * // → theme.color.accent.neutral 색상 사용
 *
 * @example
 * // disabled 상태
 * InteractionLayer({
 *   theme,
 *   state: 'rest',
 *   variant: 'normal',
 *   density: 'normal',
 *   fillColor: 'default',
 *   isDisabled: true,
 * })
 */
export function InteractionLayer({
  theme,
  state,
  variant,
  density,
  fillColor,
  isReadonly = false,
  isDisabled = false,
  isLocked = false,
}: InteractionLayerParams): CSSObject {
  const backgroundColor = getBackgroundColor(theme, variant, density, fillColor);
  const opacity = getOpacity(state, isReadonly, isDisabled, isLocked);
  const isSpecialState = hasSpecialState(isReadonly, isDisabled, isLocked);

  const baseStyle: CSSObject = {
    position: 'relative',
    outline: 'none',
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor,
      opacity,
      transition: 'opacity 0.2s ease-in-out',
      pointerEvents: 'none',
    },
  };

  if (!isSpecialState) {
    if (state === 'rest') {
      baseStyle['&:hover::after'] = { opacity: STATE_OPACITY.hover };
      baseStyle['&:active::after'] = { opacity: STATE_OPACITY.active };
    }

    baseStyle['&:focus-visible'] = {
      boxShadow: `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${theme.color.interaction.focus}`,
    };
  }

  return baseStyle;
}
