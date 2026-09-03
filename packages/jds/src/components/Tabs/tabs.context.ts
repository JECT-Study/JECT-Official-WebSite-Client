import { createContext, useContext } from "react";

import type { TabsVariant } from "./tabs.types";

interface TabsContextValue {
  variant: TabsVariant;
  isItemStretched: boolean;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs 컴포넌트는 Tabs.Root 내부에서 사용해야 합니다.");
  }

  return context;
};
