import { useDialogActions } from '@/stores/dialogStore';

const useApplicationDialog = () => {
  const { openDialog } = useDialogActions();

  const handleDialogChangeJob = () => {
    return openDialog({
      title: '다른 직군으로 변경하시겠어요?',
      content: (
        <>
          작성된 답변 내용들은 모두 초기화되고,
          <br />
          다시 되돌릴 수 없어요.
        </>
      ),
      btnLayout: 'horizontal',
      primaryBtnLabel: '변경하기',
      secondaryBtnLabel: '변경하지 말기',
    });
  };

  const handleDialogSubmitAnswers = async () => {
    return openDialog({
      title: '지원서를 제출하시겠어요?',
      content: '제출한 뒤에는 수정하거나 취소할 수 없어요.',
      btnLayout: 'horizontal',
      primaryBtnLabel: '제출하기',
      secondaryBtnLabel: '제출 보류하기',
    });
  };

  return { handleDialogChangeJob, handleDialogSubmitAnswers };
};

export default useApplicationDialog;
