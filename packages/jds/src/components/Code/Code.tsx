import { clsx } from "clsx";

import * as styles from "./code.css";
import type { CodeProps } from "./code.types";

export const Code = ({ children, size = "md", className, ...restProps }: CodeProps) => {
  return (
    <code className={clsx(styles.code({ size }), className)} {...restProps}>
      {children}
    </code>
  );
};

Code.displayName = "Code";
