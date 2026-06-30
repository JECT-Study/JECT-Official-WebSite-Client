import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardContentGroupProps } from "../Card.types";
import { useCardContext } from "../cardContext";
import * as styles from "./card.css";

export const CardContentGroup = forwardRef<HTMLDivElement, CardContentGroupProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant } = useCardContext("Card.ContentGroup");

    return (
      <div
        ref={ref}
        className={clsx(styles.contentGroup({ variant }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

CardContentGroup.displayName = "Card.ContentGroup";
