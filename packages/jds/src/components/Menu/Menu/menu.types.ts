import type { DropdownMenu } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { MenuItemAnchorProps, MenuItemButtonProps } from "../MenuItem";

import type { LabelOwnProps } from "@/utils/typography";

export type MenuStyle = "solid" | "hollow";
export type MenuSize = "lg" | "md" | "sm";

export interface MenuRootProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  size?: MenuSize;
  menuStyle?: MenuStyle;
  children: ReactNode;
}

export interface MenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  children: ReactNode;
}

export interface MenuCategoryProps extends LabelOwnProps {
  children: ReactNode;
}

export interface MenuGroupProps extends ComponentPropsWithoutRef<"ul"> {
  children: ReactNode;
}

export type MenuTriggerProps = DropdownMenu.DropdownMenuTriggerProps;

export type MenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

export interface MenuTreeProps extends MenuItemButtonProps {
  label: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export type MenuButtonProps = MenuItemButtonProps;
export type MenuAnchorProps = MenuItemAnchorProps;
