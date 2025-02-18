import { Dispatch, useState } from 'react';

import File from './File';
import Uploader from './Uploader';

interface InputFileProps {
  setAnswers: Dispatch<React.SetStateAction<string | null>>;
}

function InputFile({ setAnswers }: InputFileProps) {
  const [fileList, setFileList] = useState<File[]>([]);

  const addFile = (file: FileList | null) => {
    if (file) setFileList(prev => [...prev, ...Array.from(file)]);
  };

  const deleteFile = (lastModified: number) => {
    setFileList(fileList.filter(file => file.lastModified !== lastModified));
  };

  return (
    <>
      <div className='gap-2xs flex flex-col'>
        {fileList.map(file => (
          <File key={file.lastModified} file={file} onClick={deleteFile} />
        ))}
      </div>
      <Uploader isDisabled={false} onChangeFile={addFile} />
    </>
  );
}

export default InputFile;
