import File from '../file/File';
import Uploader from '../uploader/Uploader';

import { FileExtension } from '@/constants/file';

interface InputFileProps {
  fileList: File[];
  deleteFile: (lastModified: number) => void;
  addFile: (file: FileList | null) => void;
  fileExtensions: FileExtension[];
  isDisabled: boolean;
}

function InputFile({ fileList, deleteFile, addFile, fileExtensions, isDisabled }: InputFileProps) {
  return (
    <>
      <div className='gap-2xs flex flex-col'>
        {fileList.map(file => (
          <File key={file.lastModified} id={file.lastModified} file={file} onDelete={deleteFile} />
        ))}
      </div>
      <Uploader fileExtensions={fileExtensions} isDisabled={isDisabled} onChangeFile={addFile} />
    </>
  );
}

export default InputFile;
