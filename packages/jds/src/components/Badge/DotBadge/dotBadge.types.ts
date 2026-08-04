import type { ComponentPropsWithoutRef } from "react";

import type { BadgeSize, FeedbackVariant } from "../badge.types";

export interface DotBadgeProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  feedback?: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}
