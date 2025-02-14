import React, { useState, cloneElement, ReactElement } from 'react';

interface TabItemProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const TabItem = ({ label, isActive, onClick }: TabItemProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`peer gap- py-(--gap-3xs)4xs label-bold-lg inline-flex items-center justify-center px-(--gap-md) text-center ${
          isActive
            ? 'text-object-hero-dark stroke-bold border-accent-normal-dark'
            : 'text-object-alternative-dark'
        }`}
      >
        {label}
      </button>
    </div>
  );
};

interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  defaultActiveTabId?: string;
  onTabChange?: (activeTabId: string) => void;
}

export const Tab = ({ children, defaultActiveTabId, onTabChange }: TabProps) => {
  const tabItems = Array.isArray(children) ? children : [children];

  const initialActiveId = defaultActiveTabId ?? tabItems[0].props.id;
  const [activeTabId, setActiveTabId] = useState(initialActiveId);

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const TabItems = tabItems.map(item =>
    cloneElement(item, {
      isActive: item.props.id === activeTabId,
      onClick: () => handleTabClick(item.props.id),
    }),
  );

  return (
    <div className='tab-container stroke-normal border-border-alternative-dark flex w-[37.3125rem]'>
      {TabItems}
    </div>
  );
};
