import type { MenuSize, MenuStyle } from "./menu.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface MenuContextValue {
  menuStyle: MenuStyle;
  size: MenuSize;
}

export const [MenuProvider, useMenuContext] = createCtxProvider<MenuContextValue>(
  "Menu",
  "Menu.Root",
);
