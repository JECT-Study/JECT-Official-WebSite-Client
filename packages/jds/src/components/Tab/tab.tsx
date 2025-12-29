import { Tabs as TabPrimitive } from "radix-ui";
import { forwardRef } from "react";

import { StyledLabel, StyledTabList, StyledTabPrimitiveTrigger } from "./tab.styles";
import type { TabContentProps, TabListProps, TabRootProps, TabTriggerProps } from "./tab.types";
import { TabContext, useTabContext } from "./tabContext";

export const TabRoot = forwardRef<HTMLDivElement, TabRootProps>(
  ({ children, variant = "header", isItemStretched = false, ...rest }, ref) => {
    return (
      <TabContext.Provider value={{ variant, isItemStretched }}>
        <TabPrimitive.Root ref={ref} {...rest}>
          {children}
        </TabPrimitive.Root>
      </TabContext.Provider>
    );
  },
);

TabRoot.displayName = "Tab.Root";

export const TabList = forwardRef<HTMLDivElement, TabListProps>(({ children, ...rest }, ref) => {
  const { variant } = useTabContext();

  return (
    <StyledTabList ref={ref} $variant={variant} {...rest}>
      {children}
    </StyledTabList>
  );
});

TabList.displayName = "Tab.List";

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ children, disabled = false, badge = "", ...rest }, ref) => {
    const { variant, isItemStretched } = useTabContext();

    return (
      <StyledTabPrimitiveTrigger
        disabled={disabled}
        $variant={variant}
        $isDisabled={disabled}
        $isItemStretched={isItemStretched}
        ref={ref}
        {...rest}
      >
        <StyledLabel size='md' weight='bold'>
          {children}
        </StyledLabel>
        {badge && (
          <StyledLabel size='md' weight='subtle'>
            {badge}
          </StyledLabel>
        )}
      </StyledTabPrimitiveTrigger>
    );
  },
);

TabTrigger.displayName = "Tab.Trigger";

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <TabPrimitive.Content ref={ref} {...rest}>
        {children}
      </TabPrimitive.Content>
    );
  },
);

TabContent.displayName = "Tab.Content";

export const Tab = {
  Root: TabRoot,
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
};
