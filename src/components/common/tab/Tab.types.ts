import { ReactNode } from 'react';

export interface TabsProps {
  children: ReactNode;
  defaultActiveTabId?: string;
  onTabChange?: (activeTabId: string) => void;
}
