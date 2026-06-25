import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type Ref } from "react";

import type { CardOverlayProps } from "../Card.types";
import { useCardContext } from "../cardContext";
import * as styles from "./card.css";

export const CardOverlay = forwardRef<HTMLAnchorElement | HTMLButtonElement, CardOverlayProps>(
  ({ as = "a", children, className, ...restProps }, ref) => {
    const { variant, isDisabled, titleId } = useCardContext("Card.Overlay");
    const overlayClassName = clsx(styles.overlay({ variant, isDisabled }), className);

    const hasOwnLabel =
      children != null || restProps["aria-label"] != null || restProps["aria-labelledby"] != null;
    const ariaLabelledby = restProps["aria-labelledby"] ?? (hasOwnLabel ? undefined : titleId);

    if (as === "button") {
      const { type, ...buttonProps } = restProps as ComponentPropsWithoutRef<"button">;

      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type={type ?? "button"}
          className={overlayClassName}
          {...buttonProps}
          aria-labelledby={ariaLabelledby}
          data-overlay
          data-disabled={isDisabled || undefined}
          disabled={isDisabled}
        >
          {children}
        </button>
      );
    }

    const { href, ...anchorProps } = restProps as ComponentPropsWithoutRef<"a">;

    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={overlayClassName}
        {...anchorProps}
        aria-labelledby={ariaLabelledby}
        data-overlay
        data-disabled={isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        href={isDisabled ? undefined : href}
      >
        {children}
      </a>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
