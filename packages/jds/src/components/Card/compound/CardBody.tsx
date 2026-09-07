import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../card.context";
import type { CardBodyProps } from "../card.types";
import * as styles from "./card.css";

import { getBodyClassName } from "@/utils/typography";

export const CardBody = forwardRef<HTMLParagraphElement, CardBodyProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant } = useCardContext("Card.Body");

    return (
      <p
        ref={ref}
        className={clsx(
          getBodyClassName({ size: "sm", weight: "normal" }),
          styles.body({ variant }),
          className,
        )}
        {...restProps}
      >
        {children}
      </p>
    );
  },
);

CardBody.displayName = "Card.Body";
