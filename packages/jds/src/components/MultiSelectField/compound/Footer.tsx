import { clsx } from "clsx";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import * as styles from "../multiSelectField.css";

export type MultiSelectFieldFooterProps = ComponentPropsWithoutRef<"div">;

export const MultiSelectFieldFooter = forwardRef<HTMLDivElement, MultiSelectFieldFooterProps>(
  ({ children, className, ...restProps }, ref) => (
    <div ref={ref} className={clsx(styles.footer, className)} {...restProps}>
      {children}
    </div>
  ),
);

MultiSelectFieldFooter.displayName = "MultiSelectField.Footer";
