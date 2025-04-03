import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import Answers from '@/components/apply/Answers';
import SelectBox from '@/components/apply/selectBox';
import BlockButton from '@/components/common/button/BlockButton';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import useApplicationDialog from '@/hooks/useApplicationDialog';
import useApplicationState from '@/hooks/useApplicationState';
import useChangeJobQuery from '@/hooks/useChangeJobQuery';
import useDraftQuery from '@/hooks/useDraftQuery';
import useSaveDraftQuery from '@/hooks/useSaveDraftQuery';
import useSubmitAnswerQuery from '@/hooks/useSubmitAnswerQuery';
import { JobFamily } from '@/types/apis/question';

interface LocationState {
  continue: boolean;
}

const isLoadDraft = (location: Location) => {
  return location.state ? (location.state as LocationState).continue : true;
};

const removeLocationState = (location: Location) => {
  if (isLoadDraft(location)) return;

  window.history.replaceState(null, document.title, window.location.pathname);
};

function ApplyRegistration() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isStepCompleted,
    selectedJob,
    questionJob,
    answersPayload,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetAnswers,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    setSubmitButtonActive,
  } = useApplicationState();
  const { handleDialogChangeJob, handleDialogSubmitAnswers } = useApplicationDialog();

  const { draft } = useDraftQuery();
  const { saveDraftMutate } = useSaveDraftQuery();
  const { changeJobMutate } = useChangeJobQuery();
  const { submitAnswerMutate } = useSubmitAnswerQuery();

  const saveDraft = useCallback(() => {
    if (!selectedJob) return;

    saveDraftMutate({ param: selectedJob, answers: answersPayload });
    removeLocationState(location);
  }, [saveDraftMutate, answersPayload, selectedJob, location]);

  const submitAnswer = () => {
    if (!selectedJob) return;

    const answer = { param: selectedJob, answers: answersPayload };

    submitAnswerMutate(answer, {
      onSuccess: data => {
        if (data?.status === 'SUCCESS') void navigate(PATH.applyComplete);
      },
    });
  };

  const openDialogChangeJob = async (job: JobFamily) => {
    changeSelect(job);

    const { isPrimaryClick } = await handleDialogChangeJob();

    if (isPrimaryClick) {
      changeJobMutate(job);
      resetAnswers(job);
      return;
    }

    revertSelect();
  };

  const openDialogSubmitAnswer = async () => {
    const { isPrimaryClick } = await handleDialogSubmitAnswers();

    if (isPrimaryClick) submitAnswer();
  };

  useEffect(() => {
    if (!isLoadDraft(location)) return;

    if (!draft || draft.status !== 'SUCCESS') return;

    updateAnswerByDraft(draft.data);
  }, [draft, location, updateAnswerByDraft]);

  useEffect(() => {
    const autosaveDraft = setInterval(saveDraft, 900000);

    return () => clearInterval(autosaveDraft);
  }, [saveDraft]);

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={3} />
      <section className='gap-9xl flex w-[32.5rem] flex-col items-stretch *:first:text-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.registration}</Title>
        <div className={clsx(!selectedJob && '*:nth-2:text-center', 'gap-7xl flex flex-col')}>
          <div className='gap-2xl flex flex-col'>
            <Title hierarchy='normal'>어떤 포지션으로 지원하시나요?</Title>
            <SelectBox
              selectedJob={selectedJob}
              onLoadQuestion={changeSelectAndQuestion}
              onOpenDialog={openDialogChangeJob}
            />
          </div>
          {selectedJob ? (
            <Answers
              questionJob={questionJob}
              answersPayload={answersPayload}
              onChangeAnswer={handleChangeAnswer}
              onChangePortfolios={handleChangePortfolios}
              onActiveSubmitButton={setSubmitButtonActive}
            />
          ) : (
            <Label hierarchy='normal' weight='normal' textColor='text-object-assistive-dark'>
              포지션을 선택한 뒤 아래에 추가 질문들이 표시돼요.
            </Label>
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
              onClick={() => void openDialogSubmitAnswer()}
            >
              지원서 제출하기
            </BlockButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApplyRegistration;
