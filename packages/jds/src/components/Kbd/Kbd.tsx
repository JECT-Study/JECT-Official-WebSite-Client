import { clsx } from "clsx";
import { forwardRef } from "react";

import { kbd } from "./kbd.css";
import type { KbdProps } from "./kbd.types";

import { getLabelClassName, getSyntaxClassName } from "@/utils/typography";

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", type = "key", isMuted = false, className, ...restProps }, ref) => {
    const typographyClassName =
      type === "function"
        ? getLabelClassName({ size, weight: "normal" })
        : getSyntaxClassName({ size });

    return (
      <kbd
        ref={ref}
        className={clsx(typographyClassName, kbd({ size, type, isMuted }), className)}
        {...restProps}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";
