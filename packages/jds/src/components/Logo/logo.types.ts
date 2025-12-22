import type { ComponentPropsWithoutRef } from "react";

export type LogoHierarchy = "primary" | "secondary" | "tertiary" | "inverse";

export interface LogoProps extends Omit<ComponentPropsWithoutRef<"a">, "children"> {
  hierarchy?: LogoHierarchy;
  height?: number;
  href?: string;
}
