import clsx from 'clsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import File from '@/components/common/file/File';
import Icon from '@/components/common/icon/Icon';
import InputArea from '@/components/common/input/InputArea';
import InputField from '@/components/common/input/InputField';
import InputFile from '@/components/common/input/InputFile';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import { Select } from '@/components/common/select/Select';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { FileUrl } from '@/types/file';

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

const POSITIONS = ['프론트엔드 개발자', '백엔드 개발자', '프로젝트 매니저', '프로덕트 디자이너'];

function ApplyRegistration() {
  const [selectPosition, setSelectPosition] = useState<string | null>(null);
  const [selectInput, setSelectInput] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [fileList, setFileList] = useState<FileUrl[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);

  const addFile = (file: FileList | null) => {
    const tempData = [
      {
        id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f',
        name: '임시 파일입니다.',
        url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
        size: 10902,
      },
      {
        id: 'b79a0212-1c4d-42c7-b3fe-b65231a9759f3',
        name: '임시 파일입니다.',
        url: 'https://github.com/user-attachments/assets/b79a0212-1c4d-42c7-b3fe-b65231a9759f',
        size: 10902,
      },
    ];

    if (file) setFileList(prev => [...prev, ...tempData]);
  };

  const deleteFile = (id: number | string) => {
    setFileList(fileList.filter(file => file.id !== id));
  };

  const handleSelect = (label: string | null) => {
    if (label) {
      setSelectInput(label);
      setSelectPosition(label);
      setIsSelectOpen(!isSelectOpen);
    }
  };

  const handleChangeSelectInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectInput(e.target.value);
  };

  const handleKeyDownPosition = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (!isSelectOpen) {
        setIsSelectOpen(!isSelectOpen);
      }

      if (POSITIONS.includes(selectInput)) {
        setSelectPosition(selectInput);
        setIsSelectOpen(!isSelectOpen);
      }
    }
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(!isSelectOpen);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', outsideClick);

      return () => document.removeEventListener('mousedown', outsideClick);
    }
  }, [selectRef, isSelectOpen]);

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={3} />
      <section className='gap-9xl flex w-[32.5rem] flex-col items-stretch *:first:text-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.registration}</Title>
        <div className={clsx(!selectPosition && '*:nth-2:text-center', 'gap-7xl flex flex-col')}>
          <div className='gap-2xl flex flex-col'>
            <Title hierarchy='normal'>어떤 포지션으로 지원하시나요?</Title>
            <div className='relative'>
              <InputField
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                onChange={handleChangeSelectInput}
                onKeyDown={handleKeyDownPosition}
                value={selectInput}
                required
                labelText='포지션'
                isError={false}
                isSuccess={false}
                placeholder='포지션을 선택해주세요'
                className='group'
                InputChildren={
                  <Icon
                    name='dropDown'
                    size='lg'
                    fillColor='fill-object-assistive-dark group-focus-within:fill-object-neutral-dark'
                  />
                }
              />
              {isSelectOpen && (
                <div className='absolute z-40 mt-[8px] w-full' ref={selectRef}>
                  <Select
                    items={[
                      { label: POSITIONS[0] },
                      { label: POSITIONS[1] },
                      { label: POSITIONS[2] },
                      { label: POSITIONS[3] },
                    ]}
                    defaultValue={selectPosition}
                    onChange={handleSelect}
                  />
                </div>
              )}
            </div>
          </div>

          {!selectPosition && (
            <Label hierarchy='normal' weight='normal' textColor='text-object-assistive-dark'>
              포지션을 선택한 뒤 아래에 추가 질문들이 표시돼요.
            </Label>
          )}
          {selectPosition && (
            <form action='' className='gap-7xl flex flex-col'>
              {datas.map(({ id, type, question, placeholder, maxLength, isRequired }) => {
                switch (type) {
                  case 'text':
                    return (
                      <fieldset key={id} className='gap-2xl flex flex-col'>
                        <Title hierarchy='normal'>{question}</Title>
                        <InputArea
                          labelText='답변'
                          maxLength={maxLength || undefined}
                          required={!!isRequired}
                          placeholder={placeholder || undefined}
                        />
                      </fieldset>
                    );
                  case 'url':
                    return (
                      <fieldset key={id} className='gap-2xl flex flex-col'>
                        <Title hierarchy='normal'>{question}</Title>
                        <InputField
                          labelText='URL'
                          isError={false}
                          isSuccess={false}
                          placeholder={placeholder || undefined}
                        />
                      </fieldset>
                    );
                  case 'file':
                    return (
                      <fieldset key={id} className='gap-2xl flex flex-col'>
                        <Title hierarchy='normal'>{question}</Title>
                        <InputFile
                          fileExtensions={['pdf']}
                          currentSize={0}
                          maxSize={100}
                          isDisabled={false}
                          onAddFile={addFile}
                          labelText='첨부파일'
                          isRequired={true}
                          fileNodes={fileList.map(file => {
                            return <File key={file.id} file={file} onDelete={deleteFile} />;
                          })}
                        />
                      </fieldset>
                    );
                }
              })}
            </form>
          )}
          <div aria-label='button-area' className='gap-md flex w-full self-center *:flex-1'>
            <BlockButton size='lg' style='solid' hierarchy='secondary'>
              임시 저장하기
            </BlockButton>
            <BlockButton size='lg' style='solid' hierarchy='accent' disabled>
              지원서 제출하기
            </BlockButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApplyRegistration;
