import { BlockButton, Dialog, LabelButton, TextField, toastController } from "@ject/jds";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { APPLY_DIALOG, APPLY_MESSAGE } from "@/constants/applyMessages.tsx";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";
import { ApplyStepLayout } from "@/features/shared/components";
import { useCheckApplyStatusMutation, usePinLoginMutation } from "@/hooks/apply";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";
import { useApplyPinForm } from "@/hooks/useApplyPinForm";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";
import { deriveInputValidation } from "@/utils/validationHelpers";

export type IdentityVerificationEvents = {
  /** 프로필 미작성 → STEP2 (지원자정보) */
  goToProfile: string;
  /** TEMP_SAVED 또는 JOINED → STEP3 (지원서작성) */
  goToApply: string;
  /** 뒤로가기 */
  goBack: undefined;
};

interface IdentityVerificationStepProps {
  context: ContinueWritingFunnelSteps["본인확인"];
  dispatch: (
    ...args:
      | [type: "goToProfile", payload?: string]
      | [type: "goToApply", payload?: string]
      | [type: "goBack", payload?: undefined]
  ) => void;
}

export function IdentityVerificationStep({
  context,
  dispatch,
}: IdentityVerificationStepProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);

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
    setSearchParams(prev => {
      prev.delete("pinReset");
      prev.delete("email");
      return prev;
    }, { replace: true });
  }, [isPinResetSuccess, prefillEmail, setEmailValue, setSearchParams]);

  const email = watchEmail("email");
  const isFormValid = emailFormState.isValid && pinFormState.isValid;

  const { mutate: checkApplyStatusMutate, isPending: isCheckingStatus } = useCheckApplyStatusMutation();

  const handleCheckApplyStatus = (userEmail: string) => {
    checkApplyStatusMutate(userEmail, {
      onSuccess: data => {
        if (data.result === "PROFILE_NOT_REGISTERED") {
          dispatch("goToProfile", userEmail);
          return;
        }

        if (data.result === "SUBMITTED") {
          setIsSubmittedDialogOpen(true);
          return;
        }

        // CONTINUE (TEMP_SAVED 또는 JOINED)
        toastController.positive(APPLY_MESSAGE.success.continueWriting);
        dispatch("goToApply", userEmail);
      },
      onError: error => {
        handleError(error, "지원 상태 확인 실패");
        toastController.destructive("지원 상태 확인에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const { mutate: pinLoginMutate, isPending: isPinLoginPending } = usePinLoginMutation({
    onSuccess: () => {
      handleCheckApplyStatus(email);
    },
    onError: error => {
      handleError(error, "PIN 로그인 실패");
      setPinError("pin", {
        type: "manual",
        message: "이메일 또는 PIN이 올바르지 않습니다.",
      });
    },
  });

  const isPending = isPinLoginPending || isCheckingStatus;

  const onSubmit = (pinData: { pin: string }) => {
    pinLoginMutate({ email, pin: pinData.pin });
  };

  const handleForgotPin = () => {
    const returnTo = `${location.pathname}${location.search}`;
    void navigate(`${PATH.resetPin}?returnTo=${encodeURIComponent(returnTo)}`);
  };

  return (
    <ApplyStepLayout
      variant='auth'
      headerTitle='이어서 작성하기'
      title={APPLY_TITLE.identityVerification}
      onBack={() => dispatch("goBack")}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <form
          id='identityVerificationForm'
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
              <TextField
                type='password'
                inputMode='numeric'
                maxLength={6}
                autoComplete='off'
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
        form='identityVerificationForm'
        disabled={!isFormValid || isPending}
        size='md'
        variant='solid'
        hierarchy='accent'
        suffixIcon={isPending ? "spinner" : undefined}
        className={`self-start ${isPending ? "[&_svg:last-child]:animate-spin" : ""}`}
      >
        다음
      </BlockButton.Basic>

      <Dialog
        open={isSubmittedDialogOpen}
        onOpenChange={open => !open && setIsSubmittedDialogOpen(false)}
        header={APPLY_DIALOG.submitted.header}
        body={APPLY_DIALOG.submitted.body}
        primaryAction={{
          children: APPLY_DIALOG.submitted.primaryAction,
          onClick: () => setIsSubmittedDialogOpen(false),
        }}
      />
    </ApplyStepLayout>
  );
}
