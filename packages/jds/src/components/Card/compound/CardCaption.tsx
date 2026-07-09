import { clsx } from "clsx";
import { forwardRef } from "react";

import { CARD_PART_CAPTION, type CardCaptionProps } from "../card.types";
import { useCardRootGuard } from "../cardContext";
import * as styles from "./card.css";

import { getLabelClassName } from "@/utils/typography";

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, className, ...restProps }, ref) => {
    useCardRootGuard("Card.Caption");

    return (
      <span
        ref={ref}
        className={clsx(
          getLabelClassName({ size: "xs", weight: "subtle" }),
          styles.caption,
          className,
        )}
        {...restProps}
        data-part={CARD_PART_CAPTION}
      >
        {children}
      </span>
    );
  },
);

CardCaption.displayName = "Card.Caption";
