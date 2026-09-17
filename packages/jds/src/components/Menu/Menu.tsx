import { clsx } from "clsx";
import { forwardRef } from "react";

import { MenuProvider, useMenuContext } from "./menu.context";
import { menuContent } from "./menu.css";
import type {
  MenuAnchorProps,
  MenuButtonProps,
  MenuContentProps,
  MenuRootProps,
} from "./menu.types";
import { MenuPrimitive } from "./MenuPrimitive";

const MenuRoot = ({ children, menuStyle = "hollow", size = "md" }: MenuRootProps) => {
  return <MenuProvider value={{ menuStyle, size }}>{children}</MenuProvider>;
};

MenuRoot.displayName = "Menu.Root";

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { menuStyle, size } = useMenuContext("Menu.Content");

    return (
      <div ref={ref} className={clsx(menuContent({ menuStyle, size }), className)} {...restProps}>
        {children}
      </div>
    );
  },
);

MenuContent.displayName = "Menu.Content";

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Button");

    return (
      <li>
        <MenuPrimitive.Button ref={ref} size={size} {...restProps}>
          {children}
        </MenuPrimitive.Button>
      </li>
    );
  },
);

MenuButton.displayName = "Menu.Button";

const MenuAnchor = forwardRef<HTMLAnchorElement, MenuAnchorProps>(
  ({ children, asChild, ...restProps }, ref) => {
    const { size } = useMenuContext("Menu.Anchor");

    return (
      <li>
        <MenuPrimitive.Anchor ref={ref} asChild={asChild} size={size} {...restProps}>
          {children}
        </MenuPrimitive.Anchor>
      </li>
    );
  },
);

MenuAnchor.displayName = "Menu.Anchor";

export const Menu = {
  Root: MenuRoot,
  Content: MenuContent,
  Category: MenuPrimitive.Category,
  Group: MenuPrimitive.Group,
  Button: MenuButton,
  Anchor: MenuAnchor,
};
