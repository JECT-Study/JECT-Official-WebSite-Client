import { forwardRef } from "react";

import { StyledImage, StyledMenuItemAnchor, StyledMenuItemButton, MenuItemLabel } from "./menuItem.styles";
import type { MenuItemAnchorProps, MenuItemButtonProps } from "./menuItem.types";
import { Icon } from "../../Icon";

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
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledMenuItemButton
        ref={ref}
        disabled={disabled}
        $isDisabled={disabled}
        $isSelected={isSelected}
        $isDestructive={isDestructive}
        {...rest}
      >
        {variant === "icon" && prefixIconVisible && <Icon name={prefixIcon} size={size} />}
        {variant === "thumbnail" && (
          <StyledImage
            src={imageSrc}
            alt={imageAlt}
            ratio='1:1'
            orientation='portrait'
            cornerStyle='angular'
            $size={size}
          />
        )}
        <MenuItemLabel as='span' size={size} textAlign='left' weight='normal' cursor={disabled ? 'default' : 'pointer'}>
          {children}
        </MenuItemLabel>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
      </StyledMenuItemButton>
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
      isDestructive = false,
      disabled = false,
      prefixIcon = "blank",
      suffixIcon = "blank",
      prefixIconVisible = false,
      suffixIconVisible = false,
      imageAlt = "",
      imageSrc = "",
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledMenuItemAnchor
        ref={ref}
        $isDisabled={disabled}
        $isSelected={isSelected}
        $isDestructive={isDestructive}
        {...rest}
      >
        {variant === "icon" && prefixIconVisible && <Icon name={prefixIcon} size={size} />}
        {variant === "thumbnail" && (
          <StyledImage
            src={imageSrc}
            alt={imageAlt}
            ratio='1:1'
            orientation='portrait'
            cornerStyle='angular'
            $size={size}
          />
        )}
        <MenuItemLabel as='span' size={size} textAlign='left' weight='normal'>
          {children}
        </MenuItemLabel>
        {suffixIconVisible && <Icon name={suffixIcon} size={size} />}
      </StyledMenuItemAnchor>
    );
  },
);

MenuItemAnchor.displayName = "MenuItem.Anchor";

export const MenuItem = {
  Button: MenuItemButton,
  Anchor: MenuItemAnchor,
};
