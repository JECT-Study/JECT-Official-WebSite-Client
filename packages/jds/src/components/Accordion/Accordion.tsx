import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clsx } from "clsx";
import { forwardRef, useMemo } from "react";

import * as styles from "./accordion.css";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionSize,
  AccordionTriggerProps,
} from "./accordion.types";
import { AccordionContext, useAccordionContext } from "./accordionContext";
import { Icon } from "../Icon";
import type { IconSize } from "../Icon/Icon.types";

import type { BodySize } from "@/utils/typography";
import { getBodyClassName, getLabelClassName } from "@/utils/typography";

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, isStretched = true, size = "lg", ...props }, ref) => {
    const contextValue = useMemo(() => ({ isStretched, size }), [isStretched, size]);

    return (
      <AccordionContext.Provider value={contextValue}>
        <AccordionPrimitive.Root {...props} ref={ref}>
          <div className={styles.root}>{children}</div>
        </AccordionPrimitive.Root>
      </AccordionContext.Provider>
    );
  },
);

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
  ({ children, withPrefixIcon, className, ...props }, ref) => {
    const { isStretched, size } = useAccordionContext("Accordion.Trigger");

    const iconSize = iconSizeByAccordionSizeMap[size];

    return (
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          {...props}
          ref={ref}
          className={clsx(styles.trigger({ isStretched }), className)}
        >
          <div className={styles.labelContainer}>
            {withPrefixIcon && <Icon size={iconSize} name={withPrefixIcon} aria-hidden />}
            <span className={clsx(getLabelClassName({ size, cursor: "pointer" }), styles.label)}>
              {children}
            </span>
          </div>

          <div className={styles.chevron}>
            <Icon size={iconSize} name='arrow-down-s-line' aria-hidden />
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

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...restProps }, ref) => {
    const { isStretched, size } = useAccordionContext("Accordion.Content");
    const bodySize = bodySizeByAccordionSizeMap[size];

    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={clsx([styles.content, className])}
        {...restProps}
      >
        <div
          className={clsx([
            getBodyClassName({ size: bodySize }),
            styles.contentText({ isStretched }),
          ])}
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
