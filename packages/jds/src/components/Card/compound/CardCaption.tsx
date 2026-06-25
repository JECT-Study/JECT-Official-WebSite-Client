import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardCaptionProps } from "../Card.types";
import * as styles from "./card.css";

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <span ref={ref} className={clsx(styles.caption, className)} {...restProps}>
        {children}
      </span>
    );
  },
);

CardCaption.displayName = "Card.Caption";
