import type { ComponentPropsWithoutRef } from "react";

import type { IconSize, iconMap } from "./IconMap";

export type IconName = keyof typeof iconMap;
export type { IconSize };

export interface IconProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  name: IconName;
  size?: IconSize;
}
