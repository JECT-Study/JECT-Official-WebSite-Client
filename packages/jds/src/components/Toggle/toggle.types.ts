import type { ComponentPropsWithoutRef } from "react";

type NativeInputProps = ComponentPropsWithoutRef<"input">;

interface ToggleControlledProps {
  checked: boolean;
  defaultChecked?: never;
  onChange: NonNullable<NativeInputProps["onChange"]>;
}

interface ToggleUncontrolledProps {
  checked?: never;
  defaultChecked?: boolean;
  onChange?: NativeInputProps["onChange"];
}

interface ToggleBaseProps extends Omit<
  NativeInputProps,
  "checked" | "children" | "defaultChecked" | "onChange" | "readOnly" | "role" | "type"
> {
  children?: never;
}

export type ToggleProps = ToggleBaseProps & (ToggleControlledProps | ToggleUncontrolledProps);
