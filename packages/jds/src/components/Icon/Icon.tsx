import { clsx } from "clsx";
import { forwardRef } from "react";

import { iconWrapper } from "./Icon.css";
import type { IconProps } from "./Icon.types";
import { iconMap, sizeMap } from "./IconMap";

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ name, size = "md", className, ...props }, ref) => {
    const IconComponent = iconMap[name];
    const pixelSize = sizeMap[size];

    return (
      <span ref={ref} {...props} data-part='icon' className={clsx(iconWrapper, className)}>
        <IconComponent width={pixelSize} height={pixelSize} />
      </span>
    );
  },
);

Icon.displayName = "Icon";
