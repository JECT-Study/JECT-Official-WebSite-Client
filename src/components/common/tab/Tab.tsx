import React, { createContext, useState, useContext, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction.tsx';
import { TabProps } from '@/components/common/tab/Tab.types.ts';

type TabContextType = {
  activeTabId: number;
  onTabClick: (id: number) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('must be used within a TabProvider');
  }
  return context;
};

type TabHeaderProps = {
  children: ReactNode;
};

export const TabHeader = ({ children }: TabHeaderProps) => {
  return (
    <div className='tab-header stroke-normal border-border-alternative-dark flex w-full items-center'>
      {children}
    </div>
  );
};

type TabItemProps = {
  id: number;
  label: string;
};

export const TabItem = ({ id, label }: TabItemProps) => {
  const { activeTabId, onTabClick } = useTabContext();
  const isActive = activeTabId === id;
  return (
    <Interaction variant='default' density='subtle' isInversed='false'>
      <button
        onClick={() => onTabClick(id)}
        className={`peer gap-4xs label-bold-lg inline-flex items-center justify-center px-(--gap-md) py-(--gap-3xs) text-center ${
          isActive
            ? 'text-object-hero-dark stroke-bold border-accent-normal-dark relative z-10 -mb-px'
            : 'text-object-alternative-dark'
        }`}
      >
        {label}
      </button>
    </Interaction>
  );
};

type TabPanelProps = {
  id: number;
  children: ReactNode;
};

export const TabPanel = ({ id, children }: TabPanelProps) => {
  const { activeTabId } = useTabContext();
  return activeTabId === id ? <div className='tab-panel'>{children}</div> : null;
};

export const Tab = ({ children, defaultActiveTabId, onTabChange }: TabProps) => {
  const [activeTabId, setActiveTabId] = useState<number>(defaultActiveTabId ?? 0);

  const handleTabClick = (id: number) => {
    setActiveTabId(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <TabContext.Provider value={{ activeTabId, onTabClick: handleTabClick }}>
      <div className='tabs-container flex flex-col'>{children}</div>
    </TabContext.Provider>
  );
};
