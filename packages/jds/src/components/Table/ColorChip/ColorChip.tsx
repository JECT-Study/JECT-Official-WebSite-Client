import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { forwardRef } from "react";

import { colorChip, colorChipBackground } from "./colorChip.css";
import type { ColorChipProps } from "./ColorChip.types";

export const ColorChip = forwardRef<HTMLDivElement, ColorChipProps>(
  ({ color, className, style, ...restProps }, ref) => {
    const backgroundColor = color.trim() || "transparent";

    return (
      <div
        ref={ref}
        className={clsx(colorChip, className)}
        style={{ ...assignInlineVars({ [colorChipBackground]: backgroundColor }), ...style }}
        {...restProps}
      />
    );
  },
);

ColorChip.displayName = "ColorChip";
