import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState } from "react";

import Icon from "@/components/common/icon/Icon";

interface SelectItemProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  isSelected: boolean;
  clickHandler: (label: string) => void;
  children?: ReactNode;
}

export const SelectItem = ({
  label,
  isSelected,
  clickHandler,
  disabled = false,
  children,
  ...restProps
}: SelectItemProps) => {
  const buttonClass = clsx(
    "interaction-default-normal transition-faster-fluent radius-xs flex w-full items-start justify-between p-(--gap-sm)",
    {
      "text-object-disabled-dark cursor-not-allowed pointer-events-none": !!disabled,
      "text-object-hero-dark cursor-pointer pointer-events-auto": !disabled && isSelected,
      "text-object-neutral-dark cursor-pointer pointer-events-auto": !disabled && !isSelected,
    },
  );

  return (
    <button
      type='button'
      onClick={() => !disabled && clickHandler(label)}
      disabled={!!disabled}
      className={buttonClass}
      {...restProps}
    >
      <span className='body-lg self-stretch'>{label}</span>
      {children}
    </button>
  );
};

interface SelectOption {
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  items: SelectOption[];
  defaultValue?: string | null;
  onChange?: (label: string | null) => void;
}

export const Select = ({ items, defaultValue = null, onChange }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue);

  const handleItemClick = (label: string) => {
    const newValue = selectedValue === label ? null : label;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className='gap-5xs radius-md border-border-trans-assistive-dark bg-surface-embossed-dark opacity-visible shadow-overlay flex w-full flex-col border p-(--gap-2xs)'>
      {items.map(({ label, disabled }) => (
        <SelectItem
          key={label}
          label={label}
          isSelected={selectedValue === label}
          clickHandler={handleItemClick}
          disabled={disabled}
        >
          {selectedValue === label && (
            <Icon name='check' size='lg' fillColor='fill-object-hero-dark' />
          )}
        </SelectItem>
      ))}
    </div>
  );
};
