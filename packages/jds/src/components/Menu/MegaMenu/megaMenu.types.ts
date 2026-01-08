import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type MegaMenuProps = ComponentPropsWithoutRef<"div">;

export interface MegaMenuSectionProps extends ComponentPropsWithoutRef<"div"> {
  sectionName?: string;
  children: ReactNode;
}

export interface MegaMenuGroupProps extends ComponentPropsWithoutRef<"ul"> {
  children: ReactNode;
}

export type MegaMenuGroupItemProps = ComponentPropsWithoutRef<"li">;
