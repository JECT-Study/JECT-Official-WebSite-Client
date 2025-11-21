import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { createContext, useContext } from 'react';

import { StyledTooltipContent } from './tooltip.styles';
import type {
  TooltipContentProps,
  TooltipProps,
  TooltipSide,
  TooltipTriggerProps,
} from './tooltip.types';

interface TooltipContextValue {
  side: TooltipSide;
  sideOffset: number;
  collisionPadding: number;
}

const TooltipContext = createContext<TooltipContextValue | undefined>(undefined);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip 하위 컴포넌트는 반드시 Tooltip 컴포넌트 내부에서 사용되어야 합니다.');
  }
  return context;
};

const TooltipRoot = ({
  children,
  side = 'top',
  sideOffset = 8,
  collisionPadding = 0,
  delayDuration = 0,
  ...radixProps
}: TooltipProps) => {
  const contextValue: TooltipContextValue = {
    side,
    sideOffset,
    collisionPadding,
  };

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...radixProps}>
      <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>
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

const TooltipContent = ({ children, ...restProps }: TooltipContentProps) => {
  const { side, sideOffset, collisionPadding } = useTooltipContext();

  return (
    <TooltipPrimitive.Portal>
      <StyledTooltipContent
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
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
