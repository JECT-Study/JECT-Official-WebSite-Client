import { Dispatch, useState } from 'react';

import File from '../file/File';
import Uploader from '../file/Uploader';

import { FileExtension } from '@/constants/file';

interface InputFileProps {
  setAnswers: Dispatch<React.SetStateAction<string | null>>;
  fileExtensions: FileExtension[];
}

// TODO: file 전체 용량 10MB로 제한 + Uploader isDisabled 설정

function InputFile({ setAnswers, fileExtensions }: InputFileProps) {
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
      <Uploader fileExtensions={fileExtensions} isDisabled={false} onChangeFile={addFile} />
    </>
  );
}

export default InputFile;
