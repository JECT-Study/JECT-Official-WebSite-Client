declare module "@storybook-utils/layout" {
  import type { ComponentType, HTMLAttributes } from "react";

  interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    gap?: string;
  }

  export const FlexRow: ComponentType<FlexProps>;
  export const FlexColumn: ComponentType<FlexProps>;
  export const Label: ComponentType<HTMLAttributes<HTMLSpanElement>>;
}

declare module "@storybook-utils/field" {
  import type { Meta } from "@storybook/react-vite";
  import type { ComponentType, CSSProperties } from "react";

  export const FIELD_WIDTH: CSSProperties;
  export const fieldArgTypes: NonNullable<Meta["argTypes"]>;
  export const FIELD_PLAYGROUND_ARGS: {
    status: "default";
    disabled: boolean;
    readonly: boolean;
    required: boolean;
  };
  export const FormResult: ComponentType<{ value: string | null }>;
}

declare module "@storybook-utils/selectOptions" {
  import type { ReactElement } from "react";

  import type { SelectOption } from "@/components/Listbox";

  export const REGIONS: SelectOption[];
  export const REGION_OPTIONS: SelectOption[];
  export const OPTION_SUFFIX: ReactElement;
  export const toCaptionedOptions: (options: SelectOption[]) => SelectOption[];
  export const toSuffixedOptions: (options: SelectOption[]) => SelectOption[];
  export const toExpressiveOptions: (options: SelectOption[]) => SelectOption[];
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
