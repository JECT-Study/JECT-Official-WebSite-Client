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

export interface BasicCalloutModeProps extends BaseCalloutProps {
  hierarchy?: BasicHierarchy;
  feedback?: never;
}

export interface FeedbackCalloutModeProps extends BaseCalloutProps {
  feedback: FeedbackHierarchy;
  hierarchy?: never;
}

export type CalloutProps = BasicCalloutModeProps | FeedbackCalloutModeProps;

export interface CalloutStyleToken {
  bg: string;
  border: string;
  color: string;
}

export interface CalloutContainerProps {
  $size: CalloutSize;
  $styleToken: CalloutStyleToken;
}

export interface CalloutTextProps {
  $size: CalloutSize;
}
