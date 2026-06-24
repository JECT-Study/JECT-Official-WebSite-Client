import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardMetaItemProps } from "../Card.types";
import * as styles from "./compound.css";

import { getLabelClassName } from "@/utils/typography";

export const CardMetaItem = forwardRef<HTMLSpanElement, CardMetaItemProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          getLabelClassName({ size: "sm", weight: "normal" }),
          styles.metaItem,
          className,
        )}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

CardMetaItem.displayName = "Card.MetaItem";
