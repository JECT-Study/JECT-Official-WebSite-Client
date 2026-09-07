import { clsx } from "clsx";
import { forwardRef } from "react";

import { kbd } from "./kbd.css";
import type { KbdProps, KbdSize } from "./kbd.types";

import {
  getLabelClassName,
  getSyntaxClassName,
  type LabelSize,
  type SyntaxSize,
} from "@/utils/typography";

const typographySizeMap = {
  lg: { label: "lg", syntax: "lg" },
  md: { label: "md", syntax: "md" },
  sm: { label: "sm", syntax: "sm" },
} as const satisfies Record<KbdSize, { label: LabelSize; syntax: SyntaxSize }>;

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", type = "key", isMuted = false, className, ...restProps }, ref) => {
    const typographyClassName =
      type === "function"
        ? getLabelClassName({ size: typographySizeMap[size].label, weight: "normal" })
        : getSyntaxClassName({ size: typographySizeMap[size].syntax });

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
