import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../Card.context";
import type { CardTitleProps } from "../Card.types";
import * as styles from "./card.css";

import { getTitleClassName } from "@/utils/typography";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...restProps }, ref) => {
    const { titleId } = useCardContext();

    return (
      <h3
        ref={ref}
        id={titleId}
        className={clsx(getTitleClassName({ size: "xs" }), styles.title, className)}
        {...restProps}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "Card.Title";
