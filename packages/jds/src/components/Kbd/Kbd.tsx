import { clsx } from "clsx";

import { kbd } from "./kbd.css";
import type { KbdProps } from "./kbd.types";

export const Kbd = ({
  children,
  size = "md",
  type = "key",
  muted = false,
  className,
  ...restProps
}: KbdProps) => {
  return (
    <kbd className={clsx(kbd({ size, type, muted }), className)} {...restProps}>
      {children}
    </kbd>
  );
};

Kbd.displayName = "Kbd";
