import { BlockButton } from "@ject/jds";
import type { FormEventHandler } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout, PinInputField, VerifiedEmailDisplay } from "@/features/shared/components";
import { useResetPinMutation } from "@/hooks/apply";
import { useApplyPinForm } from "@/hooks/useApplyPinForm";
import type { ResetPinFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";
import { deriveInputValidation } from "@/utils/validationHelpers";

interface NewPinSetupStepProps {
  context: ResetPinFunnelSteps["새PIN설정"];
  onBack: () => void;
}

export function NewPinSetupStep({ context, onBack }: NewPinSetupStepProps) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: handleSubmitPin,
    setError: setPinError,
    formState,
  } = useApplyPinForm();

  const { mutateAsync: resetPinMutateAsync, isPending } = useResetPinMutation();

  const handleResetPinFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    void handleSubmitPin(async ({ pin }) => {
      try {
        await resetPinMutateAsync({ pin });

        const returnUrl = new URL(context.returnTo, window.location.origin);
        returnUrl.searchParams.set("email", context.email);
        returnUrl.searchParams.set("pinReset", "success");

        void navigate(returnUrl.pathname + returnUrl.search, { replace: true });
      } catch (error) {
        handleError(error, "PIN 재설정 실패");
        setPinError("pin", {
          type: "manual",
          message: "PIN 재설정 중 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    })(e);
  };

  return (
    <ApplyStepLayout
      variant='auth'
      title={APPLY_TITLE.resetPin}
      headerTitle='PIN 재설정'
      onBack={onBack}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <VerifiedEmailDisplay email={context.email} authCode={context.authCode} />
        <form id='newPinSetupForm' className='self-stretch' onSubmit={handleResetPinFormSubmit}>
          <Controller
            name='pin'
            control={control}
            render={({ field, fieldState }) => (
              <PinInputField
                label='새로운 PIN 설정'
                placeholder='새로운 6자리 비밀번호'
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
      </div>
      <BlockButton.Basic
        type='submit'
        form='newPinSetupForm'
        disabled={!formState.isValid}
        size='md'
        variant='solid'
        hierarchy='accent'
        suffixIcon={isPending ? "spinner" : undefined}
        className={`self-start ${isPending ? "[&_svg:last-child]:animate-spin" : ""}`}
      >
        PIN 재설정 완료하기
      </BlockButton.Basic>
    </ApplyStepLayout>
  );
}
