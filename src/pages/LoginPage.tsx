import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthFlow } from '@/components/auth';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import useCheckApplicationStatus from '@/hooks/useCheckApplicationStatus';
import useDeleteDraftMutation from '@/hooks/useDeleteDraftMutation';
import useDraftQuery from '@/hooks/useDraftQuery';
import { useMemberProfileInitialStatusQuery } from '@/hooks/useMemberProfileInitialStatusQuery';
import { usePinLoginMutation } from '@/hooks/usePinLoginMutation';
import { useDialogActions } from '@/stores/dialogStore';
import { LocationState } from '@/types/router';
import { hasDraftLocal } from '@/utils/draftUtils';
import { handleError } from '@/utils/errorLogger';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openDialog } = useDialogActions();

  const state = location.state as LocationState | null;
  const email = state?.email || '';

  const { mutate: pinLoginMutate, isPending: isPinLoginLoading } = usePinLoginMutation();
  const { mutate: deleteDraftMutate } = useDeleteDraftMutation();
  const { refetch: refetchDraftServer } = useDraftQuery(false);
  const { refetch: refetchCheckApplicationStatus } = useCheckApplicationStatus(false);
  const { refetch: refetchCheckProfileStatus } = useMemberProfileInitialStatusQuery();

  useEffect(() => {
    if (!email) {
      void navigate(PATH.signup);
    }
  }, [email, navigate]);

  const handlePinLogin = (pin: string) => {
    pinLoginMutate(
      { email, pin },
      {
        onSuccess: response => {
          if (response.status !== 'SUCCESS') {
            return;
          }
          //TODO: Promise 체인 개선 필요
          void refetchCheckProfileStatus()
            .then(({ data }) => {
              if (data?.status !== 'SUCCESS') return;
              return data.data
                ? refetchCheckApplicationStatus()
                : void navigate(PATH.applicantInfo);
            })
            .then(result => {
              if (!result) return;
              const { data } = result;
              if (data?.status !== 'SUCCESS') return;
              return data.data ? void navigate(PATH.applyComplete) : refetchDraftServer();
            })
            .then(result => {
              if (!result) return;
              const { data } = result;
              if (!hasDraftLocal() && data?.status === 'TEMP_APPLICATION_NOT_FOUND') {
                return void navigate(PATH.applyRegistration);
              }
              if (hasDraftLocal() || data?.status === 'SUCCESS') {
                openDialog({
                  type: 'continueWriting',
                  onPrimaryBtnClick: () =>
                    void navigate(PATH.applyRegistration, { state: { continue: true } }),
                  onSecondaryBtnClick: () =>
                    deleteDraftMutate(null, {
                      onSuccess: () =>
                        void navigate(PATH.applyRegistration, { state: { continue: false } }),
                    }),
                });
              }
            })
            .catch(error => {
              handleError(error, '프로필 여부, 제출 여부, 임시저장 여부 확인 중 오류 발생');
            });
        },
        onError: error => {
          handleError(error, 'PIN 로그인 실패');
        },
      },
    );
  };

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.verifyPIN}</Title>

        <AuthFlow
          templateType='AUTH_CODE'
          isResetPin={false}
          onPinSubmit={() => {}}
          onPinLogin={handlePinLogin}
          isSubmitting={isPinLoginLoading}
          isRedirectExisting={false}
          email={email}
        >
          <div className='gap-7xl flex flex-col'>
            <AuthFlow.PinLogin />
            <div className='gap-3xs flex self-center'>
              <AuthFlow.ResetPinLink />
            </div>
            <AuthFlow.SubmitButton />
          </div>
        </AuthFlow>
      </section>
    </div>
  );
};

export default LoginPage;
