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

interface LocationState {
  continue: boolean;
}

const isLoadDraft = (location: Location) => {
  const locationState = location.state as LocationState;

  if (!locationState) return true;

  return locationState.continue === true;
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
    selectedPosition,
    questionPosition,
    answersPayload,
    handleChangeAnswer,
    handleChangePortfolios,
    updateAnswerByDraft,
    resetAnswers,
    revertSelect,
    changeSelectAndQuestion,
    changeSelect,
    activeSubmitButton,
  } = useApplicationState();
  const { draft } = useDraftQuery();
  const { saveDraftMutate } = useSaveDraftQuery();
  const { changeJobMutate } = useChangeJobQuery();
  const { submitAnswerMutate } = useSubmitAnswerQuery();
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

  const saveDraft = useCallback(() => {
    saveDraftMutate({ param: selectedPosition, answers: answersPayload });
    removeLocationState(location);
  }, [saveDraftMutate, answersPayload, selectedPosition, location]);

  const changePosition = () => {
    if (!selectedPosition) return;
    resetAnswers();
    changeJobMutate(selectedPosition);
    closeDialogChangePosition();
  };

  const notChangePosition = () => {
    revertSelect();
    closeDialogChangePosition();
  };

  const submitAnswer = () => {
    const answer = { param: selectedPosition, answers: answersPayload };

    submitAnswerMutate(answer, {
      onSuccess: data => {
        if (data?.status === 'SUCCESS') void navigate(PATH.applyComplete);
      },
    });
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
        <div className={clsx(!selectedPosition && '*:nth-2:text-center', 'gap-7xl flex flex-col')}>
          <div className='gap-2xl flex flex-col'>
            <Title hierarchy='normal'>어떤 포지션으로 지원하시나요?</Title>
            <SelectBox
              selectedPosition={selectedPosition}
              onLoadQuestion={changeSelectAndQuestion}
              onOpenDialog={(position: JobFamily) => {
                openDialogChangePosition();
                changeSelect(position);
              }}
            />
          </div>
          {selectedPosition ? (
            <Answers
              questionPosition={questionPosition}
              answersPayload={answersPayload}
              onChangeAnswer={handleChangeAnswer}
              onChangePortfolios={handleChangePortfolios}
              onActiveSubmitButton={activeSubmitButton}
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
        isOpen={isOpenChangePosition}
        onPrimaryBtnClick={changePosition}
        onSecondaryBtnClick={notChangePosition}
      >
        작성된 답변 내용들은 모두초기화되고,
        <br />
        다시 되돌릴 수 없어요.
      </Dialog>
    </div>
  );
}

export default ApplyRegistration;
