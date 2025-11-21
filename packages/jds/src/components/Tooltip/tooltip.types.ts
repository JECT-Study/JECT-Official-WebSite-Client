import type { Tooltip } from 'radix-ui';
import type { ReactNode } from 'react';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps extends Omit<Tooltip.TooltipProps, 'children'> {
  children: ReactNode;
  side?: TooltipSide;
  sideOffset?: number;
  collisionPadding?: number;
}

export type TooltipTriggerProps = Tooltip.TooltipTriggerProps;

export type TooltipContentProps = Tooltip.TooltipContentProps;
