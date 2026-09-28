import type { Accordion as AccordionPrimitive } from "radix-ui";

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

export interface AccordionTriggerProps extends AccordionPrimitive.AccordionTriggerProps {
  withPrefixIcon?: IconName;
}

export type AccordionContentProps = AccordionPrimitive.AccordionContentProps;
