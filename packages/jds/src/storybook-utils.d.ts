declare module "@storybook-utils/layout" {
  import type { ComponentType, HTMLAttributes } from "react";

  interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    gap?: string;
  }

  export const FlexRow: ComponentType<FlexProps>;
  export const FlexColumn: ComponentType<FlexProps>;
  export const Label: ComponentType<HTMLAttributes<HTMLSpanElement>>;
}

declare module "@storybook-utils/LiveRegionDemo" {
  import type { ComponentType } from "react";

  export type LiveRegionFeedback = "status" | "alert";
  export type NotificationType = "toast" | "snackbar";

  interface LiveRegionDemoProps {
    notificationType: NotificationType;
    onNotify: (feedback: LiveRegionFeedback) => void;
  }

  export const LiveRegionDemo: ComponentType<LiveRegionDemoProps>;
}
