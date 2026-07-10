import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const RADIO_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const RADIO_VARIANT_OPTIONS = ["hollow", "outlined"] as const;

export type RadioSize = (typeof RADIO_SIZE_OPTIONS)[number];
export type RadioVariant = (typeof RADIO_VARIANT_OPTIONS)[number];

type RadioRootControlledProps = {
  value: string;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type RadioRootUncontrolledProps = {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

type RadioRootBaseProps = {
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  name?: string;
  children: ReactNode;
};

export type RadioRootProps = RadioRootBaseProps &
  (RadioRootControlledProps | RadioRootUncontrolledProps);

export type RadioItemProps = Omit<ComponentPropsWithoutRef<"button">, "value"> & {
  value: string;
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  children: ReactNode;
};

export type RadioOption = {
  value: string;
  label: ReactNode;
  helper?: ReactNode;
  disabled?: boolean;
};

type RadioGroupBaseProps = {
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  name?: string;
  options: RadioOption[];
};

export type RadioGroupProps = RadioGroupBaseProps &
  (RadioRootControlledProps | RadioRootUncontrolledProps);

export type RadioIndicatorProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
};

export type RadioLabelProps = {
  children: ReactNode;
};

export type RadioHelperProps = {
  children: ReactNode;
};
