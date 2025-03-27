import clsx from 'clsx';
import { useCallback, useRef, useState, useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

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
import { PATH } from '@/constants/path';
import useChangeJobQuery from '@/hooks/useChangeJobQuery';
import useCloseOutside from '@/hooks/useCloseOutside';
import useDialog from '@/hooks/useDialog';
import useDraftQuery from '@/hooks/useDraftQuery';
import useQuestionsQuery from '@/hooks/useQuestionsQuery';
import useSubmitAnswerQuery from '@/hooks/useSubmitAnswerQuery';
import { AnswersRequest, PortfolioResponse } from '@/types/apis/answer';
import { JobFamily } from '@/types/apis/question';
import { validateAnswersPayload } from '@/utils/validateAnswersPayload';

const POSITIONS: JobFamily[] = ['FE', 'BE', 'PM', 'PD'];

const jobFamily: Record<JobFamily, string> = {
  FE: '프론트엔드 개발자',
  BE: '백엔드 개발자',
  PM: '프로덕트 매니저',
  PD: '프로덕트 디자이너',
};

const initialAnswer = {
  answers: {},
  portfolios: [],
};

interface LocationState {
  continue: boolean;
}

const notLoadDraft = (location: Location) => {
  const locationState = location.state as LocationState;

  return locationState && locationState.continue === false;
};

function ApplyRegistration() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectRef = useRef<HTMLDivElement>(null);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<JobFamily | null>(null);
  const [questionPosition, setQuestionPosition] = useState<JobFamily | null>(null);
  const [answersPayload, setAnswersPayload] = useState<AnswersRequest>(initialAnswer);
  const { questions } = useQuestionsQuery(questionPosition);
  const { saveDraftMutate, draft } = useDraftQuery();
  const { changeJobMutate } = useChangeJobQuery();
  const { submitAnswerMutate } = useSubmitAnswerQuery();
  const { isOpen, setIsOpen } = useCloseOutside(selectRef);
  const {
    isOpen: isOpenChangePosition,
    openDialog: openDialogChangePosition,
    closeDialog: closeDialogChangePosition,
  } = useDialog();
  const {
    isOpen: isOpenSubmitAnswer,
    openDialog: openDialogSubmitAnswer,
    closeDialog: closeDialogSubmitAnswer,
  } = useDialog();

  const handleChangeAnswer = useCallback((id: number, text: string) => {
    setAnswersPayload(prev => ({ ...prev, answers: { ...prev.answers, [id]: text } }));
  }, []);

  const handleChangePortfolios = useCallback((files: PortfolioResponse[]) => {
    setAnswersPayload(prev => ({ ...prev, portfolios: files }));
  }, []);

  const handleSelect = (label: string | null) => {
    if (!label) return;

    const position = POSITIONS.find(key => jobFamily[key] === label);

    if (!position) return;

    if (!selectedPosition) {
      setSelectedPosition(position);
      setQuestionPosition(position);
      setIsOpen(false);
      return;
    }

    if (selectedPosition !== position) {
      openDialogChangePosition();
      setSelectedPosition(position);
      setIsOpen(false);
    }
  };

  const saveDraft = () => {
    saveDraftMutate({ param: selectedPosition, answers: answersPayload });

    if (notLoadDraft(location)) {
      window.history.replaceState(null, document.title, window.location.pathname);
    }
  };

  useEffect(() => {
    if (notLoadDraft(location)) return;
    if (!draft || draft.status !== 'SUCCESS') return;

    const { jobFamily, answers, portfolios } = draft.data;

    if (jobFamily) {
      setSelectedPosition(jobFamily);
      setQuestionPosition(jobFamily);
    }

    if (answers) setAnswersPayload(prev => ({ ...prev, answers }));

    if (portfolios) setAnswersPayload(prev => ({ ...prev, portfolios }));
  }, [draft, location]);

  useEffect(() => {
    if (!questions) return;

    const isCompleted = !!validateAnswersPayload(questions, answersPayload);

    setIsStepCompleted(isCompleted);
  }, [answersPayload, questions]);

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={3} />
      <section className='gap-9xl flex w-[32.5rem] flex-col items-stretch *:first:text-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.registration}</Title>
        <div className={clsx(!selectedPosition && '*:nth-2:text-center', 'gap-7xl flex flex-col')}>
          <div className='gap-2xl flex flex-col'>
            <Title hierarchy='normal'>어떤 포지션으로 지원하시나요?</Title>
            <div className='relative'>
              <InputField
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={({ key }) => key === 'Enter' && setIsOpen(!isOpen)}
                value={selectedPosition ? jobFamily[selectedPosition] : ''}
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
                    defaultValue={selectedPosition}
                    onChange={handleSelect}
                  />
                </div>
              )}
            </div>
          </div>

          {!selectedPosition && (
            <Label hierarchy='normal' weight='normal' textColor='text-object-assistive-dark'>
              포지션을 선택한 뒤 아래에 추가 질문들이 표시돼요.
            </Label>
          )}
          {selectedPosition && (
            <form action='' className='gap-7xl flex flex-col' encType='multipart/form-data'>
              {questions?.map(data => {
                switch (data.inputType) {
                  case 'TEXT':
                    return (
                      <TextField
                        key={data.id}
                        data={data}
                        onChange={handleChangeAnswer}
                        value={answersPayload.answers[data.id]}
                      />
                    );
                  case 'URL':
                    return (
                      <UrlField
                        key={data.id}
                        data={data}
                        onChange={handleChangeAnswer}
                        value={answersPayload.answers[data.id]}
                      />
                    );
                  case 'FILE':
                    return (
                      <FileField
                        key={data.id}
                        data={data}
                        onChange={handleChangePortfolios}
                        values={answersPayload.portfolios}
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
            <BlockButton
              size='lg'
              style='solid'
              hierarchy='accent'
              disabled={!isStepCompleted}
              onClick={openDialogSubmitAnswer}
            >
              지원서 제출하기
            </BlockButton>
          </div>
        </div>
      </section>
      <Dialog
        btnLayout='horizontal'
        title='지원서를 제출하시겠어요?'
        primaryBtnLabel='제출하기'
        secondaryBtnLabel='제출 보류하기'
        isOpen={isOpenSubmitAnswer}
        onPrimaryBtnClick={() => {
          submitAnswerMutate(
            { param: selectedPosition, answers: answersPayload },
            {
              onSuccess: data => {
                if (data?.status === 'SUCCESS') {
                  void navigate(PATH.applyComplete);
                }
              },
            },
          );
        }}
        onSecondaryBtnClick={closeDialogSubmitAnswer}
      >
        제출한 뒤에는 수정하거나 취소할 수 없어요.
      </Dialog>
      <Dialog
        btnLayout='horizontal'
        title='다른 직군으로 변경하시겠어요?'
        primaryBtnLabel='변경하기'
        secondaryBtnLabel='변경하지 말기'
        isOpen={isOpenChangePosition}
        onPrimaryBtnClick={() => {
          setQuestionPosition(selectedPosition);
          if (selectedPosition) changeJobMutate(selectedPosition);
          setAnswersPayload(initialAnswer);
          closeDialogChangePosition();
        }}
        onSecondaryBtnClick={() => {
          setSelectedPosition(questionPosition);
          closeDialogChangePosition();
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
