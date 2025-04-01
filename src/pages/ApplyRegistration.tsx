import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

import Answers from '@/components/apply/Answers';
import SelectBox from '@/components/apply/selectBox';
import BlockButton from '@/components/common/button/BlockButton';
import Dialog from '@/components/common/dialog/Dialog';
import Label from '@/components/common/label/Label';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import useApplicationState from '@/hooks/useApplicationState';
import useChangeJobQuery from '@/hooks/useChangeJobQuery';
import useDialog from '@/hooks/useDialog';
import useDraftQuery from '@/hooks/useDraftQuery';
import useSaveDraftQuery from '@/hooks/useSaveDraftQuery';
import useSubmitAnswerQuery from '@/hooks/useSubmitAnswerQuery';
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

  const { draft: draftServer } = useDraftQuery();
  const { saveDraftMutate } = useSaveDraftQuery();
  const { changeJobMutate } = useChangeJobQuery();
  const { submitAnswerMutate } = useSubmitAnswerQuery();

  const {
    isOpen: isOpenChangeJob,
    openDialog: openDialogChangeJob,
    closeDialog: closeDialogChangeJob,
  } = useDialog();
  const {
    isOpen: isOpenSubmitAnswer,
    openDialog: openDialogSubmitAnswer,
    closeDialog: closeDialogSubmitAnswer,
  } = useDialog();

  const saveDraftServerAndLocal = useCallback(() => {
    if (!selectedJob) return;

    saveDraftMutate({ param: selectedJob, answers: answersPayload });
    setDraftLocal({ jobFamily: selectedJob, ...answersPayload });
    removeLocationState(location);
  }, [saveDraftMutate, answersPayload, selectedJob, location]);

  const changeJob = () => {
    if (!selectedJob) return;

    resetAnswers();
    changeJobMutate(selectedJob);
    closeDialogChangeJob();
    removeDraftLocal();
  };

  const notChangeJob = () => {
    revertSelect();
    closeDialogChangeJob();
  };

  const submitAnswer = () => {
    if (!selectedJob) return;

    const answer = { param: selectedJob, answers: answersPayload };

    submitAnswerMutate(answer, {
      onSuccess: data => {
        if (data?.status === 'SUCCESS') {
          void navigate(PATH.applyComplete);
          removeDraftLocal();
        }
      },
    });
  };

  // 임시 저장 불러오기
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

  // 로컬 스토리지 및 서버 임시저장
  useEffect(() => {
    const autosaveDraft = setInterval(saveDraftServerAndLocal, 900000);

    return () => clearInterval(autosaveDraft);
  }, [saveDraftServerAndLocal]);

  // 로컬 스토리지 임시 저장
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
              onOpenDialog={(job: JobFamily) => {
                openDialogChangeJob();
                changeSelect(job);
              }}
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
      <Dialog
        btnLayout='horizontal'
        title='지원서를 제출하시겠어요?'
        primaryBtnLabel='제출하기'
        secondaryBtnLabel='제출 보류하기'
        isOpen={isOpenSubmitAnswer}
        onPrimaryBtnClick={submitAnswer}
        onSecondaryBtnClick={closeDialogSubmitAnswer}
      >
        제출한 뒤에는 수정하거나 취소할 수 없어요.
      </Dialog>
      <Dialog
        btnLayout='horizontal'
        title='다른 직군으로 변경하시겠어요?'
        primaryBtnLabel='변경하기'
        secondaryBtnLabel='변경하지 말기'
        isOpen={isOpenChangeJob}
        onPrimaryBtnClick={changeJob}
        onSecondaryBtnClick={notChangeJob}
      >
        작성된 답변 내용들은 모두 초기화되고,
        <br />
        다시 되돌릴 수 없어요.
      </Dialog>
    </div>
  );
}

export default ApplyRegistration;
