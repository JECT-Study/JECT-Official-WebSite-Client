declare module "@storybook-utils/layout" {
  import type { ComponentType, HTMLAttributes } from "react";

  interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    gap?: string;
  }

  export const FlexRow: ComponentType<FlexProps>;
  export const FlexColumn: ComponentType<FlexProps>;
  export const Label: ComponentType<HTMLAttributes<HTMLSpanElement>>;
}
