import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { forwardRef, useMemo } from "react";

import { Icon } from "../Icon";
import {
  StyledAccordionContent,
  StyledAccordionContentText,
  StyledAccordionLabelContainer,
  StyledAccordionTrigger,
  StyledAccordionChevron,
  StyleLabel,
  StyledAccordionRoot,
  accordionSizeMap,
} from "./accordion.styles";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from "./accordion.types";
import { AccordionContext, useAccordionContext } from "./accordionContext";

import { getLabelClassName } from "@/utils/typography";

/**
 * Accordion.Root
 * - Radix UI Accordion의 루트 컨테이너입니다.
 * - Context를 통해 내부 컴포넌트들에게 size와 isStretched 상태를 공유합니다.
 */
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, isStretched = true, size = "lg", ...props }, ref) => {
    const contextValue = useMemo(() => ({ isStretched, size }), [isStretched, size]);

    return (
      <AccordionContext.Provider value={contextValue}>
        <AccordionPrimitive.Root {...props} ref={ref}>
          <StyledAccordionRoot>{children}</StyledAccordionRoot>
        </AccordionPrimitive.Root>
      </AccordionContext.Provider>
    );
  },
);

AccordionRoot.displayName = "Accordion.Root";

/**
 * Accordion.Item
 * - 개별 아코디언 항목을 감싸는 래퍼입니다.
 */
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, ref) => (
    <AccordionPrimitive.Item {...props} ref={ref}>
      {children}
    </AccordionPrimitive.Item>
  ),
);

AccordionItem.displayName = "Accordion.Item";

/**
 * Accordion.Trigger
 * - 아코디언을 열고 닫는 헤더/버튼 영역입니다.
 * - Context에서 주입된 size에 따라 스타일(아이콘 크기, 폰트 크기)이 결정됩니다.
 */
const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, withPrefixIcon, ...props }, ref) => {
    const { isStretched, size } = useAccordionContext();
    const { iconSize, labelSize } = accordionSizeMap[size];

    return (
      <AccordionPrimitive.Header>
        <StyledAccordionTrigger {...props} ref={ref} $isStretched={isStretched}>
          <StyledAccordionLabelContainer>
            {withPrefixIcon && <Icon size={iconSize} name={withPrefixIcon} aria-hidden />}
            <StyleLabel className={getLabelClassName({ size: labelSize })}>{children}</StyleLabel>
          </StyledAccordionLabelContainer>

          <StyledAccordionChevron className='arrowIcon'>
            <Icon size={iconSize} name='arrow-down-s-line' aria-hidden />
          </StyledAccordionChevron>
        </StyledAccordionTrigger>
      </AccordionPrimitive.Header>
    );
  },
);

AccordionTrigger.displayName = "Accordion.Trigger";

/**
 * Accordion.Content
 * - 아코디언이 열렸을 때 보여지는 상세 내용 영역입니다.
 */
const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, ref) => {
    const { isStretched, size } = useAccordionContext();

    return (
      <StyledAccordionContent {...props} ref={ref} $size={size}>
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
