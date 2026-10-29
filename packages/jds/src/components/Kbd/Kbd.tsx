import { clsx } from "clsx";
import { forwardRef } from "react";

import { kbd } from "./kbd.css";
import type { KbdProps } from "./kbd.types";

import { getSyntaxClassName } from "@/utils/typography";

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", isMuted = false, className, ...restProps }, ref) => (
    <kbd
      ref={ref}
      className={clsx(getSyntaxClassName({ size }), kbd({ size, isMuted }), className)}
      {...restProps}
    >
      {children}
    </kbd>
  ),
);

Kbd.displayName = "Kbd";
