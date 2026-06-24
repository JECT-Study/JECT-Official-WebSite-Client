import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardBodyProps } from "../Card.types";
import * as styles from "./compound.css";

export const CardBody = forwardRef<HTMLParagraphElement, CardBodyProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx("semantic-textStyle-body-sm-normal", styles.body, className)}
        {...restProps}
      >
        {children}
      </p>
    );
  },
);

CardBody.displayName = "Card.Body";
