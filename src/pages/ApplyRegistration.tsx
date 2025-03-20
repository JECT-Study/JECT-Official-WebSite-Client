import clsx from 'clsx';
import { useRef, useState } from 'react';

import FileField from '@/components/apply/FileField';
import TextField from '@/components/apply/textField';
import UrlField from '@/components/apply/UrlField';
import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import { Select } from '@/components/common/select/Select';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import useCloseOutside from '@/hooks/useCloseOutside';
import useDraftQuery from '@/hooks/useDraftQuery';
import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { Answers, Portfolio } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';

const POSITIONS = ['프론트엔드 개발자', '백엔드 개발자', '프로덕트 매니저', '프로덕트 디자이너'];

const jobFamily: Record<string, JobFamily> = {
  '프론트엔드 개발자': 'FE',
  '백엔드 개발자': 'BE',
  '프로덕트 매니저': 'PM',
  '프로덕트 디자이너': 'PD',
};

function ApplyRegistration() {
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectPosition, setSelectPosition] = useState('');
  const [values, setValues] = useState<Answers>({
    answers: {},
    portfolios: [],
  });
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);
  const { questions } = useQuestionsQuery(jobFamily[selectPosition]);
  const { saveDraftMutate } = useDraftQuery();

  const handleChangeAnswer = (id: number, text: string) => {
    setValues({ ...values, answers: { ...values.answers, [id]: text } });
  };

  const handleChangePortfolios = (files: Portfolio[]) => {
    setValues({ ...values, portfolios: files });
  };

  const handleSelect = (label: string | null) => {
    if (label) {
      setSelectPosition(label);
      setIsOpen(false);
    }
  };

  const saveDraft = () => {
    const answers = {
      ...values,
      portfolios: values.portfolios.map((portfolio, index) => ({
        fileUrl: portfolio.fileUrl,
        fileName: portfolio.fileName,
        fileSize: portfolio.fileSize,
        sequence: (index + 1).toString(),
      })),
    };

    saveDraftMutate({ param: jobFamily[selectPosition], answers });
  };

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
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={({ key }) => key === 'Enter' && setIsOpen(!isOpen)}
                value={selectPosition ?? ''}
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
              {isOpen && (
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
            <form action='' className='gap-7xl flex flex-col' encType='multipart/form-data'>
              {questions?.map(data => {
                switch (data.inputType) {
                  case 'TEXT':
                    return <TextField key={data.id} data={data} onChange={handleChangeAnswer} />;
                  case 'URL':
                    return <UrlField key={data.id} data={data} onChange={handleChangeAnswer} />;
                  case 'FILE':
                    return (
                      <FileField key={data.id} data={data} onChange={handleChangePortfolios} />
                    );
                }
              })}
            </form>
          )}
          <div aria-label='button-area' className='gap-md flex w-full self-center *:flex-1'>
            <BlockButton size='lg' style='solid' hierarchy='secondary' onClick={saveDraft}>
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
