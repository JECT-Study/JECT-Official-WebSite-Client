import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { IconName } from "../Icon";

export type CalloutFeedback = "none" | "positive" | "destructive" | "notifying";
export type CalloutSize = "lg" | "md" | "sm" | "xs";

interface CalloutBaseProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  size?: CalloutSize;
  feedback?: CalloutFeedback;
  children: ReactNode;
}

interface CalloutWithTitle {
  title: string;
  icon?: IconName;
}

interface CalloutWithoutTitle {
  title?: never;
  icon?: never;
}

export type CalloutProps = CalloutBaseProps & (CalloutWithTitle | CalloutWithoutTitle);
