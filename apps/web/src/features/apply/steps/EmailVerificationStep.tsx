import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, AuthCodeForm } from "@/features/shared/components";
import type { ApplyFunnelSteps } from "@/types/funnel";

type TermsAgreement = {
  privacy: boolean;
  paymentPolicy: boolean;
};

interface EmailVerificationStepProps {
  context: ApplyFunnelSteps["이메일인증"];
  onNext: (email: string, termsAgreement?: TermsAgreement) => void;
  onExistingMember: (email: string) => void;
  onBack: () => void;
}

export function EmailVerificationStep({
  context,
  onNext,
  onExistingMember,
  onBack,
}: EmailVerificationStepProps) {
  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.verifyEmail}
      current={0}
      jobFamily={context.jobFamily}
      onBack={onBack}
    >
      <AuthCodeForm
        defaultEmail={context.email}
        template='AUTH_CODE'
        onVerified={onNext}
        onExistingMember={onExistingMember}
      />
    </ApplyStepLayout>
  );
}
