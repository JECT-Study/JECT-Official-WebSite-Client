import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../card.context";
import type { CardContentProps } from "../card.types";
import * as styles from "./card.css";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant, layout } = useCardContext("Card.Content");

    return (
      <div
        ref={ref}
        className={clsx(styles.content({ variant, layout }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = "Card.Content";
