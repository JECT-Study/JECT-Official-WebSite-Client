import type { ListboxBehavior, OptionVariant, SelectionMode } from "./listbox.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface ListboxContextValue extends ListboxBehavior {
  variant: OptionVariant;
  selectionMode: SelectionMode;
}

export const [ListboxProvider, useListboxContext] = createCtxProvider<ListboxContextValue>(
  "Listbox",
  "Select 또는 MultiSelect",
);
