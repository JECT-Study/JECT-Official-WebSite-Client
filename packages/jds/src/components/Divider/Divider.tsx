import { forwardRef, type Ref } from "react";

import { divider } from "./divider.css";
import type { DividerProps } from "./divider.types";

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  (
    {
      thickness = "normal",
      orientation = "horizontal",
      decorative = false,
      variant = "solid",
      className,
      ...restProps
    },
    ref,
  ) => {
    const classes = [divider({ orientation, thickness, variant }), className].filter(Boolean).join(" ");

    if (orientation === "vertical") {
      return (
        <div
          ref={ref as Ref<HTMLDivElement>}
          role='separator'
          aria-orientation='vertical'
          aria-hidden={decorative}
          className={classes}
          {...restProps}
        />
      );
    }

    return (
      <hr
        ref={ref as Ref<HTMLHRElement>}
        aria-hidden={decorative}
        className={classes}
        {...restProps}
      />
    );
  },
);

Divider.displayName = "Divider";
