import { ReactNode, useState } from 'react';

import Icon from '@/components/common/icon/Icon';
import Interaction from '@/components/common/interaction/Interaction';

interface SelectItemProps {
  label: string;
  isSelected: boolean;
  onClick: (label: string) => void;
  children?: ReactNode;
}

export const SelectItem = ({ label, isSelected, onClick, children }: SelectItemProps) => {
  return (
    <Interaction variant='default' density='normal' isInversed={false}>
      <button
        onClick={() => onClick(label)}
        className={`peer radius-xs opacity-visible flex w-full cursor-pointer items-start justify-between p-(--gap-sm) ${
          isSelected ? 'text-object-hero-dark' : 'text-object-neutral-dark'
        }`}
      >
        <span className='body-lg self-stretch'>{label}</span>
        {children}
      </button>
    </Interaction>
  );
};

interface SelectProps {
  items: string[];
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
      {items.map(item => (
        <SelectItem
          key={item}
          label={item}
          isSelected={selectedValue === item}
          onClick={handleItemClick}
        >
          {selectedValue === item && (
            <Icon name='check' size='lg' fillColor='fill-object-hero-dark' />
          )}
        </SelectItem>
      ))}
    </div>
  );
};
