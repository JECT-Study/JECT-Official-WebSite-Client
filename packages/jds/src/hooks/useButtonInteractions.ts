import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import type { ForwardedRef } from "react";

interface UseButtonInteractionsOptions {
  isDisabled?: boolean;
}

export function useButtonInteractions<T extends HTMLElement>(
  forwardedRef: ForwardedRef<T>,
  { isDisabled = false }: UseButtonInteractionsOptions = {},
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps, isPressed } = useButton({ isDisabled }, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  return {
    ref,
    buttonProps: {
      ...mergeProps(buttonProps, hoverProps, focusProps),
      "data-hovered": isHovered || undefined,
      "data-pressed": isPressed || undefined,
      "data-focus-visible": isFocusVisible || undefined,
      "data-disabled": isDisabled || undefined,
    },
  };
}
