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
import useApplicationState from '@/hooks/useApplicationState';
import useChangeJobQuery from '@/hooks/useChangeJobQuery';
import useDraftQuery from '@/hooks/useDraftQuery';
import { useRedirectIfSubmitted } from '@/hooks/useRedirectIfSubmitted';
import useSaveDraftQuery from '@/hooks/useSaveDraftQuery';
import useSubmitAnswerQuery from '@/hooks/useSubmitAnswerQuery';
import { useDialogActions } from '@/stores/dialogStore';
import { JobFamily } from '@/types/apis/question';
import { getDraftLocal, removeDraftLocal, setDraftLocal } from '@/utils/draftUtils';

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
  const { openDialog } = useDialogActions();

  const { draft: draftServer } = useDraftQuery();
  const { saveDraftMutate } = useSaveDraftQuery();
  const { changeJobMutate } = useChangeJobQuery();
  const { submitAnswerMutate } = useSubmitAnswerQuery();

  useRedirectIfSubmitted();

  const saveDraftServerAndLocal = useCallback(() => {
    if (!selectedJob) return;

    saveDraftMutate({ param: selectedJob, answers: answersPayload });
    setDraftLocal({ jobFamily: selectedJob, ...answersPayload });
    removeLocationState(location);
  }, [saveDraftMutate, answersPayload, selectedJob, location]);

  const submitAnswer = () => {
    if (!selectedJob) return;

    const answer = { param: selectedJob, answers: answersPayload };

    submitAnswerMutate(answer, {
      onSuccess: data => {
        if (data?.status === 'SUCCESS') {
          void navigate(PATH.applyComplete, { replace: true });
          localStorage.setItem('applicationSubmit', 'success');
          removeDraftLocal();
        }
      },
    });
  };

  const openDialogChangeJob = (job: JobFamily) => {
    changeSelect(job);

    openDialog({
      type: 'changeJob',
      onPrimaryBtnClick: () => {
        changeJobMutate(job);
        resetAnswers(job);
        removeDraftLocal();
      },
      onSecondaryBtnClick: revertSelect,
    });
  };

  const openDialogSubmitAnswer = () => {
    openDialog({
      type: 'submitAnswer',
      onPrimaryBtnClick: submitAnswer,
    });
  };

  useEffect(() => {
    if (!isLoadDraft(location)) return;

    const draftLocal = getDraftLocal();

    if (draftLocal) {
      return updateAnswerByDraft(draftLocal);
    }

    if (draftServer && draftServer.status === 'SUCCESS') {
      return updateAnswerByDraft(draftServer.data);
    }
  }, [location, updateAnswerByDraft, draftServer]);

  useEffect(() => {
    const autosaveDraft = setInterval(saveDraftServerAndLocal, 900000);

    return () => clearInterval(autosaveDraft);
  }, [saveDraftServerAndLocal]);

  useEffect(() => {
    if (!selectedJob) return;

    const saveDraftLocal = () => setDraftLocal({ jobFamily: selectedJob, ...answersPayload });
    const autoSaveDraftLocal = setInterval(saveDraftLocal, 60000);

    return () => clearInterval(autoSaveDraftLocal);
  }, [selectedJob, answersPayload]);

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
            <BlockButton
              size='lg'
              style='solid'
              hierarchy='secondary'
              onClick={saveDraftServerAndLocal}
            >
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
    </div>
  );
}

export default ApplyRegistration;
