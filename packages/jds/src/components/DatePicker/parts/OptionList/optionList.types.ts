import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

import type { SelectDimension, SelectOption } from "../../../Listbox";

interface OptionListBaseProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onSelect" | "aria-label" | "aria-labelledby"
> {
  "data-part"?: never;
  options: Pick<SelectOption, "value" | "label" | "disabled">[];
  value: string;
  height: SelectDimension;
  onSelect: (value: string) => void;
}

export type OptionListProps = OptionListBaseProps & AriaLabelProps;
