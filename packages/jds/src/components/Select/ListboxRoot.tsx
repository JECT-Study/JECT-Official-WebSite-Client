import { clsx } from "clsx";
import { type CSSProperties, type ReactNode } from "react";

import { ListboxProvider } from "./ListboxContext";
import { listbox, selectContainer, selectLabel } from "./select.css";
import type { OptionVariant, SelectDimension, SelectionMode } from "./select.types";
import { useListbox } from "./useListbox";

import { getLabelClassName } from "@/utils/typography";

interface ListboxRootProps {
  mode: SelectionMode;
  variant: OptionVariant;
  disabled: boolean;
  label?: string;
  width?: SelectDimension;
  height?: SelectDimension;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  children?: ReactNode;
}

const resolveDimension = (value: SelectDimension) => (value === "full" ? "100%" : value);

export const ListboxRoot = ({
  mode,
  variant,
  disabled,
  label,
  width,
  height,
  value,
  defaultValue,
  onChange,
  children,
}: ListboxRootProps) => {
  const {
    listboxRef,
    listboxId,
    isSelected,
    select,
    activeValue,
    setActive,
    registerOption,
    getListboxProps,
  } = useListbox({ mode, value, defaultValue, onChange, disabled });

  const labelId = `${listboxId}-label`;

  const containerStyle: CSSProperties = {};
  if (width !== undefined) {
    containerStyle.width = resolveDimension(width);
  }
  if (height !== undefined) {
    containerStyle.height = resolveDimension(height);
  }

  return (
    <ListboxProvider
      value={{
        disabled,
        variant,
        mode,
        isSelected,
        activeValue,
        select,
        setActive,
        registerOption,
      }}
    >
      <div className={selectContainer} style={containerStyle}>
        {label != null && (
          <span id={labelId} className={clsx(getLabelClassName({ size: "sm" }), selectLabel)}>
            {label}
          </span>
        )}
        <div
          ref={listboxRef}
          className={listbox}
          aria-labelledby={label != null ? labelId : undefined}
          {...getListboxProps()}
        >
          {children}
        </div>
      </div>
    </ListboxProvider>
  );
};
