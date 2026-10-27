import { clsx } from "clsx";
import { forwardRef } from "react";

import { skeleton } from "./skeleton.css";
import type { SkeletonProps } from "./skeleton.types";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, radius = "8", className, style, ...restProps }, ref) => (
    <div
      {...restProps}
      ref={ref}
      className={clsx(skeleton({ radius }), className)}
      style={{ width, height, ...style }}
      aria-hidden='true'
    />
  ),
);

Skeleton.displayName = "Skeleton";
