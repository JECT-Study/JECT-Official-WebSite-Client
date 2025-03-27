import clsx from 'clsx';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FileField from '@/components/apply/FileField';
import TextField from '@/components/apply/textField';
import UrlField from '@/components/apply/UrlField';
import BlockButton from '@/components/common/button/BlockButton';
import Dialog from '@/components/common/dialog/Dialog';
import Icon from '@/components/common/icon/Icon';
import InputField from '@/components/common/input/InputField';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import { Select } from '@/components/common/select/Select';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import useChangeJobQuery from '@/hooks/useChangeJobQuery';
import useCloseOutside from '@/hooks/useCloseOutside';
import useDialog from '@/hooks/useDialog';
import useDraftQuery from '@/hooks/useDraftQuery';
import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import { AnswersRequest, PortfolioResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';

const POSITIONS: JobFamily[] = ['FE', 'BE', 'PM', 'PD'];

const jobFamily: Record<JobFamily, string> = {
  FE: '프론트엔드 개발자',
  BE: '백엔드 개발자',
  PM: '프로덕트 매니저',
  PD: '프로덕트 디자이너',
};

const initialValue = {
  answers: {},
  portfolios: [],
};

interface LocationState {
  continue: boolean;
}

function ApplyRegistration() {
  const location = useLocation();
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectPosition, setSelectPosition] = useState<JobFamily | null>(null);
  const [selectQuestion, setSelectQuestion] = useState<JobFamily | null>(null);
  const [values, setValues] = useState<AnswersRequest>(initialValue);
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);
  const { questions } = useQuestionsQuery(selectQuestion);
  const { saveDraftMutate, draft } = useDraftQuery();
  const { changeJob } = useChangeJobQuery();
  const { isDialogOpen, openDialog, closeDialog } = useDialog();

  const handleChangeAnswer = useCallback((id: number, text: string) => {
    setValues(prev => ({ ...prev, answers: { ...prev.answers, [id]: text } }));
  }, []);

  const handleChangePortfolios = useCallback((files: PortfolioResponse[]) => {
    setValues(prev => ({ ...prev, portfolios: files }));
  }, []);

  const handleSelect = (label: string | null) => {
    if (!label) return;

    const position = POSITIONS.find(key => jobFamily[key] === label);

    if (!position) return;

    if (selectPosition && selectPosition !== position) {
      openDialog();
      setSelectPosition(position);
      setIsOpen(false);
    }

    if (!selectPosition) {
      setSelectPosition(position);
      setSelectQuestion(position);
      setIsOpen(false);
    }
  };

  const saveDraft = () => {
    const locationState = location.state as LocationState;

    const answers = {
      ...values,
      portfolios: values.portfolios.map((portfolio, index) => ({
        fileUrl: portfolio.fileUrl,
        fileName: portfolio.fileName,
        fileSize: portfolio.fileSize,
        sequence: (index + 1).toString(),
      })),
    };

    saveDraftMutate({ param: selectPosition, answers });

    if (locationState && locationState.continue === false) {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  };

  useEffect(() => {
    const locationState = location.state as LocationState;

    if (locationState && locationState.continue === false) return;

    if (draft && draft.status === 'SUCCESS') {
      const { jobFamily, answers, portfolios } = draft.data;

      if (jobFamily) {
        setSelectPosition(jobFamily);
        setSelectQuestion(jobFamily);
      }

      if (answers) setValues(prev => ({ ...prev, answers }));

      if (portfolios) setValues(prev => ({ ...prev, portfolios }));
    }
  }, [draft, location.state]);

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
                value={selectPosition ? jobFamily[selectPosition] : ''}
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
                      { label: jobFamily.FE },
                      { label: jobFamily.BE },
                      { label: jobFamily.PM },
                      { label: jobFamily.PD },
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
                    return (
                      <TextField
                        key={data.id}
                        data={data}
                        onChange={handleChangeAnswer}
                        value={values.answers[data.id]}
                      />
                    );
                  case 'URL':
                    return (
                      <UrlField
                        key={data.id}
                        data={data}
                        onChange={handleChangeAnswer}
                        value={values.answers[data.id]}
                      />
                    );
                  case 'FILE':
                    return (
                      <FileField
                        key={data.id}
                        data={data}
                        onChange={handleChangePortfolios}
                        values={values.portfolios}
                      />
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
      <Dialog
        btnLayout='horizontal'
        title='다른 직군으로 변경하시겠어요?'
        primaryBtnLabel='변경하기'
        secondaryBtnLabel='변경하지 말기'
        isOpen={isDialogOpen}
        onPrimaryBtnClick={() => {
          setSelectQuestion(selectPosition);
          if (selectPosition) changeJob(selectPosition);
          setValues(initialValue);
          closeDialog();
        }}
        onSecondaryBtnClick={() => {
          setSelectPosition(selectQuestion);
          closeDialog();
        }}
      >
        작성된 답변 내용들은 모두초기화되고,
        <br />
        다시 되돌릴 수 없어요.
      </Dialog>
    </div>
  );
}

export default ApplyRegistration;
