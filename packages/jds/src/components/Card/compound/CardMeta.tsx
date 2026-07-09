import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardMetaProps } from "../card.types";
import { useCardRootGuard } from "../cardContext";
import * as styles from "./card.css";

export const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  ({ children, className, ...restProps }, ref) => {
    useCardRootGuard("Card.Meta");

    return (
      <div ref={ref} className={clsx(styles.meta, className)} {...restProps}>
        {children}
      </div>
    );
  },
);

CardMeta.displayName = "Card.Meta";
