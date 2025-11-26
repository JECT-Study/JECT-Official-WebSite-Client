import { useRef, useState } from "react";

import Icon from "@/components/common/icon/Icon";
import InputField from "@/components/common/input/InputField";
import { Select } from "@/components/common/select/Select";
import Title from "@/components/common/title/Title";
import useCloseOutside from "@/hooks/useCloseOutside";
import type { Question } from "@/types/apis/application";

export interface SelectItem {
  id: number;
  label: string;
}

interface SelectFieldProps {
  data: Question;
  onChange: (id: number, text: string) => void;
  value: string;
}

function SelectField({ data, onChange, value }: SelectFieldProps) {
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState(value ?? "");
  const { isOpen, setIsOpen } = useCloseOutside([selectRef, inputRef]);
  const selectLabels = data.selectOptions?.map(item => ({ label: item })) ?? [];

  const handleSelect = (label: string | null) => {
    if (!data.selectOptions) return;

    const item = data.selectOptions.find(item => item === label);

    if (!item) return setIsOpen(false);

    onChange(data.id, item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>{data.title}</Title>
      <div className='relative'>
        <InputField
          readOnly
          ref={inputRef}
          onClick={() => setIsOpen(prev => !prev)}
          onKeyUp={({ key }) => key === "Enter" && setIsOpen(prev => !prev)}
          value={selectedItem}
          required={data.isRequired}
          labelText={data.label}
          isError={false}
          isSuccess={false}
          placeholder={data.inputHint}
          className='group'
          InputChildren={
            <Icon
              name='dropDown'
              size='lg'
              fillColor='fill-object-assistive-dark group-focus-within:fill-object-neutral-dark'
            />
          }
        />
        {isOpen && (
          <div className='absolute z-40 mt-[8px] w-full' ref={selectRef}>
            <Select items={selectLabels} defaultValue={selectedItem} onChange={handleSelect} />
          </div>
        )}
      </div>
    </fieldset>
  );
}

export default SelectField;
