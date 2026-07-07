import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./toggle.css";
import type { ToggleProps } from "./toggle.types";

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, disabled = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type='button'
        role='switch'
        aria-checked={checked}
        disabled={disabled}
        className={clsx(styles.root, className)}
      >
        <span className={styles.thumb} aria-hidden='true' />
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
