import { BlockButton, Dialog, LabelButton, TextField, toastController } from "@jects/jds";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { applyApi } from "@/apis/apply";
import { APPLY_DIALOG, APPLY_MESSAGE } from "@/constants/applyMessages.tsx";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";
import { ApplyStepLayout } from "@/features/shared/components";
import { useCheckApplyStatusMutation, usePinLoginMutation } from "@/hooks/apply";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";
import { useApplyPinForm } from "@/hooks/useApplyPinForm";
import type { ApiResponse } from "@/types/apis/response";
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

export function IdentityVerificationStep({ context, dispatch }: IdentityVerificationStepProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);
  const [isApplyInProgressDialogOpen, setIsApplyInProgressDialogOpen] = useState(false);

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
    toastController.basic(
      APPLY_MESSAGE.success.pinResetComplete.title,
      APPLY_MESSAGE.success.pinResetComplete.body,
    );

    // 3. URL 파라미터 정리
    setSearchParams(
      prev => {
        prev.delete("pinReset");
        prev.delete("email");
        return prev;
      },
      { replace: true },
    );
  }, [isPinResetSuccess, prefillEmail, setEmailValue, setSearchParams]);

  const email = watchEmail("email");
  const isFormValid = emailFormState.isValid && pinFormState.isValid;

  const { mutate: checkApplyStatusMutate, isPending: isCheckingStatus } =
    useCheckApplyStatusMutation();

  const handleCheckApplyStatus = (userEmail: string) => {
    checkApplyStatusMutate(context.recruitId, {
      onSuccess: data => {
        if (data.result === "PROFILE_NOT_REGISTERED") {
          dispatch("goToProfile", userEmail);
          return;
        }

        if (data.result === "SUBMITTED") {
          setIsSubmittedDialogOpen(true);
          return;
        }

        // CONTINUE (TEMP_SAVED 또는 JOINED) → draft 확인
        void applyApi
          .getDraft(context.recruitId)
          .then(() => {
            toastController.positive(
              APPLY_MESSAGE.success.continueWriting.title,
              APPLY_MESSAGE.success.continueWriting.body,
            );
            dispatch("goToApply", userEmail);
          })
          .catch((error: unknown) => {
            // 임시저장한 지원서가 없는 경우 새 폼으로 시작
            if (
              isAxiosError<ApiResponse<unknown>>(error) &&
              error.response?.data.status === "APPLY-3"
            ) {
              dispatch("goToApply", userEmail);
              return;
            }

            // 그 밖의 조회 실패 시에도 안내 후 새 폼으로 시작
            handleError(error, "임시저장 데이터 조회 실패");
            toastController.destructive(
              APPLY_MESSAGE.fail.loadDraft.title,
              APPLY_MESSAGE.fail.loadDraft.body,
            );
            dispatch("goToApply", userEmail);
          });
      },
      onError: error => {
        handleError(error, "지원 상태 확인 실패");
        toastController.destructive(
          APPLY_MESSAGE.fail.checkApplyStatus.title,
          APPLY_MESSAGE.fail.checkApplyStatus.body,
        );
      },
    });
  };

  const { mutate: pinLoginMutate, isPending: isPinLoginPending } = usePinLoginMutation({
    onSuccess: () => {
      handleCheckApplyStatus(email);
    },
    onError: error => {
      // 다른 공고에 작성 중인 지원서가 있는 경우
      if (isAxiosError<ApiResponse<unknown>>(error) && error.response?.data.status === "APPLY-12") {
        setIsApplyInProgressDialogOpen(true);
        return;
      }

      handleError(error, "PIN 로그인 실패");
      setPinError("pin", {
        type: "apiError",
        message: "이메일 혹은 PIN이 올바르지 않습니다. 다시 확인 후 입력해주세요.",
      });
    },
  });

  const isPending = isPinLoginPending || isCheckingStatus;

  const onSubmit = (pinData: { pin: string }) => {
    pinLoginMutate({ email, pin: pinData.pin, recruitId: context.recruitId });
  };

  const handleForgotPin = () => {
    const returnTo = `${location.pathname}${location.search}`;
    const params = new URLSearchParams({
      returnTo,
      recruitId: String(context.recruitId),
    });
    void navigate(`${PATH.resetPin}?${params.toString()}`);
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

      <Dialog
        open={isApplyInProgressDialogOpen}
        onOpenChange={open => !open && setIsApplyInProgressDialogOpen(false)}
        header={APPLY_DIALOG.applyInProgress.header}
        body={APPLY_DIALOG.applyInProgress.body}
        primaryAction={{
          children: APPLY_DIALOG.applyInProgress.primaryAction,
          onClick: () => setIsApplyInProgressDialogOpen(false),
        }}
      />
    </ApplyStepLayout>
  );
}
