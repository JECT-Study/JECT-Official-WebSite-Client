import type { SelectBaseProps } from "../Listbox";

type MultiSelectControlledProps = {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
};

type MultiSelectUncontrolledProps = {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type MultiSelectProps = SelectBaseProps &
  (MultiSelectControlledProps | MultiSelectUncontrolledProps);
