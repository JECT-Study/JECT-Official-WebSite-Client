import { createContext, useContext } from "react";

import type { MenuSize, MenuStyle } from "./menu.types";

export interface MenuContextValue {
  menuStyle: MenuStyle;
  size: MenuSize;
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const useMenuContext = (componentName: string) => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(`${componentName}는 Menu.Root 내부에서만 사용되어야 합니다.`);
  }
  return context;
};
