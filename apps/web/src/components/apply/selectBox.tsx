import { useRef } from "react";

import Icon from "@/components/common/icon/Icon";
import InputField from "@/components/common/input/InputField";
import { Select } from "@/components/common/select/Select";
import useCloseOutside from "@/hooks/useCloseOutside";
import type { JobFamily } from "@/types/apis/application";

interface selectBoxProps {
  selectedJob: JobFamily | null;
  onLoadQuestion: (job: JobFamily) => void;
  onOpenDialog: (job: JobFamily) => void;
}

const JOB_FAMILY: JobFamily[] = ["FE", "BE", "PM", "PD"];

const jobFamily: Record<JobFamily, string> = {
  FE: "프론트엔드 개발자",
  BE: "백엔드 개발자",
  PM: "프로덕트 매니저",
  PD: "프로덕트 디자이너",
};

function SelectBox({ selectedJob, onLoadQuestion, onOpenDialog }: selectBoxProps) {
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, setIsOpen } = useCloseOutside([selectRef, inputRef]);

  const handleSelect = (label: string | null) => {
    const job = JOB_FAMILY.find(key => jobFamily[key] === label);

    if (!job) return setIsOpen(false);

    if (!selectedJob) {
      onLoadQuestion(job);
    } else if (selectedJob !== job) {
      onOpenDialog(job);
    }

    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <InputField
        ref={inputRef}
        readOnly
        onClick={() => setIsOpen(prev => !prev)}
        onKeyUp={({ key }) => key === "Enter" && setIsOpen(prev => !prev)}
        value={selectedJob ? jobFamily[selectedJob] : ""}
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
            defaultValue={selectedJob ? jobFamily[selectedJob] : ""}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default SelectBox;
