import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { ForwardedRef } from "react";

type PressableElementType = "button" | "a" | "div" | "span" | "input";

interface UsePressableOptions {
  disabled?: boolean;
  //NOTE: Host element 종류이며 `useButton`의 dispatch에 사용된다.
  elementType?: PressableElementType;
}

/**
 * disabled는 `elementType`에 따라 자동 분기 — `'button'`은 native `disabled`,
 * 그 외는 `aria-disabled` + `role='button'` + focusable (`useButton` 위임).
 */
export function usePressable<T extends HTMLElement>(
  forwardedRef: ForwardedRef<T>,
  { disabled = false, elementType = "button" }: UsePressableOptions = {},
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps, isPressed } = useButton({ isDisabled: disabled, elementType }, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  // native `<button>`는 브라우저가 Enter/Space 활성화를 직접 처리한다.
  // 반면 `useButton`(react-aria)의 onKeyDown은 Enter/Space에서 `preventDefault()`를 호출하는데,
  // 이는 `event.defaultPrevented`를 true로 만들어 같은 엘리먼트에 합성된 다른 onKeyDown
  // (예: Radix `Trigger`를 `asChild`로 감쌌을 때의 핸들러)을 건너뛰게 한다.
  // (Radix `composeEventHandlers`가 `checkForDefaultPrevented`로 검사) → IconButton/LabelButton/
  // BlockButton을 메뉴·팝오버 트리거로 쓰면 마우스/↓는 열리지만 Enter/Space로는 안 열리는 버그.
  // 따라서 native button에서는 react-aria의 onKeyDown을 비우고 브라우저 기본 동작에 맡긴다.
  // (button이 아닌 elementType은 키보드 활성화 합성이 필요하므로 react-aria 동작을 유지한다.)
  // NOTE: native button 키보드 누름 시 press 오버레이는 CSS `:active` fallback이 커버한다.
  const resolvedButtonProps =
    elementType === "button" ? { ...buttonProps, onKeyDown: undefined } : buttonProps;

  return {
    ref,
    pressableProps: {
      ...mergeProps(resolvedButtonProps, hoverProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
