import { clsx } from "clsx";
import { forwardRef } from "react";

import { menuContainerStyle, menuItemImage, menuItemLabel } from "./menuItem.css";
import type { MenuItemAnchorProps, MenuItemButtonProps } from "./menuItem.types";
import { Icon } from "../../Icon";
import { Thumbnail } from "../../Thumbnail";
import { type MenuSize } from "../Menu";

import { NumericBadge, type BadgeSize } from "@/components/Badge";
import { getLabelClassName } from "@/utils/typography";

const MenuItemButton = forwardRef<HTMLButtonElement, MenuItemButtonProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      disabled = false,
      prefixIcon = "blank",
      suffixIcon = "blank",
      prefixIconVisible = false,
      suffixIconVisible = false,
      imageAlt = "",
      imageSrc = "",
      stretched = false,
      fullWidthText = false,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        data-disabled={disabled || undefined}
        className={clsx(menuContainerStyle({ size, isSelected, stretched }), className)}
        {...restProps}
      >
        {variant === "icon" && prefixIconVisible && <Icon name={prefixIcon} size={size} />}
        {variant === "thumbnail" && (
          <Thumbnail
            src={imageSrc}
            alt={imageAlt}
            ratio='1:1'
            orientation='portrait'
            cornerStyle='angular'
            className={menuItemImage({ size })}
          />
        )}
        <span
          className={clsx(
            getLabelClassName({
              size,
            }),
            menuItemLabel({ fullWidthText }),
          )}
        >
          {children}
        </span>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
      </button>
    );
  },
);

MenuItemButton.displayName = "MenuItem.Button";

const MenuItemAnchor = forwardRef<HTMLAnchorElement, MenuItemAnchorProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      disabled = false,
      prefixIcon = "blank",
      prefixIconVisible = false,
      suffixIcon = "blank",
      suffixBadge,
      suffixIconVisible = false,
      suffixBadgeVisible = false,
      suffixBadgeMuted = false,
      imageAlt = "",
      imageSrc = "",
      stretched = false,
      fullWidthText = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={clsx(menuContainerStyle({ size, isSelected, stretched }), className)}
        {...rest}
      >
        {variant === "icon" && prefixIconVisible && <Icon name={prefixIcon} size={size} />}
        {variant === "thumbnail" && (
          <Thumbnail
            src={imageSrc}
            alt={imageAlt}
            ratio='1:1'
            orientation='portrait'
            cornerStyle='angular'
            className={menuItemImage({ size })}
          />
        )}
        <span className={clsx(getLabelClassName({ size }), menuItemLabel({ fullWidthText }))}>
          {children}
        </span>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
        {suffixBadgeVisible && (
          <NumericBadge.Basic size={suffixBadgeSizeByMenuSize[size]} isMuted={suffixBadgeMuted}>
            {suffixBadge}
          </NumericBadge.Basic>
        )}
      </a>
    );
  },
);

const suffixBadgeSizeByMenuSize: Record<MenuSize, BadgeSize> = {
  lg: "lg",
  md: "md",
  sm: "sm",
} as const;

MenuItemAnchor.displayName = "MenuItem.Anchor";

export const MenuItem = {
  Button: MenuItemButton,
  Anchor: MenuItemAnchor,
};
