import { BlockButton, LabelButton, TextField, toastController } from "@ject/jds";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { APPLY_TITLE } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";
import { ApplyStepLayout, PinInputField } from "@/features/shared/components";
import { usePinLoginMutation } from "@/hooks/apply";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";
import { useApplyPinForm } from "@/hooks/useApplyPinForm";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";
import { deriveInputValidation } from "@/utils/validationHelpers";

interface IdentityVerificationStepProps {
  context: ContinueWritingFunnelSteps["본인확인"];
  onNext: (data: { email: string }) => void | Promise<void>;
  onBack: () => void;
}

export function IdentityVerificationStep({
  context,
  onNext,
  onBack,
}: IdentityVerificationStepProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //PIN 재설정 후 돌아왔을 때 파라미터
  const isPinResetSuccess = searchParams.get("pinReset") === "success";
  const prefillEmail = searchParams.get("email");

  const {
    control: emailControl,
    watch: watchEmail,
    setValue: setEmailValue,
    formState: emailFormState,
  } = useApplyEmailForm();

  const {
    control: pinControl,
    handleSubmit: handleSubmitPin,
    setError: setPinError,
    formState: pinFormState,
  } = useApplyPinForm();

  useEffect(() => {
    if (!isPinResetSuccess) return;

    // 1. 이메일 prefill
    if (prefillEmail) {
      setEmailValue("email", prefillEmail, { shouldValidate: true });
    }

    // 2. 토스트 표시
    toastController.basic("PIN 재설정 완료", "새로운 PIN을 입력해 본인 확인을 다시 진행해주세요.");

    // 3. URL 파라미터 정리
    const cleanedParams = new URLSearchParams(searchParams);
    cleanedParams.delete("pinReset");
    cleanedParams.delete("email");
    setSearchParams(cleanedParams, { replace: true });
  }, [isPinResetSuccess, prefillEmail, setEmailValue, searchParams, setSearchParams]);

  const email = watchEmail("email");
  const isFormValid = emailFormState.isValid && pinFormState.isValid;

  const { mutate: pinLoginMutate, isPending } = usePinLoginMutation({
    onSuccess: () => {
      void onNext({ email });
    },
    onError: error => {
      handleError(error, "PIN 로그인 실패");
      setPinError("pin", {
        type: "manual",
        message: "이메일 또는 PIN이 올바르지 않습니다.",
      });
    },
  });

  const onSubmit = (pinData: { pin: string }) => {
    pinLoginMutate({ email, pin: pinData.pin });
  };

  const handleForgotPin = () => {
    const returnTo = `${location.pathname}${location.search}`;
    void navigate(`${PATH.resetPin}?returnTo=${encodeURIComponent(returnTo)}`);
  };

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.continueWriting}
      current={0}
      jobFamily={context.jobFamily}
      onBack={onBack}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <form
          className='flex flex-col gap-(--semantic-spacing-24) self-stretch'
          onSubmit={e => void handleSubmitPin(onSubmit)(e)}
        >
          <Controller
            name='email'
            control={emailControl}
            defaultValue={context.email || ""}
            render={({ field, fieldState }) => (
              <TextField
                type='email'
                label='이메일'
                validation={deriveInputValidation({
                  hasError: Boolean(fieldState.error),
                  hasValue: Boolean(field.value?.length),
                })}
                helperText={fieldState.error?.message ?? ""}
                placeholder='itclubject@ject.kr'
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name='pin'
            control={pinControl}
            render={({ field, fieldState }) => (
              <PinInputField
                label='PIN'
                placeholder='설정했던 PIN을 입력해주세요'
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
        <LabelButton.Basic size='sm' hierarchy='tertiary' onClick={handleForgotPin}>
          PIN 번호를 잊어버리셨나요?
        </LabelButton.Basic>
      </div>
      <BlockButton.Basic
        type='submit'
        disabled={!isFormValid || isPending}
        size='md'
        variant='solid'
        hierarchy='accent'
        suffixIcon={isPending ? "spinner" : undefined}
        className={`self-start ${isPending ? "[&_svg:last-child]:animate-spin" : ""}`}
      >
        다음
      </BlockButton.Basic>
    </ApplyStepLayout>
  );
}
