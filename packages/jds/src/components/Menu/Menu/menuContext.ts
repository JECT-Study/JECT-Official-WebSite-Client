import { createContext, useContext } from "react";

import type { MenuSize, MenuStyle } from "./menu.types";

export interface MenuContextValue {
  menuStyle: MenuStyle;
  size: MenuSize;
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu 컴포넌트는 Menu.Root 내부에서 사용해야 합니다");
  }
  return context;
};
