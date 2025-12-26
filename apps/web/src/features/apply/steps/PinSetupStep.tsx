import { BlockButton } from "@ject/jds";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { APPLY_TITLE } from "@/constants/applyPageData";
import {
  ApplyStepLayout,
  PinInputField,
  TermsCheckboxGroup,
  VerifiedEmailDisplay,
  type TermsAgreement,
} from "@/features/shared/components";
import { useRegisterMemberMutation } from "@/hooks/apply";
import { useApplyPinForm } from "@/hooks/useApplyPinForm";
import type { ApplyFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";
import { deriveInputValidation } from "@/utils/validationHelpers";

interface PinSetupStepProps {
  context: ApplyFunnelSteps["PIN설정"];
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_TERMS_AGREEMENT: TermsAgreement = {
  privacy: false,
  paymentPolicy: false,
};

export function PinSetupStep({ context, onNext, onBack }: PinSetupStepProps) {
  const [termsAgreement, setTermsAgreement] = useState<TermsAgreement>(
    context.termsAgreement ?? DEFAULT_TERMS_AGREEMENT,
  );

  const { control, handleSubmit: handleSubmitPin, formState } = useApplyPinForm();

  const { mutateAsync: registerMemberMutateAsync } = useRegisterMemberMutation();

  const isAllTermsChecked = termsAgreement.privacy && termsAgreement.paymentPolicy;
  const isSubmitButtonDisabled = !formState.isValid || !isAllTermsChecked;

  const handleRegisterFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    void handleSubmitPin(async ({ pin }) => {
      try {
        await registerMemberMutateAsync({ pin });
        onNext();
      } catch (error) {
        handleError(error, "회원 등록 실패");
      }
    })(e);
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
        <VerifiedEmailDisplay email={context.email} authCode={context.authCode} />
        <form
          id='pinSetupForm'
          className='gap-7xl flex flex-col'
          onSubmit={handleRegisterFormSubmit}
        >
          <Controller
            name='pin'
            control={control}
            render={({ field, fieldState }) => (
              <PinInputField
                label='PIN'
                placeholder='본인 확인용 6자리 비밀번호를 설정해주세요'
                value={field.value ?? ""}
                onChange={field.onChange}
                validation={deriveInputValidation({
                  hasError: Boolean(fieldState.error),
                  hasValue: Boolean(field.value?.length),
                })}
                helperText={fieldState.error?.message ?? ""}
              />
            )}
          />
        </form>

        <TermsCheckboxGroup value={termsAgreement} onChange={setTermsAgreement} />

        <BlockButton.Basic
          type='submit'
          form='pinSetupForm'
          disabled={isSubmitButtonDisabled}
          size='md'
          variant='solid'
          hierarchy='accent'
          suffixIcon='arrow-right-line'
        >
          다음 단계로 진행하기
        </BlockButton.Basic>
      </div>
    </ApplyStepLayout>
  );
}
