import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardTitleProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx("semantic-textStyle-title-1", styles.title, className)}
        {...restProps}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "Card.Title";
