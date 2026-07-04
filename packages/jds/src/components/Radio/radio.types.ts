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

export type RadioIndicatorProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  size?: RadioSize;
};

export type RadioLabelProps = {
  children: ReactNode;
};

export type RadioHelperProps = {
  children: ReactNode;
};
