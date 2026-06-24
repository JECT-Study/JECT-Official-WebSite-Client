import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardCaptionProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardCaption = forwardRef<HTMLSpanElement, CardCaptionProps>(
  ({ children, standalone = false, className, ...restProps }, ref) => {
    return (
      <span ref={ref} className={clsx(styles.caption({ standalone }), className)} {...restProps}>
        {children}
      </span>
    );
  },
);

CardCaption.displayName = "Card.Caption";
