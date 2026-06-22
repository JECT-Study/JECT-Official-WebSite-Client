import type { ReactNode } from "react";

import type { IconName } from "../Icon";

export type CalloutFeedback = "none" | "positive" | "destructive" | "notifying";
export type CalloutSize = "lg" | "md" | "sm" | "xs";

export interface CalloutProps {
  size?: CalloutSize;
  feedback?: CalloutFeedback;
  title?: string;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}
