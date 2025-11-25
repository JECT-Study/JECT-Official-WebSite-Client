import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { StyledTooltipContent } from './tooltip.styles';
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from './tooltip.types';

const TooltipRoot = ({ children, delayDuration = 0, ...radixProps }: TooltipProps) => {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...radixProps}>
      {children}
    </TooltipPrimitive.Root>
  );
};

TooltipRoot.displayName = 'Tooltip.Root';

const TooltipTrigger = ({ children, asChild = true, ...restProps }: TooltipTriggerProps) => {
  return (
    <TooltipPrimitive.Trigger asChild={asChild} {...restProps}>
      {children}
    </TooltipPrimitive.Trigger>
  );
};

TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipContent = ({
  children,
  side = 'top',
  sideOffset = 8,
  collisionPadding = 0,
  avoidCollisions = true,
  ...restProps
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <StyledTooltipContent
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        avoidCollisions={avoidCollisions}
        {...restProps}
      >
        {children}
      </StyledTooltipContent>
    </TooltipPrimitive.Portal>
  );
};

TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
  Provider: TooltipPrimitive.Provider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
