import { useRef } from 'react';

import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import { Select } from '@/components/common/select/Select';
import useCloseOutside from '@/hooks/useCloseOutside';
import { JobFamily } from '@/types/apis/question';

interface selectBoxProps {
  selectedPosition: JobFamily | null;
  onLoadQuestion: (position: JobFamily) => void;
  onOpenDialog: (position: JobFamily) => void;
}

const POSITIONS: JobFamily[] = ['FE', 'BE', 'PM', 'PD'];

const jobFamily: Record<JobFamily, string> = {
  FE: '프론트엔드 개발자',
  BE: '백엔드 개발자',
  PM: '프로덕트 매니저',
  PD: '프로덕트 디자이너',
};

function SelectBox({ selectedPosition, onLoadQuestion, onOpenDialog }: selectBoxProps) {
  const selectRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);

  const handleSelect = (label: string | null) => {
    const position = POSITIONS.find(key => jobFamily[key] === label);

    if (!position) return setIsOpen(false);

    if (!selectedPosition) {
      onLoadQuestion(position);
    } else if (selectedPosition !== position) {
      onOpenDialog(position);
    }

    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <InputField
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={({ key }) => key === 'Enter' && setIsOpen(!isOpen)}
        value={selectedPosition ? jobFamily[selectedPosition] : ''}
        required
        labelText='포지션'
        isError={false}
        isSuccess={false}
        placeholder='포지션을 선택해주세요'
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
          <Select
            items={[
              { label: jobFamily.FE },
              { label: jobFamily.BE },
              { label: jobFamily.PM },
              { label: jobFamily.PD },
            ]}
            defaultValue={selectedPosition ? jobFamily[selectedPosition] : ''}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default SelectBox;
