import type { SelectBaseProps } from "../Listbox";

interface SelectControlledProps {
  value: string | null;
  defaultValue?: never;
  onChange: (value: string) => void;
}

interface SelectUncontrolledProps {
  value?: never;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export type SelectProps = SelectBaseProps & (SelectControlledProps | SelectUncontrolledProps);
