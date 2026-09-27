import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface HeaderProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  "data-part"?: never;
  titles: ReactNode;
  navigation: ReactNode;
}
