import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef } from "react";

import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from "./accordion.types";
import { Icon } from "../Icon";
import {
  StyledAccordionContent,
  StyledAccordionContentText,
  StyledAccordionLabelContainer,
  StyledAccordionTrigger,
  StyledAccordionChevron,
  StyleLabel,
  StyledAccordionRoot,
} from "./accordion.styles";
import { AccordionContext, useAccordionContext } from "./accordionContext";

const AccordionRoot = ({ children, isStretched = true, ...props }: AccordionRootProps) => {
  return (
    <AccordionContext.Provider value={{ isStretched }}>
      <AccordionPrimitive.Root {...props}>
        <StyledAccordionRoot>{children}</StyledAccordionRoot>
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
};

AccordionRoot.displayName = "Accordion.Root";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, ref) => (
    <AccordionPrimitive.Item {...props} ref={ref}>
      {children}
    </AccordionPrimitive.Item>
  ),
);

AccordionItem.displayName = "Accordion.Item";

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, withPrefixIcon, ...props }, ref) => {
    const { isStretched } = useAccordionContext();

    return (
      <AccordionPrimitive.Header>
        <StyledAccordionTrigger {...props} ref={ref} $isStretched={isStretched}>
          <StyledAccordionLabelContainer>
            {withPrefixIcon && <Icon size='lg' name={withPrefixIcon} aria-hidden />}
            <StyleLabel size='lg' textAlign='left' weight='normal'>
              {children}
            </StyleLabel>
          </StyledAccordionLabelContainer>
          <StyledAccordionChevron className='arrowIcon'>
            <Icon size='lg' name='arrow-down-s-line' aria-hidden />
          </StyledAccordionChevron>
        </StyledAccordionTrigger>
      </AccordionPrimitive.Header>
    );
  },
);

AccordionTrigger.displayName = "Accordion.Trigger";

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, ref) => {
    const { isStretched } = useAccordionContext();

    return (
      <StyledAccordionContent {...props} ref={ref}>
        <StyledAccordionContentText $isStretched={isStretched}>
          {children}
        </StyledAccordionContentText>
      </StyledAccordionContent>
    );
  },
);

AccordionContent.displayName = "Accordion.Content";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
