import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardBodyProps } from "../Card.types";
import * as styles from "./compound.css";

import { getBodyClassName } from "@/utils/typography";

export const CardBody = forwardRef<HTMLParagraphElement, CardBodyProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(getBodyClassName({ size: "sm", weight: "normal" }), styles.body, className)}
        {...restProps}
      >
        {children}
      </p>
    );
  },
);

CardBody.displayName = "Card.Body";
