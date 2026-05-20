import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./code.css";
import type { CodeProps } from "./code.types";

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ children, size = "md", className, ...restProps }, ref) => {
    return (
      <code ref={ref} className={clsx(styles.code({ size }), className)} {...restProps}>
        {children}
      </code>
    );
  },
);

Code.displayName = "Code";
