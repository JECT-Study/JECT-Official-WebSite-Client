import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { ForwardedRef } from "react";

interface UseButtonInteractionsOptions {
  disabled?: boolean;
}

export function useButtonInteractions<T extends HTMLElement>(
  forwardedRef: ForwardedRef<T>,
  { disabled = false }: UseButtonInteractionsOptions = {},
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps, isPressed } = useButton({ isDisabled: disabled }, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  return {
    ref,
    buttonProps: {
      ...mergeProps(buttonProps, hoverProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": disabled || undefined,
    },
  };
}
