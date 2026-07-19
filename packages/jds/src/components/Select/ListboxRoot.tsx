import { clsx } from "clsx";
import { type CSSProperties, type ReactNode, useMemo } from "react";

import { ListboxProvider } from "./ListboxContext";
import { listbox, selectContainer, selectLabel } from "./select.css";
import type { OptionVariant, SelectDimension, SelectionMode } from "./select.types";
import { useListbox } from "./useListbox";

import { getLabelClassName } from "@/utils/typography";

type ListboxRootProps = {
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
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ListboxRootProps) => {
  const { listboxRef, listboxId, isSelected, select, activeValue, setActive, getListboxProps } =
    useListbox({ mode, value, defaultValue, onChange, disabled });

  const labelId = `${listboxId}-label`;

  const containerStyle: CSSProperties = {};
  if (width !== undefined) {
    containerStyle.width = resolveDimension(width);
  }
  if (height !== undefined) {
    containerStyle.height = resolveDimension(height);
  }

  const contextValue = useMemo(
    () => ({ listboxId, disabled, variant, mode, isSelected, activeValue, select, setActive }),
    [listboxId, disabled, variant, mode, isSelected, activeValue, select, setActive],
  );

  return (
    <ListboxProvider value={contextValue}>
      <div className={selectContainer} style={containerStyle}>
        {label != null && (
          <span id={labelId} className={clsx(getLabelClassName({ size: "sm" }), selectLabel)}>
            {label}
          </span>
        )}
        <div
          ref={listboxRef}
          className={listbox}
          aria-label={label != null ? undefined : ariaLabel}
          aria-labelledby={label != null ? labelId : ariaLabelledby}
          {...getListboxProps()}
        >
          {children}
        </div>
      </div>
    </ListboxProvider>
  );
};
