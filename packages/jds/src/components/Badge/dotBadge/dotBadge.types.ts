import type { ComponentPropsWithoutRef } from "react";

import type { BadgeSize, FeedbackVariant } from "../badge.types";

export interface DotBadgeFeedbackProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  variant?: FeedbackVariant;
  size?: BadgeSize;
  isMuted?: boolean;
}
