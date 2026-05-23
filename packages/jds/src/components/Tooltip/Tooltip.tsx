import { clsx } from "clsx";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { forwardRef, type ElementRef } from "react";

import * as styles from "./tooltip.css";
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from "./tooltip.types";

const TooltipRoot = ({ children, ...radixProps }: TooltipProps) => {
  return (
    <TooltipPrimitive.Root {...radixProps}>
      {children}
    </TooltipPrimitive.Root>
  );
};

TooltipRoot.displayName = "Tooltip.Root";

//Todo: avoidCollisions로 제어되고 있는 위치 감지를 디자인 에셋에서 요구하는 감지 플로우로 변경 시 내부 Context 활용 필요 가능성
const TooltipTrigger = forwardRef<ElementRef<typeof TooltipPrimitive.Trigger>, TooltipTriggerProps>(
  ({ children, asChild = true, ...restProps }, ref) => {
    return (
      <TooltipPrimitive.Trigger ref={ref} asChild={asChild} {...restProps}>
        {children}
      </TooltipPrimitive.Trigger>
    );
  },
);

TooltipTrigger.displayName = "Tooltip.Trigger";

const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  (
    {
      children,
      side = "top",
      sideOffset = 8,
      collisionPadding = 0,
      avoidCollisions = true,
      className,
      ...restProps
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          avoidCollisions={avoidCollisions}
          className={clsx(styles.content, styles.contentTextStyle, className)}
          {...restProps}
        >
          {children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  },
);

TooltipContent.displayName = "Tooltip.Content";

export const Tooltip = {
  Provider: TooltipPrimitive.Provider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
