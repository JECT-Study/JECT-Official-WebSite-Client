import { ReactNode } from 'react';

import Label from '../label/Label';
import Uploader from '../uploader/Uploader';

import { FileExtension } from '@/constants/file';

interface InputFileProps {
  children: ReactNode;
  fileExtensions: FileExtension[];
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
        {children}
        <Uploader
          fileExtensions={fileExtensions}
          isDisabled={isDisabled}
          onChangeFile={onAddFile}
          maxSize={maxSize}
        />
      </div>
      <div className={`text-object-assistive-dark body-sm cursor-default self-end`}>
        {`${currentSize}/${maxSize}MB`}
      </div>
    </div>
  );
}

export default InputFile;
