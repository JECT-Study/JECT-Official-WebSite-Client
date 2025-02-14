import { ReactNode } from 'react';

export interface TabProps {
  children: ReactNode;
  defaultActiveTabId?: string;
  onTabChange?: (activeTabId: string) => void;
}
