import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, AuthCodeForm } from "@/features/shared/components";
import type { ResetPinFunnelSteps } from "@/types/funnel";

interface EmailVerificationStepProps {
  context: ResetPinFunnelSteps["이메일인증"];
  onNext: (email: string, authCode: string) => void;
  onBack: () => void;
}

export function EmailVerificationStep({ context, onNext, onBack }: EmailVerificationStepProps) {
  return (
    <ApplyStepLayout
      variant='auth'
      title={APPLY_TITLE.resetPin}
      headerTitle='PIN 재설정'
      onBack={onBack}
    >
      <AuthCodeForm defaultEmail={context.email} sendGroupCode='PIN_RESET' onVerified={onNext} />
    </ApplyStepLayout>
  );
}
