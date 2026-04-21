import { forwardRef } from "react";

import { iconWrapper } from "./Icon.css";
import type { IconProps } from "./Icon.types";
import { iconMap, sizeMap } from "./IconMap";

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ name, size = "md", color = "currentColor", ...props }, ref) => {
    const IconComponent = iconMap[name];
    const pixelSize = sizeMap[size];

    return (
      <span ref={ref} className={iconWrapper} style={{ color }}>
        <IconComponent width={pixelSize} height={pixelSize} {...props} />
      </span>
    );
  },
);

Icon.displayName = "Icon";
