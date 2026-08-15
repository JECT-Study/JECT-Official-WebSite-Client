import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import * as styles from "../field.css";

export type FieldFooterProps = ComponentPropsWithoutRef<"div">;

export const FieldFooter = forwardRef<HTMLDivElement, FieldFooterProps>(
  ({ children, className, ...restProps }, ref) => (
    <div {...restProps} ref={ref} className={clsx(styles.footer, className)}>
      {children}
    </div>
  ),
);

FieldFooter.displayName = "Field.Footer";
