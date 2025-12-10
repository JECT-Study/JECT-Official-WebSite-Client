import type { DropdownMenu } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { MenuItemAnchorProps, MenuItemButtonProps } from "../MenuItem";

import type { LabelProps } from "@/components/Label";

export type MenuStyle = "solid" | "empty";
export type MenuSize = "lg" | "md" | "sm";

export interface MenuRootProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  menuStyle?: MenuStyle;
  size?: MenuSize;
  children: ReactNode;
}

export interface MenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  children: ReactNode;
}

export interface MenuCategoryProps extends LabelProps {
  children: ReactNode;
}

export interface MenuGroupProps {
  children: ReactNode;
}
export type MenuTrigger = DropdownMenu.DropdownMenuTriggerProps;
export type MenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;
export type MenuButtonProps = MenuItemButtonProps;
export type MenuAnchorProps = MenuItemAnchorProps;

export interface StyledDropdownMenuContentProps {
  $menuStyle: MenuStyle;
  $size: MenuSize;
}

export interface StyledMenuGroupProps {
  $size: MenuSize;
}
