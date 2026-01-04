import { BlockButton, Dialog, LabelButton, TextField, toastController } from "@ject/jds";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { applyApi, type JobFamily } from "@/apis/apply";
import { APPLY_DIALOG, APPLY_MESSAGE } from "@/constants/applyMessages.tsx";
import { findJobFamilyOption, APPLY_TITLE } from "@/constants/applyPageData";
import { PATH } from "@/constants/path";
import { ApplyStepLayout } from "@/features/shared/components";
import {
  useCheckApplyStatusMutation,
  useDeleteDraftMutation,
  useMemberProfileMutation,
  usePinLoginMutation,
} from "@/hooks/apply";
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

interface JobFamilyMismatchDialog {
  isOpen: boolean;
  savedJobFamily: JobFamily | null;
}

export function IdentityVerificationStep({ context, dispatch }: IdentityVerificationStepProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmittedDialogOpen, setIsSubmittedDialogOpen] = useState(false);
  const [mismatchDialog, setMismatchDialog] = useState<JobFamilyMismatchDialog>({
    isOpen: false,
    savedJobFamily: null,
  });
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");

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

  const [isChangingJobFamily, setIsChangingJobFamily] = useState(false);

  const { mutate: checkApplyStatusMutate, isPending: isCheckingStatus } =
    useCheckApplyStatusMutation();
  const { mutateAsync: deleteDraftAsync } = useDeleteDraftMutation();
  const { mutateAsync: updateProfileAsync } = useMemberProfileMutation();

  const handleCheckApplyStatus = (userEmail: string) => {
    checkApplyStatusMutate(undefined, {
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
          .getDraft()
          .then(draft => {
            // 파트 불일치 체크: draft에 저장된 jobFamily와 현재 접근한 jobFamily가 다른 경우
            if (draft.jobFamily != null && draft.jobFamily !== context.jobFamily) {
              setVerifiedEmail(userEmail);
              setMismatchDialog({
                isOpen: true,
                savedJobFamily: draft.jobFamily,
              });
              return;
            }

            // 같은 파트 또는 draft 없음 → 이어서 작성
            toastController.positive(APPLY_MESSAGE.success.continueWriting);
            dispatch("goToApply", userEmail);
          })
          .catch((error: unknown) => {
            // draft 조회 실패 시에도 이어서 작성 가능 (빈 폼으로 시작)
            handleError(error, "임시저장 데이터 조회 실패");
            toastController.destructive(APPLY_MESSAGE.fail.loadDraft);
            dispatch("goToApply", userEmail);
          });
      },
      onError: error => {
        handleError(error, "지원 상태 확인 실패");
        toastController.destructive(APPLY_MESSAGE.fail.checkApplyStatus);
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

  // 파트 불일치 다이얼로그: "기존 파트 지원서 이어서 작성하기" 선택
  const handleContinueSavedDraft = () => {
    if (mismatchDialog.savedJobFamily) {
      void navigate(`${PATH.applyContinue}/${mismatchDialog.savedJobFamily}`);
    }
    setMismatchDialog({ isOpen: false, savedJobFamily: null });
  };

  // 파트 불일치 다이얼로그: "새로운 파트로 지원하기" 선택
  const handleStartNewApplication = async () => {
    setIsChangingJobFamily(true);
    setMismatchDialog({ isOpen: false, savedJobFamily: null });

    try {
      // 1. 현재 프로필 백업
      const profile = await applyApi.getMe();

      // 2. 기존 draft + 프로필 삭제
      await deleteDraftAsync();

      // 3. 프로필 복원 (새로운 jobFamily로)
      await updateProfileAsync({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        careerDetails: profile.careerDetails,
        region: profile.region,
        experiencePeriod: profile.experiencePeriod,
        interestedDomains: profile.interestedDomains,
        jobFamily: context.jobFamily,
      });

      // 4. 지원서 작성으로 이동
      toastController.positive(APPLY_MESSAGE.success.continueWriting);
      dispatch("goToApply", verifiedEmail);
    } catch (error) {
      handleError(error, "파트 변경 실패");
      toastController.destructive(APPLY_MESSAGE.fail.changeJobFamily);
    } finally {
      setIsChangingJobFamily(false);
    }
  };

  // 다이얼로그 메시지 생성
  const mismatchDialogContent = mismatchDialog.savedJobFamily
    ? APPLY_DIALOG.jobFamilyMismatch(
        findJobFamilyOption(mismatchDialog.savedJobFamily).korean,
        findJobFamilyOption(context.jobFamily).korean,
      )
    : null;

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

      {mismatchDialogContent && (
        <Dialog
          open={mismatchDialog.isOpen || isChangingJobFamily}
          onOpenChange={open =>
            !open &&
            !isChangingJobFamily &&
            setMismatchDialog({ isOpen: false, savedJobFamily: null })
          }
          header={mismatchDialogContent.header}
          body={mismatchDialogContent.body}
          primaryAction={{
            children: mismatchDialogContent.primaryAction,
            onClick: handleContinueSavedDraft,
            disabled: isChangingJobFamily,
          }}
          secondaryAction={{
            children: isChangingJobFamily ? "변경 중..." : mismatchDialogContent.secondaryAction,
            onClick: () => void handleStartNewApplication(),
            disabled: isChangingJobFamily,
          }}
        />
      )}
    </ApplyStepLayout>
  );
}
