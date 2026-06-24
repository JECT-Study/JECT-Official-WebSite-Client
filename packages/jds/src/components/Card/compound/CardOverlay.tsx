import { clsx } from "clsx";
import { useContext, type ReactNode } from "react";

import { CardContext } from "../Card.context";
import * as styles from "./compound.css";

import { PolymorphicForwardRef } from "@/utils/forwardRef";

export interface CardOverlayOwnProps {
  children?: ReactNode;
}

export const CardOverlay = PolymorphicForwardRef<"a", CardOverlayOwnProps>(
  ({ as, children, className, ...restProps }, ref) => {
    const Component = as || "a";
    const context = useContext(CardContext);

    if (!context) {
      throw new Error("CardOverlay 는 Card.Root 내부에서 사용되어야 합니다.");
    }

    return (
      <Component
        ref={ref}
        data-overlay
        data-disabled={context.isDisabled || undefined}
        className={clsx(
          styles.overlay({
            variant: context.variant,
            isDisabled: context.isDisabled,
          }),
          className,
        )}
        {...restProps}
      >
        {children}
      </Component>
    );
  },
);

CardOverlay.displayName = "Card.Overlay";
