import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardCaptionProps } from "../Card.types";
import { useCardRootGuard } from "../cardContext";
import * as styles from "./card.css";

import { getLabelClassName } from "@/utils/typography";

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, className, ...restProps }, ref) => {
    useCardRootGuard("Card.Caption");

    return (
      <span
        ref={ref}
        data-card-slot='caption'
        className={clsx(
          getLabelClassName({ size: "xs", weight: "subtle" }),
          styles.caption,
          className,
        )}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

CardCaption.displayName = "Card.Caption";
