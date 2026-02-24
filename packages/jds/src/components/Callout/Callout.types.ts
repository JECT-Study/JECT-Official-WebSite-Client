import type { ReactNode } from "react";

import type { LabelButtonBasicProps } from "../Button/LabelButton";

export type BasicHierarchy = "primary" | "secondary";
export type FeedbackHierarchy = "positive" | "destructive" | "notifying";
export type CalloutSize = "lg" | "md" | "sm" | "xs";

export interface BaseCalloutProps {
  size?: CalloutSize;
  title?: string;
  className?: string;
  labelButtonProps?: Omit<LabelButtonBasicProps, "size">;
  children: ReactNode;
}

export interface BasicCalloutProps extends BaseCalloutProps {
  hierarchy: BasicHierarchy;
}

export interface FeedbackCalloutProps extends BaseCalloutProps {
  feedback: FeedbackHierarchy;
}

export interface CalloutBasicDivProps {
  hierarchy: BasicHierarchy;
  size: CalloutSize;
}

export interface CalloutFeedbackDivProps {
  hierarchy: FeedbackHierarchy;
  size: CalloutSize;
}

export interface CalloutPProps {
  size: CalloutSize;
}
