import File from '../file/File';
import Label from '../label/Label';
import Uploader from '../uploader/Uploader';

import { FileExtension } from '@/constants/file';
import { FileUrl } from '@/types/file';

interface InputFileProps {
  fileList: FileUrl[];
  onDeleteFile: (id: number | string) => void;
  onAddFile: (file: FileList | null) => void;
  fileExtensions: FileExtension[];
  isDisabled: boolean;
  maxSize: number;
  labelText?: string;
  isRequired?: boolean;
}

function InputFile({
  fileList,
  onDeleteFile,
  onAddFile,
  fileExtensions,
  isDisabled,
  maxSize,
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
        {fileList.length > 0 && (
          <div className='gap-2xs flex flex-col'>
            {fileList.map(file => {
              return <File key={file.id} file={file} onDelete={onDeleteFile} />;
            })}
          </div>
        )}
        <Uploader
          fileExtensions={fileExtensions}
          isDisabled={isDisabled}
          onChangeFile={onAddFile}
        />
      </div>
      <div className={`text-object-assistive-dark body-sm cursor-default self-end`}>
        {`${0}/${maxSize || 0}MB`}
      </div>
    </div>
  );
}

export default InputFile;
