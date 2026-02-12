import type * as AccordionPrimitive from "@radix-ui/react-accordion";

import type { IconName } from "../Icon";

export type AccordionSize = "lg" | "md" | "sm";

export interface AccordionRootBaseProps {
  isStretched?: boolean;
  size?: AccordionSize;
}

export type AccordionPrimitiveProps =
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps;

export type AccordionRootProps = AccordionRootBaseProps & AccordionPrimitiveProps;

export type AccordionItemProps = AccordionPrimitive.AccordionItemProps;

export type AccordionTriggerProps = AccordionPrimitive.AccordionTriggerProps & {
  withPrefixIcon?: IconName;
};

export type AccordionContentProps = AccordionPrimitive.AccordionContentProps;

export interface StyledAccordionTriggerProps {
  $isStretched: boolean;
}

export interface StyledAccordionContentProps {
  $isStretched: boolean;
}
