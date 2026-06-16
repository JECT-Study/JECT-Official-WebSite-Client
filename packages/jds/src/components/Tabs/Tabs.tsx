import { clsx } from "clsx";
import { Tabs as TabsPrimitive } from "radix-ui";
import { forwardRef, useMemo } from "react";

import * as styles from "./tabs.css";
import { TabsContext, useTabsContext } from "./tabsContext";
import type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from "./tabs.types";

import { getLabelClassName } from "@/utils/typography";

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  ({ children, variant = "header", isItemStretched = false, ...restProps }, ref) => {
    const contextValue = useMemo(
      () => ({ variant, isItemStretched }),
      [variant, isItemStretched],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <TabsPrimitive.Root ref={ref} {...restProps}>
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = "Tabs.Root";

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...restProps }, ref) => {
    const { variant } = useTabsContext();

    return (
      <TabsPrimitive.List
        ref={ref}
        className={clsx(styles.list({ variant }), className)}
        {...restProps}
      >
        {children}
      </TabsPrimitive.List>
    );
  },
);

TabsList.displayName = "Tabs.List";

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, disabled = false, badge="", className, ...restProps }, ref) => {
    const { variant, isItemStretched } = useTabsContext();

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={clsx(styles.trigger({ variant, isItemStretched }), className)}
        {...restProps}
      >
        <span className={clsx(getLabelClassName({ weight: "bold" }), styles.label)}>
          {children}
        </span>
        {badge ? (
          <span className={clsx(getLabelClassName({ weight: "subtle" }), styles.badge)}>
            {badge}
          </span>
        ) : null}
      </TabsPrimitive.Trigger>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <TabsPrimitive.Content ref={ref} className={clsx(styles.content, className)} {...restProps}>
        {children}
      </TabsPrimitive.Content>
    );
  },
);

TabsContent.displayName = "Tabs.Content";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
