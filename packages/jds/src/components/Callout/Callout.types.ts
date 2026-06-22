import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { IconName } from "../Icon";

export type CalloutFeedback = "none" | "positive" | "destructive" | "notifying";
export type CalloutSize = "lg" | "md" | "sm" | "xs";

export interface CalloutProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  size?: CalloutSize;
  feedback?: CalloutFeedback;
  title?: string;
  icon?: IconName;
  children: ReactNode;
}
