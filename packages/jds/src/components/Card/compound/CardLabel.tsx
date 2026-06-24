import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../Card.context";
import type { CardLabelProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardLabel = forwardRef<HTMLHeadingElement, CardLabelProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant } = useCardContext();

    return (
      <h4 ref={ref} className={clsx(styles.label({ variant }), className)} {...restProps}>
        {children}
      </h4>
    );
  },
);

CardLabel.displayName = "Card.Label";
