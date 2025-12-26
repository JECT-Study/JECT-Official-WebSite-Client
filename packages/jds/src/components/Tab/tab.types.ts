import type * as TabPrimitive from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TabVariant = "header" | "content";

export type TabRootProps = ComponentPropsWithoutRef<typeof TabPrimitive.Root> & {
  variant?: TabVariant;
  isItemStretched?: boolean;
};
export type TabListProps = ComponentPropsWithoutRef<typeof TabPrimitive.List> & {
  variant?: TabVariant;
};
export type TabTriggerProps = ComponentPropsWithoutRef<typeof TabPrimitive.Trigger> & {
  badge?: ReactNode;
};
export type TabContentProps = ComponentPropsWithoutRef<typeof TabPrimitive.Content>;

export interface StyledTabPrimitiveTriggerProps {
  $isDisabled: boolean;
  $variant: TabVariant;
  $isItemStretched?: boolean;
}
export interface StyledTabPrimitiveListProps {
  $variant: TabVariant;
}
