import { useState } from 'react';
import { Link } from 'react-router-dom';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputArea from '@/components/common/input/InputArea';
import InputField from '@/components/common/input/InputField';
import InputFile from '@/components/common/input/InputFile';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';

// TODO: 직군 선택 후 QuestionsByPosition 렌더링
// TODO: select UI 구현
// TODO: file 전체 용량 10MB로 제한

const datas = [
  {
    id: 1,
    type: 'text',
    question: '1. 간단하게 자신을 소개해 주세요.',
    placeholder: '어떤 공부를 하셨고, 어떤 일을 하시나요? 자유롭게 적어주세요',
    maxLength: 500,
    isRequired: true,
  },
  {
    id: 2,
    type: 'url',
    question: '5. GitHub 주소나 기술 블로그가 있다면 알려주세요.',
    placeholder: 'https://github.com/...',
    maxLength: null,
  },
  {
    id: 3,
    type: 'file',
    question: '6. 포트폴리오가 있으시다면 첨부해주세요.',
    placeholder: null,
    maxLength: null,
    isRequired: null,
  },
];

function ApplyRegistration() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [fileList, setFileList] = useState<File[]>([]);

  const addFile = (file: FileList | null) => {
    if (file) setFileList(prev => [...prev, ...Array.from(file)]);
  };

  const deleteFile = (lastModified: number) => {
    setFileList(fileList.filter(file => file.lastModified !== lastModified));
  };

  return (
    <div className='bg-surface-standard-dark gap-9xl flex min-h-dvh flex-col items-center pb-(--gap-12xl)'>
      <div className='mt-(--gap-9xl)'>
        <ProgressIndicator totalStep={3} currentStep={3} />
      </div>
      <main className='gap-9xl flex flex-col items-stretch'>
        <div className='gap-9xl flex w-[26.25rem] flex-col self-center text-center'>
          <Title hierarchy='strong'>{APPLY_TITLE.registration}</Title>
          <InputField
            required
            labelText='직군'
            isError={false}
            isSuccess={false}
            placeholder='직군을 선택해주세요'
            className='group'
            InputChildren={
              <Icon
                name='dropDown'
                size='lg'
                fillColor='fill-object-assistive-dark group-focus-within:fill-object-neutral-dark'
              />
            }
          />
        </div>
        <div aria-label='divider' className='border-border-trans-alternative-dark border-b'></div>
        <form action='' className='gap-9xl flex w-[37.5rem] flex-col'>
          {datas.map(data => {
            if (data.type === 'text') {
              return (
                <fieldset className='gap-2xl flex flex-col'>
                  <Title hierarchy='normal'>{data.question}</Title>
                  <InputArea
                    labelText='답변'
                    maxLength={data.maxLength ? data.maxLength : 0}
                    required={data.isRequired ? data.isRequired : false}
                    placeholder={data.placeholder ? data.placeholder : ''}
                  />
                </fieldset>
              );
            } else if (data.type === 'url') {
              return (
                <fieldset className='gap-2xl flex flex-col'>
                  <Title hierarchy='normal'>{data.question}</Title>
                  <InputField
                    labelText='URL'
                    isError={false}
                    isSuccess={false}
                    placeholder={data.placeholder ? data.placeholder : ''}
                  />
                </fieldset>
              );
            } else if (data.type === 'file') {
              return (
                <fieldset className='gap-2xl flex flex-col'>
                  <Title hierarchy='normal'>{data.question}</Title>
                  <InputFile
                    fileList={fileList}
                    addFile={addFile}
                    deleteFile={deleteFile}
                    fileExtensions={['pdf']}
                    isDisabled={false}
                  />
                </fieldset>
              );
            }
          })}
          <div aria-label='button-area' className='gap-md flex w-[26.25rem] self-center'>
            <div className='grow'>
              <BlockButton size='lg' style='solid' hierarchy='secondary' className='w-full'>
                임시 저장하기
              </BlockButton>
            </div>
            <div className='grow'>
              <Link to={isReady ? '/apply/complete' : ''}>
                <BlockButton size='lg' style='solid' hierarchy='accent' className='w-full'>
                  지원서 제출하기
                </BlockButton>
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ApplyRegistration;
