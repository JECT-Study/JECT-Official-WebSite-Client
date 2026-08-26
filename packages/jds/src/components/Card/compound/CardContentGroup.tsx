import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardContentGroupProps } from "../card.types";
import { useCardRootGuard } from "../cardContext";
import * as styles from "./card.css";

export const CardContentGroup = forwardRef<HTMLDivElement, CardContentGroupProps>(
  ({ children, className, ...restProps }, ref) => {
    useCardRootGuard("Card.ContentGroup");

    return (
      <div ref={ref} className={clsx(styles.contentGroup, className)} {...restProps}>
        {children}
      </div>
    );
  },
);

CardContentGroup.displayName = "Card.ContentGroup";
