import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardMetaItemProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardMetaItem = forwardRef<HTMLSpanElement, CardMetaItemProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx("semantic-textStyle-label-sm-normal", styles.metaItem, className)}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

CardMetaItem.displayName = "Card.MetaItem";
