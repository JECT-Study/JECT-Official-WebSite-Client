import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthFlow } from '@/components/auth';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import { useResetPinMutation } from '@/hooks/useResetPinMutation';
import { useToastActions } from '@/stores/toastStore';
import { handleError } from '@/utils/errorLogger';

const ResetPinPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToastActions();
  const { mutate: resetPinMutate, isPending: isResettingPin } = useResetPinMutation();

  const handlePinSubmit = useCallback(
    (pin: string) => {
      resetPinMutate(
        { pin },
        {
          onSuccess: response => {
            if (response.status === 'SUCCESS') {
              addToast('PIN을 다시 설정했어요', 'positive');
              void navigate(PATH.signup, { replace: true });
            }
          },
          onError: error => {
            handleError(error, 'PIN 재설정 실패');
          },
        },
      );
    },
    [resetPinMutate, addToast, navigate],
  );

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-12xl) pb-(--gap-12xl)'>
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.resetPin}</Title>

        <AuthFlow
          templateType='PIN_RESET'
          isResetPin={true}
          onPinSubmit={handlePinSubmit}
          isSubmitting={isResettingPin}
          isRedirectExisting={false}
        >
          <div className='gap-7xl flex flex-col'>
            <div className='gap-xs flex flex-col'>
              <AuthFlow.Email />
              <AuthFlow.Verification />
              <AuthFlow.Pin />
            </div>

            <AuthFlow.SubmitButton />
            <AuthFlow.HelpLink />
          </div>
        </AuthFlow>
      </section>
    </div>
  );
};

export default ResetPinPage;
