import type { SelectBaseProps } from "../Listbox";

type SelectControlledProps = {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
};

type SelectUncontrolledProps = {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type SelectProps = SelectBaseProps & (SelectControlledProps | SelectUncontrolledProps);
