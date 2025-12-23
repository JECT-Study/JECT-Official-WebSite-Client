import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, EmailInputForm } from "@/features/shared/components";
import { useCheckEmailExistsMutation, useSendAuthCodeMutation } from "@/hooks/apply";
import type { ApplyFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";

interface EmailVerificationStepProps {
  context: ApplyFunnelSteps["이메일인증"];
  onNext: (data: { email: string }) => void;
  onExistingMember: (data: { email: string }) => void;
  onBack: () => void;
}

export function EmailVerificationStep({
  context,
  onNext,
  onExistingMember,
  onBack,
}: EmailVerificationStepProps) {
  const { mutateAsync: checkEmailMutateAsync } = useCheckEmailExistsMutation();
  const { mutateAsync: sendCodeMutateAsync } = useSendAuthCodeMutation();

  const handleSubmit = async (email: string) => {
    try {
      const isUserExists = await checkEmailMutateAsync(email);

      if (isUserExists) {
        onExistingMember({ email });
        return;
      }

      await sendCodeMutateAsync({ email, template: "AUTH_CODE" });
      onNext({ email });
    } catch (error) {
      handleError(error, "이메일 인증 처리 실패");
    }
  };

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.verifyEmail}
      current={0}
      jobFamily={context.jobFamily}
      onBack={onBack}
    >
      <div className='gap-7xl flex flex-col'>
        <EmailInputForm
          defaultEmail={context.email}
          placeholder='enjoyject@google.com'
          onSubmit={handleSubmit}
        />
      </div>
    </ApplyStepLayout>
  );
}
