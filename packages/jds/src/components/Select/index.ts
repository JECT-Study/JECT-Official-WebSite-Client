import { Select as SelectBase } from "./Select";
import { SelectCheckbox } from "./SelectCheckbox";
import { SelectLabel } from "./SelectLabel";
import { SelectRadio } from "./SelectRadio";

export const Select = Object.assign(SelectBase, {
  Label: SelectLabel,
  Radio: SelectRadio,
  Checkbox: SelectCheckbox,
});

export type {
  SelectProps,
  SelectLabelProps,
  SelectRadioProps,
  SelectCheckboxProps,
  SelectVariant,
  SelectSize,
  SelectValue,
  SelectContextType,
} from "./select.types";
