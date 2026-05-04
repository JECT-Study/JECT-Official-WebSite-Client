import type { ComponentPropsWithoutRef } from "react";

import type { iconMap } from "./IconMap";

export type IconName = keyof typeof iconMap;
export type IconSize = "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | "2xs";

export interface IconProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  name: IconName;
  size?: IconSize;
}
