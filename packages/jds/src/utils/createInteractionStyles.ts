import type { CSSObject, Theme } from "@emotion/react";
import type { Variant, Density, FillColor, InteractionLayerState } from "types";

import { InteractionLayer } from "./interactionLayer";

export interface InteractionStylesConfig {
  theme: Theme;
  variant: Variant;
  density: Density;
  fillColor: FillColor;
  isDisabled?: boolean;
  borderRadius?: number;
  offset?: {
    vertical: number;
    horizontal: number;
  };
  /**
   * 상태별 InteractionLayer 매핑 커스터마이징
   *
   * @description
   * 기본값:
   * - rest: 'rest'
   * - hover: 'hover'
   * - active: 'active'
   * - focus: 'focus'
   * - disabled: 'rest'
   */
  stateMapping?: {
    rest?: InteractionLayerState;
    hover?: InteractionLayerState;
    active?: InteractionLayerState;
    focus?: InteractionLayerState;
    disabled?: InteractionLayerState;
  };
  /**
   * 트랜지션 커스터마이징
   *
   * @description
   * 기본값:
   * - duration: 100
   * - motion: 'fluent'
   * - properties: ['opacity']
   *
   */
  transition?: {
    duration?: keyof Theme["environment"]["semantic"]["duration"];
    motion?: keyof Theme["environment"]["semantic"]["motion"];
    properties?: Array<"opacity" | "background-color" | "transform" | "box-shadow">;
  };
}

/**
 * 인터랙션 스타일 생성 헬퍼
 *
 * @description
 * InteractionLayer를 사용하여 rest, hover, active, focus 상태의 스타일을 일관되게 생성합니다.
 * 여러 컴포넌트에서 중복되는 인터랙션 로직을 제거합니다.
 *
 * @param config - 인터랙션 스타일 설정
 * @returns rest, hover, active, focus 상태의 CSS 객체
 *
 */
export const createInteractionStyles = (config: InteractionStylesConfig): CSSObject => {
  const {
    theme,
    variant,
    density,
    fillColor,
    isDisabled = false,
    borderRadius = 0,
    offset = { vertical: 0, horizontal: 0 },
    stateMapping = {},
    transition = {},
  } = config;

  const actualStateMapping = {
    rest: stateMapping.rest ?? "rest",
    hover: stateMapping.hover ?? "hover",
    active: stateMapping.active ?? "active",
    focus: stateMapping.focus ?? "focus",
    disabled: stateMapping.disabled ?? "rest",
  } as const;

  const actualTransition = {
    duration: transition.duration ?? ("100" as const),
    motion: transition.motion ?? ("fluent" as const),
    properties: transition.properties ?? ["opacity"],
  };

  const baseParams = {
    theme,
    variant,
    density,
    fillColor,
    isDisabled,
    borderRadius,
    offsetVertical: offset.vertical,
    offsetHorizontal: offset.horizontal,
  };

  const states = {
    rest: InteractionLayer({ ...baseParams, state: actualStateMapping.rest }),
    hover: InteractionLayer({ ...baseParams, state: actualStateMapping.hover }),
    active: InteractionLayer({ ...baseParams, state: actualStateMapping.active }),
    focus: InteractionLayer({ ...baseParams, state: actualStateMapping.focus }),
  };

  const transitionValue = `${actualTransition.properties.join(", ")} ${theme.environment.semantic.duration[actualTransition.duration]} ${theme.environment.semantic.motion[actualTransition.motion]}`;

  if (isDisabled) {
    const disabledState = InteractionLayer({
      ...baseParams,
      state: actualStateMapping.disabled,
    });

    return {
      position: "relative",
      outline: "none",
      ...disabledState,
    };
  }

  return {
    ...states.rest,
    "::after": {
      ...states.rest["::after"],
      transition: transitionValue,
    },
    "&:hover": {
      ...states.hover,
      "::after": {
        ...states.hover["::after"],
        transition: transitionValue,
      },
    },
    "&:active": {
      ...states.active,
      "::after": {
        ...states.active["::after"],
        transition: "none",
      },
    },
    "&:focus-visible": {
      ...states.focus,
      "::after": {
        ...states.focus["::after"],
        transition: "none",
      },
    },
  };
};
