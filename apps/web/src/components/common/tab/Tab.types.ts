import type { ReactNode } from "react";

export interface TabProps {
  children: ReactNode;
  defaultActiveTabId?: number;
  onTabChange?: (activeTabId: number) => void;
}
