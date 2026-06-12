import { clsx } from "clsx";
import { forwardRef } from "react";

import { menuItemImage, menuItemLabel, menuItemRoot } from "./menuItem.css";
import type { MenuItemAnchorProps, MenuItemButtonProps, MenuItemTone } from "./menuItem.types";
import { Icon } from "../../Icon";
import { Thumbnail } from "../../Thumbnail";

import { getLabelClassName } from "@/utils/typography";

const MenuItemButton = forwardRef<HTMLButtonElement, MenuItemButtonProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      isDestructive = false,
      disabled = false,
      prefixIcon = "blank",
      suffixIcon = "blank",
      prefixIconVisible = false,
      suffixIconVisible = false,
      imageAlt = "",
      imageSrc = "",
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
        className={clsx(menuItemRoot({ tone: getTone({ isDestructive, isSelected }) }), className)}
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
            menuItemLabel,
          )}
        >
          {children}
        </span>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
      </button>
    );
  },
);

interface getToneParams {
  isDestructive: boolean;
  isSelected: boolean;
}

const getTone = ({ isDestructive, isSelected }: getToneParams): MenuItemTone => {
  if (isDestructive) return "destructive";
  if (isSelected) return "accent";
  return "normal";
};

MenuItemButton.displayName = "MenuItem.Button";

const MenuItemAnchor = forwardRef<HTMLAnchorElement, MenuItemAnchorProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      isDestructive = false,
      disabled = false,
      prefixIcon = "blank",
      suffixIcon = "blank",
      prefixIconVisible = false,
      suffixIconVisible = false,
      imageAlt = "",
      imageSrc = "",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        data-disabled={disabled || undefined}
        className={clsx(menuItemRoot({ tone: getTone({ isDestructive, isSelected }) }), className)}
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
        <span className={clsx(getLabelClassName({ size }), menuItemLabel)}>{children}</span>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
      </a>
    );
  },
);

MenuItemAnchor.displayName = "MenuItem.Anchor";

export const MenuItem = {
  Button: MenuItemButton,
  Anchor: MenuItemAnchor,
};
