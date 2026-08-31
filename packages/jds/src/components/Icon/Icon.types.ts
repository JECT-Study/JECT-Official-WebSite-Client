import type { ComponentPropsWithoutRef } from "react";

import type { iconMap, sizeMap } from "./IconMap";

export type IconName = keyof typeof iconMap;
export type IconSize = keyof typeof sizeMap;

export interface IconProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  name: IconName;
  size?: IconSize;
}
