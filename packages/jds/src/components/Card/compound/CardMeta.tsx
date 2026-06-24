import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardMetaProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.meta, className)} {...restProps}>
        {children}
      </div>
    );
  },
);

CardMeta.displayName = "Card.Meta";
