import type { SelectBaseProps } from "../Listbox";

interface MultiSelectControlledProps {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
}

interface MultiSelectUncontrolledProps {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type MultiSelectProps = SelectBaseProps &
  (MultiSelectControlledProps | MultiSelectUncontrolledProps);
