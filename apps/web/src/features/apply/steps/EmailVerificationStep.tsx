import { BlockButton, Dialog } from "@ject/jds";
import { useState } from "react";

import { APPLY_DIALOG } from "@/constants/applyMessages.tsx";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, AuthCodeForm } from "@/features/shared/components";
import type { ApplyFunnelSteps } from "@/types/funnel";

export type EmailVerificationEvents = {
  onVerified: { email: string; authCode: string };
  goToContinueWriting: undefined;
  goBack: undefined;
};

interface EmailVerificationStepProps {
  context: ApplyFunnelSteps["이메일인증"];
  dispatch: (
    ...args:
      | [type: "onVerified", payload: { email: string; authCode: string }]
      | [type: "goToContinueWriting", payload?: undefined]
      | [type: "goBack", payload?: undefined]
  ) => void;
}

export function EmailVerificationStep({
  context,
  dispatch,
}: EmailVerificationStepProps) {
  const [isExistingMemberDialogOpen, setIsExistingMemberDialogOpen] = useState(false);

  const handleBack = () => dispatch("goBack");

  const handleVerified = (email: string, authCode: string) => {
    dispatch("onVerified", { email, authCode });
  };

  const handleExistingMember = () => {
    setIsExistingMemberDialogOpen(true);
  };

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.verifyEmail}
      current={0}
      jobFamily={context.jobFamily}
      onBack={handleBack}
    >
      <AuthCodeForm
        defaultEmail={context.email}
        sendGroupCode='AUTH_CODE'
        onVerified={handleVerified}
        onExistingMember={handleExistingMember}
      />
      <BlockButton.Basic
        className='self-start'
        size='md'
        variant='solid'
        hierarchy='accent'
        suffixIcon='arrow-right-line'
        disabled
      >
        다음 단계로 진행하기
      </BlockButton.Basic>

      <Dialog
        open={isExistingMemberDialogOpen}
        onOpenChange={open => !open && setIsExistingMemberDialogOpen(false)}
        header={APPLY_DIALOG.tempSaved.header}
        body={APPLY_DIALOG.tempSaved.body}
        primaryAction={{
          children: APPLY_DIALOG.tempSaved.primaryAction,
          onClick: () => dispatch("goToContinueWriting"),
        }}
        secondaryAction={{
          children: APPLY_DIALOG.tempSaved.secondaryAction,
          onClick: () => setIsExistingMemberDialogOpen(false),
        }}
      />
    </ApplyStepLayout>
  );
}
