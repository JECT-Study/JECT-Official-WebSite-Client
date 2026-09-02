import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "../field.css";
import type { FieldFooterProps } from "../field.types";

export const FieldFooter = forwardRef<HTMLDivElement, FieldFooterProps>(
  ({ children, className, ...restProps }, ref) => (
    <div {...restProps} ref={ref} className={clsx(styles.footer, className)}>
      {children}
    </div>
  ),
);

FieldFooter.displayName = "Field.Footer";
