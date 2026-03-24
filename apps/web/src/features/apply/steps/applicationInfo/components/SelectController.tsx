import { Select, SelectField } from "@jects/jds";
import type { ReactNode } from "react";
import { useRef } from "react";

import useCloseOutside from "@/hooks/useCloseOutside";
import { findLabelByValue } from "@/types/profile";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectControllerProps<TOptions extends readonly SelectOption[]> {
  label: ReactNode;
  placeholder: string;
  options: TOptions;
  value?: TOptions[number]["value"];
  onChange: (value: TOptions[number]["value"]) => void;
}
// TODO: Select 키보드 접근성
export function SelectController<TOptions extends readonly SelectOption[]>({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectControllerProps<TOptions>) {
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isOpen, onToggle, onClose } = useCloseOutside([inputRef, dropdownRef]);

  return (
    <div className='relative flex flex-col'>
      <SelectField
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={value ? findLabelByValue(options, value) : ""}
        isOpen={isOpen}
        onClick={onToggle}
      />

      {isOpen && (
        <div className='absolute top-[calc(100%+8px)] right-0 left-0 z-10'>
          <Select
            ref={dropdownRef}
            value={value ?? ""}
            onChange={v => {
              onChange(v as TOptions[number]["value"]);
              onClose();
            }}
          >
            {options.map(option => (
              <Select.Label key={option.value} value={option.value}>
                {option.label}
              </Select.Label>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
