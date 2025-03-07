import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputArea from '@/components/common/input/InputArea';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import { Select } from '@/components/common/select/Select';
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

type Position = '프론트엔드 개발자' | '백엔드 개발자' | '프로젝트 매니저' | '프로덕트 디자이너';

const POSITIONS = ['프론트엔드 개발자', '백엔드 개발자', '프로젝트 매니저', '프로덕트 디자이너'];

const position: Record<string, Position> = {
  fe: '프론트엔드 개발자',
  be: '백엔드 개발자',
  pm: '프로젝트 매니저',
  pd: '프로덕트 디자이너',
};

function ApplyRegistration() {
  const [selectPosition, setSelectPosition] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);

  const positionRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const addFile = (file: FileList | null) => {
    if (file) setFileList(prev => [...prev, ...Array.from(file)]);
  };

  const deleteFile = (lastModified: number) => {
    setFileList(fileList.filter(file => file.lastModified !== lastModified));
  };

  const handleSelect = (label: string | null) => {
    setSelectPosition(label);
    setIsSelectOpen(!isSelectOpen);
  };

  const handleKeyDownPosition = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      const value = positionRef.current?.value;

      if (value && POSITIONS.includes(value)) {
        setSelectPosition(value);
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
                ref={positionRef}
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                onKeyDown={handleKeyDownPosition}
                value={selectPosition ?? undefined}
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
                      { label: position.fe },
                      { label: position.be },
                      { label: position.pm },
                      { label: position.pd },
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
                        {/* <InputFile
                            fileList={fileList}
                            addFile={addFile}
                            deleteFile={deleteFile}
                            fileExtensions={['pdf']}
                            isDisabled={false}
                          /> */}
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
