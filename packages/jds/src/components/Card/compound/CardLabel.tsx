import { clsx } from "clsx";
import { forwardRef } from "react";

import { useCardContext } from "../Card.context";
import type { CardLabelProps } from "../Card.types";
import * as styles from "./compound.css";

/**
 * @deprecated Plate Card는 Card.Label 위계 요소를 지원하지 않습니다.
 * Post 마이그레이션 완료 후 제거 예정입니다.
 */
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
