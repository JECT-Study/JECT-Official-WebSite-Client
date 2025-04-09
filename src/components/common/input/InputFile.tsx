import { ReactNode } from 'react';

import Label from '../label/Label';
import Uploader from '../uploader/Uploader';

import { FileExtensions } from '@/types/ui/file';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';

interface InputFileProps {
  children: ReactNode;
  fileExtensions: FileExtensions[];
  currentSize: number;
  maxSize: number;
  isDisabled: boolean;
  onAddFile: (file: FileList | null) => void;
  labelText?: string;
  isRequired?: boolean;
}

function InputFile({
  children,
  fileExtensions,
  currentSize = 0,
  maxSize,
  isDisabled,
  onAddFile,
  labelText,
  isRequired = false,
}: InputFileProps) {
  const size = changeFileSizeUnit(currentSize, ['MB'], false);
  return (
    <div className='gap-2xs flex flex-col'>
      <Label
        hierarchy='normal'
        weight='normal'
        textColor='text-object-neutral-dark'
        isRequired={isRequired}
      >
        {labelText}
      </Label>
      <div className='bg-surface-standard-dark radius-sm border-border-trans-assistive-dark gap-md flex flex-col border px-(--gap-md) py-(--gap-sm)'>
        {children && <div className='gap-2xs flex flex-col'>{children}</div>}
        <Uploader
          fileExtensions={fileExtensions}
          isDisabled={isDisabled}
          onChangeFile={onAddFile}
          maxSize={maxSize}
        />
      </div>
      <div className={`text-object-assistive-dark body-sm cursor-default self-end`}>
        {`${size === '0.0' ? '0' : size}/${maxSize}MB`}
      </div>
    </div>
  );
}

export default InputFile;
