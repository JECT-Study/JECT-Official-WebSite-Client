import type { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TabsVariant = "header" | "content";

export interface TabsRootProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  isItemStretched?: boolean;
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  badge?: ReactNode;
}

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
