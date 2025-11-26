import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { createContext, useState, useContext } from "react";

import type { TabProps } from "./Tab.types";

interface TabContextType {
  activeTabId: number;
  onTabClick: (id: number) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("must be used within a TabProvider");
  }
  return context;
};

interface TabHeaderProps {
  children: ReactNode;
}

export const TabHeader = ({ children }: TabHeaderProps) => {
  return (
    <div
      aria-label='탭 헤더'
      className='stroke-normal border-border-alternative-dark flex w-full items-center'
    >
      {children}
    </div>
  );
};

interface TabItemProps extends Omit<ComponentPropsWithoutRef<"button">, "id"> {
  id: number;
  label: string;
}

export const TabItem = ({ id, label, disabled = false, ...restprops }: TabItemProps) => {
  const { activeTabId, onTabClick } = useTabContext();
  const isActive = activeTabId === id;
  return (
    <button
      onClick={() => onTabClick(id)}
      disabled={!!disabled}
      className={`interaction-default-subtle gap-4xs label-bold-lg inline-flex cursor-pointer items-center justify-center px-(--gap-md) py-(--gap-3xs) text-center ${
        isActive
          ? "text-object-hero-dark stroke-bold border-accent-normal-dark relative z-10 -mb-px"
          : "text-object-alternative-dark"
      } ${disabled ? "text-object-disabled-dark pointer-events-none cursor-not-allowed" : ""}`}
      {...restprops}
    >
      {label}
    </button>
  );
};

interface TabPanelProps {
  id: number;
  children: ReactNode;
}

export const TabPanel = ({ id, children }: TabPanelProps) => {
  const { activeTabId } = useTabContext();
  return activeTabId === id ? <div aria-label='탭 패널'>{children}</div> : null;
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
      <div aria-label='탭' className='flex flex-col'>
        {children}
      </div>
    </TabContext.Provider>
  );
};
