import { clsx } from "clsx";
import { forwardRef } from "react";

import { kbd } from "./kbd.css";
import type { KbdProps } from "./kbd.types";

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", type = "key", muted = false, className, ...restProps }, ref) => {
    return (
      <kbd ref={ref} className={clsx(kbd({ size, type, muted }), className)} {...restProps}>
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";
