import { Dispatch, useState } from 'react';

import File from './File';
import Uploader from './Uploader';
import InputArea from '../common/input/InputArea';
import InputField from '../common/input/InputField';
import Title from '../common/Title';

interface QuestionsByPositionProps {
  position: string;
  setAnswers: Dispatch<React.SetStateAction<string | null>>;
}

// TODO: file 전체 용량 10MB로 제한 + Uploader isDisabled 설정
// TODO: pdf 이외의 파일 예외처리
// TODO: position과 문항 타입에 맞게 UI 렌더링

function QuestionsByPosition({ position, setAnswers }: QuestionsByPositionProps) {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleUpload = (file: FileList | null) => {
    if (file) {
      setFileList(prev => [...prev, ...Array.from(file)]);
    }
  };

  const deleteFile = (lastModified: number) => {
    setFileList(fileList.filter(file => file.lastModified !== lastModified));
  };

  return (
    <form action='' className='gap-9xl flex w-[37.5rem] flex-col'>
      <div className='gap-2xl flex flex-col'>
        <Title hierarchy='normal'>1. 간단하게 자신을 소개해 주세요.</Title>
        <InputArea
          labelText='답변'
          maxLength={500}
          required
          placeholder='어떤 공부를 하셨고, 어떤 일을 하시나요? 자유롭게 적어주세요'
        />
      </div>
      <div className='gap-2xl flex flex-col'>
        <Title hierarchy='normal'>5. GitHub 주소나 기술 블로그가 있다면 알려주세요.</Title>
        <InputField
          labelText='URL'
          isError={false}
          isSuccess={false}
          placeholder='https://github.com/...'
        />
      </div>
      <div className='gap-2xl flex flex-col'>
        <Title hierarchy='normal'>6. 포트폴리오가 있으시다면 첨부해주세요. </Title>
        <div className='gap-2xs flex flex-col'>
          {fileList.map(file => (
            <File key={file.lastModified} file={file} onClick={deleteFile} />
          ))}
        </div>
        <Uploader isDisabled={false} onChangeFile={handleUpload} />
      </div>
    </form>
  );
}

export default QuestionsByPosition;
