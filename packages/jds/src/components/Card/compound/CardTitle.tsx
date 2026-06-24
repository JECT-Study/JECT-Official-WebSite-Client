import { clsx } from "clsx";
import { forwardRef } from "react";

import type { CardTitleProps } from "../Card.types";
import * as styles from "./compound.css";

import { getTitleClassName } from "@/utils/typography";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx(getTitleClassName({ size: "xs" }), styles.title, className)}
        {...restProps}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "Card.Title";
