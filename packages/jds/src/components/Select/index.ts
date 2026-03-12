import { Select as SelectBase } from "./Select";
import { SelectCheckbox } from "./SelectCheckbox";
import { SelectList } from "./SelectList";
import { SelectRadio } from "./SelectRadio";

export const Select = Object.assign(SelectBase, {
  List: SelectList,
  Radio: SelectRadio,
  Checkbox: SelectCheckbox,
});

export type {
  SelectProps,
  SelectListProps,
  SelectRadioProps,
  SelectCheckboxProps,
  SelectVariant,
  SelectSize,
  SelectValue,
  SelectContextType,
} from "./select.types";
