import type { DropdownMenu } from "radix-ui";
import type { ComponentPropsWithoutRef, ElementType, ReactElement, ReactNode } from "react";

import type { IconName } from "../Icon";

import type { NumericBadgeProps } from "@/components/Badge";
import type { LabelSize, LabelWeight } from "@/utils/typography";

export type MenuStyle = "solid" | "hollow";
export type MenuSize = "lg" | "md" | "sm";
export type MenuButtonVariant = "icon" | "thumbnail";
export type MenuAnchorVariant = "icon" | "thumbnail";

export interface MenuButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: MenuButtonVariant;
  size?: MenuSize;
  isSelected?: boolean;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  prefixIconVisible?: boolean;
  suffixIconVisible?: boolean;
  children: ReactNode;
  imageAlt?: string;
  imageSrc?: string;
  stretched?: boolean;
  fullWidthText?: boolean;
}

interface MenuAnchorBaseProps extends Omit<ComponentPropsWithoutRef<"a">, "children"> {
  variant?: MenuAnchorVariant;
  size?: MenuSize;
  isSelected?: boolean;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  prefixIconVisible?: boolean;
  suffixIconVisible?: boolean;
  suffixBadge?: NumericBadgeProps["children"];
  suffixBadgeVisible?: boolean;
  suffixBadgeMuted?: boolean;
  imageAlt?: string;
  imageSrc?: string;
  stretched?: boolean;
  fullWidthText?: boolean;
}

interface MenuNativeAnchorProps {
  asChild?: false;
  disabled?: boolean;
  children: ReactNode;
}

interface MenuCustomAnchorProps {
  asChild: true;
  disabled?: never;
  children: ReactElement;
}

export type MenuAnchorProps = MenuAnchorBaseProps & (MenuNativeAnchorProps | MenuCustomAnchorProps);

export interface MenuRootProps {
  size?: MenuSize;
  menuStyle?: MenuStyle;
  children: ReactNode;
}

export interface MenuContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export interface MenuCategoryProps {
  as?: ElementType;
  size?: LabelSize;
  weight?: LabelWeight;
  children: ReactNode;
}

export interface MenuGroupProps extends ComponentPropsWithoutRef<"ul"> {
  children: ReactNode;
}

export interface DropdownMenuRootProps extends ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  size?: MenuSize;
  menuStyle?: MenuStyle;
  children: ReactNode;
}

export type DropdownMenuTriggerProps = DropdownMenu.DropdownMenuTriggerProps;

export interface DropdownMenuContentProps extends ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
> {
  children: ReactNode;
}

type DropdownItemProps = Pick<
  ComponentPropsWithoutRef<typeof DropdownMenu.Item>,
  "onSelect" | "textValue"
>;

export interface DropdownMenuButtonProps
  extends Omit<MenuButtonProps, "onSelect">, DropdownItemProps {}

interface DropdownMenuAnchorBaseProps
  extends Omit<MenuAnchorBaseProps, "onSelect">, DropdownItemProps {}

export type DropdownMenuAnchorProps = DropdownMenuAnchorBaseProps &
  (MenuNativeAnchorProps | MenuCustomAnchorProps);

export interface DropdownMenuTreeProps extends Omit<MenuButtonProps, "children"> {
  label: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  withTreeButton?: boolean;
}
