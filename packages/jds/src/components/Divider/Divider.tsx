import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { forwardRef, type Ref } from "react";

import { divider, dividerDashGapVar, dividerDashLengthVar } from "./divider.css";
import type { DividerProps } from "./divider.types";

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  (
    {
      thickness = "normal",
      orientation = "horizontal",
      decorative = false,
      variant = "solid",
      dashLength,
      dashGap,
      className,
      style,
      ...restProps
    },
    ref,
  ) => {
    const classes = clsx(divider({ orientation, thickness, variant }), className);
    const dashStyle = assignInlineVars({
      ...(dashLength === undefined ? {} : { [dividerDashLengthVar]: `${dashLength}px` }),
      ...(dashGap === undefined ? {} : { [dividerDashGapVar]: `${dashGap}px` }),
    });
    const mergedStyle = { ...dashStyle, ...style };

    if (orientation === "vertical") {
      return (
        <div
          ref={ref as Ref<HTMLDivElement>}
          role='separator'
          aria-orientation='vertical'
          aria-hidden={decorative}
          className={classes}
          style={mergedStyle}
          {...restProps}
        />
      );
    }

    return (
      <hr
        ref={ref as Ref<HTMLHRElement>}
        aria-hidden={decorative}
        className={classes}
        style={mergedStyle}
        {...restProps}
      />
    );
  },
);

Divider.displayName = "Divider";
