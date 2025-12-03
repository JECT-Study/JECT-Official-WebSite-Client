import type { Tooltip } from "radix-ui";
import type { ReactNode } from "react";

export interface TooltipProps extends Omit<Tooltip.TooltipProps, "children"> {
  children: ReactNode;
}

export type TooltipTriggerProps = Tooltip.TooltipTriggerProps;

export interface TooltipContentProps extends Tooltip.TooltipContentProps {
  children?: ReactNode;
}
