import type { DropdownMenu } from "radix-ui";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import type { MenuItemAnchorProps, MenuItemButtonProps } from "../MenuItem";

import type { LabelSize, LabelWeight } from "@/utils/typography";

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

export interface MenuCategoryProps {
  as?: ElementType;
  size?: LabelSize;
  weight?: LabelWeight;
  textAlign?: "center" | "left" | "right";
  cursor?: "pointer" | "default";
  htmlFor?: string;
  children: ReactNode;
}

export interface MenuGroupProps extends ComponentPropsWithoutRef<"ul"> {
  children: ReactNode;
}

export type MenuTriggerProps = DropdownMenu.DropdownMenuTriggerProps;

export type MenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

type MenuDropdownItemProps = Pick<MenuItemProps, "onSelect" | "textValue">;

export interface MenuTreeProps extends Omit<MenuItemButtonProps, "children"> {
  label: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  withTreeButton?: boolean;
}

export interface MenuButtonProps
  extends Omit<MenuItemButtonProps, "onSelect">, MenuDropdownItemProps {}
export interface MenuAnchorProps
  extends Omit<MenuItemAnchorProps, "onSelect">, MenuDropdownItemProps {}
