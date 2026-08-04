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

  export type LiveRegionScenario = "status" | "alert" | "mixed" | "multiple-alerts";
  export type NotificationType = "toast" | "snackbar";

  interface LiveRegionDemoProps {
    notificationType: NotificationType;
    onNotify: (scenario: LiveRegionScenario) => void;
  }

  export const LiveRegionDemo: ComponentType<LiveRegionDemoProps>;
}
