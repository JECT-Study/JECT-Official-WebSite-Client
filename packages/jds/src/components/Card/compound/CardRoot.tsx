import { clsx } from "clsx";
import { forwardRef, useId, useMemo } from "react";

import { CardContext } from "../card.context";
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

    const contextValue = useMemo(
      () => ({ layout, variant, isDisabled, titleId }),
      [layout, variant, isDisabled, titleId],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-interactive={interactive || undefined}
          data-disabled={isDisabled || undefined}
          className={clsx(styles.root({ layout, variant, isDisabled }), className)}
          {...restProps}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "Card.Root";
