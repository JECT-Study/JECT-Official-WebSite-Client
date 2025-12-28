import { createContext, useContext } from "react";

import type { TabVariant } from "./tab.types";

export interface TabContextValue {
  variant: TabVariant;
  isItemStretched: boolean;
}

export const TabContext = createContext<TabContextValue | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tab 컴포넌트는 Tab.Root 내부에서 사용해야 합니다");
  }
  return context;
};
