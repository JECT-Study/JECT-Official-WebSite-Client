import type * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children: ReactNode;
  side?: TooltipSide;
  sideOffset?: number;
  delayDuration?: number;
}

export interface TooltipTriggerProps extends RadixTooltip.TooltipTriggerProps {
  children: ReactNode;
}

export interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  children: ReactNode;
}
