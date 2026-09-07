import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../card.context";
import type { CardTitleProps } from "../card.types";
import * as styles from "./card.css";

import { getTitleClassName } from "@/utils/typography";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...restProps }, ref) => {
    const { titleId } = useCardContext("Card.Title");

    return (
      <h3
        ref={ref}
        className={clsx(getTitleClassName({ size: "xs" }), styles.title, className)}
        {...restProps}
        id={titleId}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "Card.Title";
