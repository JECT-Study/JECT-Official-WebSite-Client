import type { ComponentPropsWithoutRef } from "react";
import type { AriaLabelProps } from "types";

import type { SelectDimension, SelectOption } from "../../../Listbox";

export type OptionListProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onSelect" | "aria-label" | "aria-labelledby"
> &
  AriaLabelProps & {
    "data-part"?: never;
    options: SelectOption[];
    value: string;
    height?: SelectDimension;
    onSelect: (value: string) => void;
  };
