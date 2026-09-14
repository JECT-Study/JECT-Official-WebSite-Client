import { clsx } from "clsx";
import { forwardRef } from "react";

import { useMenuContext } from "./menu.context";
import {
  menuCategory,
  menuCategoryContainer,
  menuContainerStyle,
  menuGroup,
  menuItemImage,
  menuItemLabel,
} from "./menu.css";
import type {
  MenuAnchorProps,
  MenuButtonProps,
  MenuCategoryProps,
  MenuGroupProps,
  MenuSize,
} from "./menu.types";
import { Icon } from "../Icon";
import { Thumbnail } from "../Thumbnail";

import { NumericBadge, type BadgeSize } from "@/components/Badge";
import { getLabelClassName, type LabelSize } from "@/utils/typography";

const MenuPrimitiveButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      disabled = false,
      prefixIcon = "square-dashed",
      suffixIcon = "square-dashed",
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

MenuPrimitiveButton.displayName = "MenuPrimitive.Button";

const MenuPrimitiveAnchor = forwardRef<HTMLAnchorElement, MenuAnchorProps>(
  (
    {
      variant = "icon",
      size = "md",
      isSelected = false,
      disabled = false,
      prefixIcon = "square-dashed",
      prefixIconVisible = false,
      suffixIcon = "square-dashed",
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
          <NumericBadge size={suffixBadgeSizeByMenuSize[size]} isMuted={suffixBadgeMuted}>
            {suffixBadge}
          </NumericBadge>
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

MenuPrimitiveAnchor.displayName = "MenuPrimitive.Anchor";

const MenuCategory = forwardRef<HTMLDivElement, MenuCategoryProps>((props, ref) => {
  const { size: labelSizeFromProps, weight, as, children, ...restProps } = props;
  const { size: menuSizeFromCtx } = useMenuContext("Menu.Category");
  const labelSize = labelSizeFromProps ?? labelSizeByMenuSizeMap[menuSizeFromCtx];

  const Component = as ?? "div";

  return (
    <div className={menuCategoryContainer({ size: menuSizeFromCtx })}>
      <Component
        ref={ref}
        className={clsx(getLabelClassName({ size: labelSize, weight }), menuCategory)}
        {...restProps}
      >
        {children}
      </Component>
    </div>
  );
});

const labelSizeByMenuSizeMap: Record<MenuSize, LabelSize> = {
  lg: "md",
  md: "sm",
  sm: "xs",
} as const;

MenuCategory.displayName = "Menu.Category";

const MenuGroup = forwardRef<HTMLUListElement, MenuGroupProps>(
  ({ children, className, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Group");

    return (
      <ul role='list' ref={ref} className={clsx(menuGroup({ size }), className)} {...restProps}>
        {children}
      </ul>
    );
  },
);

MenuGroup.displayName = "Menu.Group";

export const MenuPrimitive = {
  Category: MenuCategory,
  Group: MenuGroup,
  Button: MenuPrimitiveButton,
  Anchor: MenuPrimitiveAnchor,
};
