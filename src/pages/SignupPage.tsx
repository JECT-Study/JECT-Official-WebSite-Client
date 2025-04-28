import { useNavigate } from 'react-router-dom';

import { AuthFlow } from '@/components/auth';
import ProgressIndicator from '@/components/common/progress/ProgressIndicator';
import Title from '@/components/common/title/Title';
import { APPLY_TITLE } from '@/constants/applyPageData';
import { PATH } from '@/constants/path';
import { useRegisterMemberMutation } from '@/hooks/useRegisterMemberMutation';
import { handleError } from '@/utils/errorLogger';

const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate: registerMemberMutate, isPending: isRegisteringMember } =
    useRegisterMemberMutation();

  const handlePinSubmit = (pin: string) => {
    registerMemberMutate(
      { pin },
      {
        onSuccess: response => {
          if (response.status === 'SUCCESS') {
            void navigate(PATH.applicantInfo);
          }
        },
        onError: error => {
          handleError(error, '회원 등록 실패');
        },
      },
    );
  };

  return (
    <div className='gap-9xl flex flex-col items-center pt-(--gap-9xl) pb-(--gap-12xl)'>
      <ProgressIndicator totalStep={3} currentStep={1} />
      <section className='gap-9xl flex w-[26.25rem] flex-col items-stretch *:first:self-center'>
        <Title hierarchy='strong'>{APPLY_TITLE.verifyEmail}</Title>

        <AuthFlow
          templateType='AUTH_CODE'
          isResetPin={false}
          onPinSubmit={handlePinSubmit}
          isSubmitting={isRegisteringMember}
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

export default SignupPage;
