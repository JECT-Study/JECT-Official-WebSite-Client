import type { CSSObject, Theme } from "@emotion/react";
import type { InteractionLayerState, Density, FillColor, Variant } from "types";

import { pxToRem } from "./cssUnit";

export interface InteractionLayerParams {
  theme: Theme;
  state: InteractionLayerState;
  variant: Variant;
  density: Density;
  fillColor: FillColor;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isLocked?: boolean;
  offsetVertical?: number;
  offsetHorizontal?: number;
  borderRadius?: number;
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

/**
 * Focus outline width는 px로 고정
 * 이유: 접근성을 위해 명확하고 선명한 outline이 필요하므로 서브픽셀 렌더링 방지
 */
const FOCUS_OUTLINE_WIDTH = "3px";

const getBackgroundColor = (
  theme: Theme,
  variant: Variant,
  density: Density,
  fillColor: FillColor,
): string => {
  const colorMap = {
    normal: {
      bold: {
        default: theme.color.semantic.interaction.bold,
        inverse: theme.color.semantic.interaction.inverse.bold,
      },
      normal: {
        default: theme.color.semantic.interaction.normal,
        inverse: theme.color.semantic.interaction.inverse.normal,
      },
      assistive: {
        default: theme.color.semantic.interaction.assistive,
        inverse: theme.color.semantic.interaction.inverse.assistive,
      },
      subtle: {
        default: theme.color.semantic.interaction.subtle,
        inverse: theme.color.semantic.interaction.inverse.subtle,
      },
    },
    accent: {
      bold: {
        default: theme.color.semantic.accent.bold,
        inverse: theme.color.semantic.accent.inverse.bold,
      },
      normal: {
        default: theme.color.semantic.accent.normal,
        inverse: theme.color.semantic.accent.inverse.normal,
      },
      assistive: {
        default: theme.color.semantic.accent.neutral,
        inverse: theme.color.semantic.accent.inverse.neutral,
      },
      subtle: {
        default: theme.color.semantic.accent.alternative,
        inverse: theme.color.semantic.accent.inverse.alternative,
      },
    },
    positive: {
      bold: {
        default: theme.color.semantic.feedback.positive.bold,
        inverse: theme.color.semantic.feedback.positive.inverse.bold,
      },
      normal: {
        default: theme.color.semantic.feedback.positive.normal,
        inverse: theme.color.semantic.feedback.positive.inverse.normal,
      },
      assistive: {
        default: theme.color.semantic.feedback.positive.neutral,
        inverse: theme.color.semantic.feedback.positive.inverse.neutral,
      },
      subtle: {
        default: theme.color.semantic.feedback.positive.alternative,
        inverse: theme.color.semantic.feedback.positive.inverse.alternative,
      },
    },
    destructive: {
      bold: {
        default: theme.color.semantic.feedback.destructive.bold,
        inverse: theme.color.semantic.feedback.destructive.inverse.bold,
      },
      normal: {
        default: theme.color.semantic.feedback.destructive.normal,
        inverse: theme.color.semantic.feedback.destructive.inverse.normal,
      },
      assistive: {
        default: theme.color.semantic.feedback.destructive.neutral,
        inverse: theme.color.semantic.feedback.destructive.inverse.neutral,
      },
      subtle: {
        default: theme.color.semantic.feedback.destructive.alternative,
        inverse: theme.color.semantic.feedback.destructive.inverse.alternative,
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
 * ::after 의사 요소를 사용하여 주어진 state에 대한 스타일만 생성합니다.
 *
 * 중요: 컴포넌트의 실제 인터랙션 상태(hover, active, focus)와
 * InteractionLayer의 state는 독립적으로 설정할 수 있습니다.
 *
 * 예: 컴포넌트 hover 시 InteractionLayer state='rest' 사용 가능
 *
 * @param theme - Emotion 테마 객체
 * @param state - InteractionLayer 시각적 상태 (rest, hover, active, focus)
 * @param variant - 색상 변형 (normal, accent, positive, destructive)
 * @param density - 색상 강도 (bold, normal, assistive, subtle)
 * @param fillColor - 배경 타입 (default, inverse)
 * @param isReadonly - 읽기 전용 상태
 * @param isDisabled - 비활성화 상태
 * @param isLocked - 잠김 상태
 * @param offsetVertical - 상하 방향 오프셋 (px 단위)
 * @param offsetHorizontal - 좌우 방향 오프셋 (px 단위)
 * @param borderRadius - 테두리 둥글기 (px 단위)
 *
 * @example
 * // 일반적인 사용 (컴포넌트 상태 = InteractionLayer 상태)
 * '&:hover': InteractionLayer({ theme, state: 'hover', ... })
 *
 * @example
 * // 독립적인 사용 (컴포넌트 hover 시에도 InteractionLayer는 rest)
 * '&:hover': InteractionLayer({ theme, state: 'rest', ... })
 *
 * @example
 * // offset과 borderRadius를 사용하여 더 큰 터치 영역과 둥근 모서리 제공
 * InteractionLayer({ theme, state: 'hover', ..., offsetVertical: 4, offsetHorizontal: 8, borderRadius: 4 })
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
  offsetVertical = 0,
  offsetHorizontal = 0,
  borderRadius = 0,
}: InteractionLayerParams): CSSObject {
  const backgroundColor = getBackgroundColor(theme, variant, density, fillColor);
  const opacity = getOpacity(state, isReadonly, isDisabled, isLocked);
  const isSpecialState = hasSpecialState(isReadonly, isDisabled, isLocked);

  const hasVerticalOffset = offsetVertical > 0;
  const hasHorizontalOffset = offsetHorizontal > 0;

  const topBottomValue = hasVerticalOffset ? pxToRem(-offsetVertical) : 0;
  const leftRightValue = hasHorizontalOffset ? pxToRem(-offsetHorizontal) : 0;

  const hasOffset = hasVerticalOffset || hasHorizontalOffset;
  const isFocusState = state === "focus" && !isSpecialState;

  const baseStyle: CSSObject = {
    position: "relative",
    outline: "none",
    borderRadius: borderRadius > 0 ? `${borderRadius}px` : 0,
    "::before": {
      content: '""',
      position: "absolute",
      top: hasOffset ? topBottomValue : 0,
      right: hasOffset && hasHorizontalOffset ? leftRightValue : undefined,
      bottom: hasOffset && hasVerticalOffset ? topBottomValue : undefined,
      left: hasOffset ? leftRightValue : 0,
      width: hasOffset && hasHorizontalOffset ? "auto" : "100%",
      height: hasOffset && hasVerticalOffset ? "auto" : "100%",
      borderRadius: borderRadius > 0 ? `${borderRadius}px` : 0,
      boxShadow: `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${theme.color.semantic.interaction.focus}`,
      opacity: isFocusState && hasOffset ? 1 : 0,
      pointerEvents: "none",
    },
    "::after": {
      content: '""',
      position: "absolute",
      top: topBottomValue,
      right: hasHorizontalOffset ? leftRightValue : undefined,
      bottom: hasVerticalOffset ? topBottomValue : undefined,
      left: leftRightValue,
      width: hasHorizontalOffset ? "auto" : "100%",
      height: hasVerticalOffset ? "auto" : "100%",
      borderRadius: borderRadius > 0 ? `${borderRadius}px` : 0,
      backgroundColor,
      opacity,
      pointerEvents: "none",
    },
  };

  if (isFocusState && !hasOffset) {
    baseStyle.boxShadow = `0 0 0 ${FOCUS_OUTLINE_WIDTH} ${theme.color.semantic.interaction.focus}`;
  }

  return baseStyle;
}
