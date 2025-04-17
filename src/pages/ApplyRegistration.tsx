import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useCallback, useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import Answers from '@/components/apply/Answers';
import SelectBox from '@/components/apply/selectBox';
import BlockButton from '@/components/common/button/BlockButton';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import useApplicationState from '@/hooks/useApplicationState';
import useDeleteDraftMutation from '@/hooks/useDeleteDraftMutation';
import useDraftQuery from '@/hooks/useDraftQuery';
import useGoBackCheckDialog from '@/hooks/useGoBackCheckDialog';
import useSaveDraftMutation from '@/hooks/useSaveDraftMutation';
import useSubmitAnswerMutation from '@/hooks/useSubmitAnswerMutation';
import { useDialogActions } from '@/stores/dialogStore';
import { JobFamily } from '@/types/apis/application';
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
    application,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetApplication,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    setSubmitButtonActive,
  } = useApplicationState();
  const { openDialog } = useDialogActions();

  const { refetch: refetchDraftServer } = useDraftQuery(false);
  const { mutate: saveDraftMutate, isPending: isSaveDraftPending } = useSaveDraftMutation();
  const { mutate: deleteDraftMutate } = useDeleteDraftMutation(); // TODO: 삭제 isPending 추가 여부 및 방식 논의 필요
  const { mutate: submitAnswerMutate, isPending: isSubmitAnswerPending } =
    useSubmitAnswerMutation();

  useGoBackCheckDialog();

  const saveDraftServerAndLocal = useCallback(() => {
    if (!selectedJob) return;

    saveDraftMutate({ jobFamily: selectedJob, answers: application });
    setDraftLocal({ jobFamily: selectedJob, ...application });
    removeLocationState(location);
  }, [saveDraftMutate, application, selectedJob, location]);

  const submitAnswer = () => {
    if (!selectedJob) return;

    const answer = { jobFamily: selectedJob, answers: application };

    submitAnswerMutate(answer, {
      onSuccess: data => {
        if (data?.status === 'SUCCESS') {
          removeDraftLocal();
          void navigate(PATH.applyComplete, { replace: true });
        }
      },
    });
  };

  const openDialogChangeJob = (job: JobFamily) => {
    openDialog({
      type: 'changeJob',
      onPrimaryBtnClick: () => {
        deleteDraftMutate(null, {
          onSuccess: data => {
            if (data.status === 'SUCCESS') {
              changeSelect(job);
              resetApplication(job);
            }
          },
        });
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

    void refetchDraftServer().then(({ data }) => {
      if (data?.status === 'SUCCESS') {
        return updateAnswerByDraft(data.data);
      }
    });
  }, [location, updateAnswerByDraft, refetchDraftServer]);

  useEffect(() => {
    const autosaveDraft = setInterval(saveDraftServerAndLocal, 900000);

    return () => clearInterval(autosaveDraft);
  }, [saveDraftServerAndLocal]);

  useEffect(() => {
    if (!selectedJob) return;

    const saveDraftLocal = () => setDraftLocal({ jobFamily: selectedJob, ...application });
    const autoSaveDraftLocal = setInterval(saveDraftLocal, 60000);

    return () => clearInterval(autoSaveDraftLocal);
  }, [selectedJob, application]);

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
              application={application}
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
              {isSaveDraftPending ? <Lottie animationData={loadingSpinner} /> : '임시 저장하기'}
            </BlockButton>
            <BlockButton
              size='lg'
              style='solid'
              hierarchy='accent'
              disabled={!isStepCompleted}
              onClick={openDialogSubmitAnswer}
            >
              {isSubmitAnswerPending ? (
                <Lottie animationData={loadingSpinner} />
              ) : (
                '지원서 제출하기'
              )}
            </BlockButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApplyRegistration;
