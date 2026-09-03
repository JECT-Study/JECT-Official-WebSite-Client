import type { TabsVariant } from "./tabs.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

interface TabsContextValue {
  variant: TabsVariant;
  isItemStretched: boolean;
}

export const [TabsProvider, useTabsContext] = createCtxProvider<TabsContextValue>(
  "Tabs",
  "Tabs.Root",
);
