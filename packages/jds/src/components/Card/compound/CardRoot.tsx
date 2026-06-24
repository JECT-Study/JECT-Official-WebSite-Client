import { clsx } from "clsx";
import { forwardRef, useMemo } from "react";

import { CardContext } from "../Card.context";
import type { CardRootOwnProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardRoot = forwardRef<HTMLDivElement, CardRootOwnProps>(
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
    const contextValue = useMemo(
      () => ({ layout, variant, isDisabled }),
      [layout, variant, isDisabled],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-interactive={interactive ? "true" : "false"}
          data-disabled={isDisabled ? "true" : "false"}
          className={clsx(
            styles.root({
              layout,
              variant,
              isDisabled,
            }),
            className,
          )}
          {...restProps}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "Card.Root";
