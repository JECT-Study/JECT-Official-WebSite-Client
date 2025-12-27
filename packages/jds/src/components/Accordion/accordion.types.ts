import type * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef } from "react";

import type { IconName } from "../Icon";

export type AccordionSize = "lg" | "md" | "sm";

export type AccordionRootProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  isStretched?: boolean;
  withPrefixIcon?: boolean;
  size?: AccordionSize;
};

export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  isStretched?: boolean;
  withPrefixIcon?: IconName | null;
};

export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

export interface StyledAccordionTriggerProps {
  $isStretched: boolean;
}

export interface StyledAccordionContentProps {
  $isStretched: boolean;
}
