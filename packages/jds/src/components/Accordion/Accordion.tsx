import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clsx } from "clsx";
import { forwardRef } from "react";

import { AccordionProvider, useAccordionContext } from "./accordion.context";
import * as styles from "./accordion.css";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionSize,
  AccordionTriggerProps,
} from "./accordion.types";
import { Icon } from "../Icon";
import type { IconSize } from "../Icon/icon.types";

import type { BodySize } from "@/utils/typography";
import { getBodyClassName, getLabelClassName } from "@/utils/typography";

/**
 * Accordion.Root
 * - Radix UI Accordion의 루트 컨테이너입니다.
 * - Context를 통해 내부 컴포넌트들에게 size와 isStretched 상태를 공유합니다.
 */
const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, isStretched = true, size = "lg", ...restProps }, ref) => {
    return (
      <AccordionProvider value={{ isStretched, size }}>
        <AccordionPrimitive.Root ref={ref} {...restProps}>
          <div className={styles.root}>{children}</div>
        </AccordionPrimitive.Root>
      </AccordionProvider>
    );
  },
);

AccordionRoot.displayName = "Accordion.Root";

/**
 * Accordion.Item
 * - 개별 아코디언 항목을 감싸는 래퍼입니다.
 */
const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...restProps }, ref) => (
    <AccordionPrimitive.Item ref={ref} {...restProps}>
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
  ({ children, withPrefixIcon, className, ...restProps }, ref) => {
    const { isStretched, size } = useAccordionContext("Accordion.Trigger");

    const iconSize = iconSizeByAccordionSizeMap[size];

    return (
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={clsx(styles.trigger({ isStretched }), className)}
          {...restProps}
        >
          <div className={styles.labelContainer}>
            {withPrefixIcon && <Icon size={iconSize} name={withPrefixIcon} aria-hidden />}
            <span className={clsx(getLabelClassName({ size }), styles.label)}>{children}</span>
          </div>

          <div className={styles.chevron}>
            <Icon size={iconSize} name='chevron-down' aria-hidden />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);

const iconSizeByAccordionSizeMap: Record<AccordionSize, IconSize> = {
  lg: "sm",
  md: "xs",
  sm: "xs",
} as const;

AccordionTrigger.displayName = "Accordion.Trigger";

/**
 * Accordion.Content
 * - 아코디언이 열렸을 때 보여지는 상세 내용 영역입니다.
 */
const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { isStretched, size } = useAccordionContext("Accordion.Content");
    const bodySize = bodySizeByAccordionSizeMap[size];

    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={clsx(styles.content, className)}
        {...restProps}
      >
        <div
          className={clsx(
            getBodyClassName({ size: bodySize }),
            styles.contentText({ isStretched }),
          )}
        >
          {children}
        </div>
      </AccordionPrimitive.Content>
    );
  },
);

const bodySizeByAccordionSizeMap: Record<AccordionSize, BodySize> = {
  lg: "lg",
  md: "md",
  sm: "xs",
} as const;

AccordionContent.displayName = "Accordion.Content";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
