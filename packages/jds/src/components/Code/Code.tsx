import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./code.css";
import type { CodeProps, CodeSize } from "./code.types";

import { getSyntaxClassName, type SyntaxSize } from "@/utils/typography";

const syntaxSizeMap = {
  lg: "lg",
  md: "md",
  sm: "sm",
  xs: "xs",
} as const satisfies Record<CodeSize, SyntaxSize>;

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ children, size = "md", className, ...restProps }, ref) => {
    return (
      <code
        ref={ref}
        className={clsx(getSyntaxClassName({ size: syntaxSizeMap[size] }), styles.code, className)}
        {...restProps}
      >
        {children}
      </code>
    );
  },
);

Code.displayName = "Code";
