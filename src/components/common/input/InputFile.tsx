import File from '../file/File';
import Uploader from '../uploader/Uploader';

import { FileExtension } from '@/constants/file';

interface InputFileProps {
  fileList: File[];
  deleteFile: (id: number) => void;
  addFile: (file: FileList | null) => void;
  fileExtensions: FileExtension[];
  isDisabled: boolean;
}

function InputFile({ fileList, deleteFile, addFile, fileExtensions, isDisabled }: InputFileProps) {
  return (
    <>
      <div className='gap-2xs flex flex-col'>
        {fileList.map((file, index) => {
          const id = typeof file === 'object' ? file.lastModified : index;

          return <File key={id} id={id} file={file} onDelete={deleteFile} />;
        })}
      </div>
      <Uploader fileExtensions={fileExtensions} isDisabled={isDisabled} onChangeFile={addFile} />
    </>
  );
}

export default InputFile;
