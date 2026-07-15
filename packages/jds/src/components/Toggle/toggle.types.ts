import type { ComponentPropsWithoutRef } from "react";

type NativeInputProps = ComponentPropsWithoutRef<"input">;

type ToggleControlledProps = {
  checked: boolean;
  defaultChecked?: never;
  onChange: NonNullable<NativeInputProps["onChange"]>;
};

type ToggleUncontrolledProps = {
  checked?: never;
  defaultChecked?: boolean;
  onChange?: NativeInputProps["onChange"];
};

type ToggleBaseProps = Omit<
  NativeInputProps,
  "checked" | "children" | "defaultChecked" | "onChange" | "readOnly" | "role" | "type"
> & {
  children?: never;
};

export type ToggleProps = ToggleBaseProps & (ToggleControlledProps | ToggleUncontrolledProps);
