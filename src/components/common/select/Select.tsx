import clsx from 'clsx';
import { ReactNode, useState } from 'react';

import Icon from '@/components/common/icon/Icon';
import Interaction from '@/components/common/interaction/Interaction';

type SelectItemProps = {
  label: string;
  isSelected: boolean;
  onClick: (label: string) => void;
  disabled?: boolean;
  children?: ReactNode;
};

export const SelectItem = ({
  label,
  isSelected,
  onClick,
  disabled = false,
  children,
}: SelectItemProps) => {
  const buttonClass = clsx('peer radius-xs flex w-full items-start justify-between p-(--gap-sm)', {
    'text-object-disabled-dark cursor-not-allowed pointer-events-none': disabled,
    'text-object-hero-dark cursor-pointer pointer-events-auto': !disabled && isSelected,
    'text-object-neutral-dark cursor-pointer pointer-events-auto': !disabled && !isSelected,
  });

  return (
    <Interaction
      variant='default'
      density='normal'
      isInversed={false}
      className='peer-hover:duration-faster peer-hover:ease-(--motion-fluent)'
    >
      <button
        onClick={() => !disabled && onClick(label)}
        disabled={!!disabled}
        className={buttonClass}
      >
        <span className='body-lg self-stretch'>{label}</span>
        {children}
      </button>
    </Interaction>
  );
};

type SelectOption = {
  label: string;
  disabled?: boolean;
};

interface SelectProps {
  items: SelectOption[];
  onChange?: (label: string | null) => void;
}

export const Select = ({ items, onChange }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleItemClick = (label: string) => {
    const newValue = selectedValue === label ? null : label;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className='gap-5xs radius-md border-border-trans-assistive-dark bg-surface-embossed-dark opacity-visible shadow-overlay flex w-[20rem] flex-col border p-(--gap-2xs)'>
      {items.map(({ label, disabled }) => (
        <SelectItem
          key={label}
          label={label}
          isSelected={selectedValue === label}
          onClick={handleItemClick}
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
