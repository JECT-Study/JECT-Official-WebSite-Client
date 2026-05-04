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

  return {
    ref,
    pressableProps: {
      ...mergeProps(buttonProps, hoverProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
