import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardMetaItemProps } from "../card.types";
import { useCardRootGuard } from "../cardContext";
import * as styles from "./card.css";

import { getLabelClassName } from "@/utils/typography";

export const CardMetaItem = forwardRef<HTMLSpanElement, CardMetaItemProps>(
  ({ children, className, ...restProps }, ref) => {
    useCardRootGuard("Card.MetaItem");

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
