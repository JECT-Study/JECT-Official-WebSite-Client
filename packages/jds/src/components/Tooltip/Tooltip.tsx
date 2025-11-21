import * as RadixTooltip from '@radix-ui/react-tooltip';
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
  delayDuration = 0,
}: TooltipProps) => {
  const contextValue: TooltipContextValue = {
    side,
    sideOffset,
  };

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

TooltipRoot.displayName = 'Tooltip.Root';

const TooltipTrigger = ({ children, asChild = true, ...restProps }: TooltipTriggerProps) => {
  return (
    <RadixTooltip.Trigger asChild={asChild} {...restProps}>
      {children}
    </RadixTooltip.Trigger>
  );
};

TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipContent = ({ children, ...restProps }: TooltipContentProps) => {
  const { side, sideOffset } = useTooltipContext();

  return (
    <RadixTooltip.Portal>
      <StyledTooltipContent side={side} sideOffset={sideOffset} collisionPadding={8} {...restProps}>
        {children}
      </StyledTooltipContent>
    </RadixTooltip.Portal>
  );
};

TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
