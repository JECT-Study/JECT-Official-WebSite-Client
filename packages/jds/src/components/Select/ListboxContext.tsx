import { createContext, useContext } from "react";

import type { OptionVariant, SelectionMode } from "./select.types";

export interface ListboxContextValue {
  listboxId: string;
  disabled: boolean;
  variant: OptionVariant;
  mode: SelectionMode;
  isSelected: (value: string) => boolean;
  activeValue: string | null;
  select: (value: string) => void;
  setActive: (value: string | null) => void;
}

const ListboxContext = createContext<ListboxContextValue | null>(null);

export const ListboxProvider = ListboxContext.Provider;

export const useListboxContext = (): ListboxContextValue => {
  const context = useContext(ListboxContext);
  if (!context) {
    throw new Error("Select 하위 컴포넌트는 Select 또는 MultiSelect 내부에서만 사용되어야 합니다.");
  }
  return context;
};
