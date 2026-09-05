import { clsx } from "clsx";
import { forwardRef, useId } from "react";

import { CardProvider } from "../card.context";
import type { CardRootProps } from "../card.types";
import * as styles from "./card.css";

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      layout = "vertical",
      variant = "plate",
      isDisabled = false,
      interactive = false,
      children,
      className,
      ...restProps
    },
    ref,
  ) => {
    const titleId = useId();

    return (
      <CardProvider value={{ layout, variant, isDisabled, titleId }}>
        <div
          ref={ref}
          data-interactive={interactive || undefined}
          data-disabled={isDisabled || undefined}
          className={clsx(styles.root({ layout, variant, isDisabled }), className)}
          {...restProps}
        >
          {children}
        </div>
      </CardProvider>
    );
  },
);

CardRoot.displayName = "Card.Root";
