import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { AriaLabelProps, RenderableNode } from "types";

export const RADIO_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const RADIO_VARIANT_OPTIONS = ["hollow", "outlined"] as const;

export type RadioSize = (typeof RADIO_SIZE_OPTIONS)[number];
export type RadioVariant = (typeof RADIO_VARIANT_OPTIONS)[number];

type RadioRootLayoutProps =
  | { layout?: "vertical"; columns?: never }
  | { layout: "grid"; columns: number };

interface RadioRootControlledProps {
  value: string;
  defaultValue?: never;
  onChange: (value: string) => void;
}

interface RadioRootUncontrolledProps {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

interface RadioRootBaseProps {
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  stretched?: boolean;
  name?: string;
  children: ReactNode;
}

export type RadioRootProps = RadioRootBaseProps &
  AriaLabelProps &
  RadioRootLayoutProps &
  (RadioRootControlledProps | RadioRootUncontrolledProps);

export interface RadioItemProps extends Omit<ComponentPropsWithoutRef<"button">, "value"> {
  value: string;
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  stretched?: boolean;
  children: ReactNode;
}

export interface RadioOption {
  value: string;
  label: RenderableNode;
  helper?: ReactNode;
  disabled?: boolean;
}

interface RadioGroupBaseProps {
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  stretched?: boolean;
  name?: string;
  options: RadioOption[];
}

export type RadioGroupProps = RadioGroupBaseProps &
  AriaLabelProps &
  RadioRootLayoutProps &
  (RadioRootControlledProps | RadioRootUncontrolledProps);

export interface RadioIndicatorProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioLabelProps {
  children: ReactNode;
}

export interface RadioHelperProps {
  children: ReactNode;
}
