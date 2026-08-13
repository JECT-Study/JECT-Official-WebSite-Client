import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./code.css";
import type { CodeProps } from "./code.types";

import { getSyntaxClassName } from "@/utils/typography";

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ children, size = "md", className, ...restProps }, ref) => {
    return (
      <code
        ref={ref}
        className={clsx(getSyntaxClassName({ size }), styles.code, className)}
        {...restProps}
      >
        {children}
      </code>
    );
  },
);

Code.displayName = "Code";
