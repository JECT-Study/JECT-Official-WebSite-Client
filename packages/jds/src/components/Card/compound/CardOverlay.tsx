import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef, type Ref } from "react";

import { useCardContext } from "../Card.context";
import type { CardOverlayProps } from "../Card.types";
import * as styles from "./card.css";

export const CardOverlay = forwardRef<HTMLAnchorElement | HTMLButtonElement, CardOverlayProps>(
  ({ as = "a", children, className, ...restProps }, ref) => {
    const { variant, isDisabled } = useCardContext();
    const overlayClassName = clsx(styles.overlay({ variant, isDisabled }), className);

    if (as === "button") {
      const { type, ...buttonProps } = restProps as ComponentPropsWithoutRef<"button">;

      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type={type ?? "button"}
          className={overlayClassName}
          {...buttonProps}
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
