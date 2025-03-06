import File from '../file/File';
import Uploader from '../uploader/Uploader';

import { FileExtension } from '@/constants/file';
import { FileUrl } from '@/types/file';

interface InputFileProps {
  fileList: FileUrl[];
  onDeleteFile: (id: number | string) => void;
  onAddFile: (file: FileList | null) => void;
  fileExtensions: FileExtension[];
  isDisabled: boolean;
}

function InputFile({
  fileList,
  onDeleteFile,
  onAddFile,
  fileExtensions,
  isDisabled,
}: InputFileProps) {
  return (
    <>
      <div className='gap-2xs flex flex-col'>
        {fileList.map(file => {
          return <File key={file.id} file={file} onDelete={onDeleteFile} />;
        })}
      </div>
      <Uploader fileExtensions={fileExtensions} isDisabled={isDisabled} onChangeFile={onAddFile} />
    </>
  );
}

export default InputFile;
