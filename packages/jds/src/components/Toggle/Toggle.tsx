import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./toggle.css";
import type { ToggleProps } from "./toggle.types";

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ disabled = false, className, style, ...props }, ref) => {
    return (
      <label
        className={clsx(styles.root, className)}
        data-disabled={disabled || undefined}
        style={style}
      >
        <input
          ref={ref}
          {...props}
          type='checkbox'
          role='switch'
          disabled={disabled}
          className={styles.input}
        />
        <span className={styles.thumb} aria-hidden='true' />
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
