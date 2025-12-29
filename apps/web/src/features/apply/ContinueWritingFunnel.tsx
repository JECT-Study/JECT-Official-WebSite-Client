import { Dialog, toastController } from "@ject/jds";
import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ApplicantInfoStep,
  CompleteStep,
  IdentityVerificationStep,
  RegistrationStep,
} from "./steps";

import { applyApi, type JobFamily } from "@/apis/apply";
import { APPLY_MESSAGE } from "@/constants/applyMessages";
import { PATH } from "@/constants/path";
import { useNavigationBlock } from "@/hooks/useNavigationBlock";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";

interface ContinueWritingFunnelProps {
  jobFamily: JobFamily;
}

export function ContinueWritingFunnel({ jobFamily }: ContinueWritingFunnelProps) {
  const navigate = useNavigate();
  const {
    isDialogOpen,
    handleConfirm,
    handleCancel,
  } = useNavigationBlock();

  const funnel = useFunnel<ContinueWritingFunnelSteps>({
    id: "continue-writing-funnel",
    initial: {
      step: "본인확인",
      context: { jobFamily },
    },
  });

  const handleBackToFirst = () => {
    void navigate(-1);
  };

  return (
    <>
    <funnel.Render
      본인확인={({ context, history }) => (
        <IdentityVerificationStep
          context={context}
          onNext={async ({ email }) => {
            try {
              const { status, step } = await applyApi.getStatus(email);

              // 이미 제출 완료된 경우 메인으로 리다이렉트
              if (status === "SUBMITTED" || status === "JOINED") {
                toastController.basic("이미 지원서를 제출하셨습니다.");
                void navigate(PATH.main);
                return;
              }

              // 임시저장 상태가 아닌 경우 (예: NOT_APPLIED)
              if (status !== "TEMP_SAVED" || !step) {
                toastController.basic("이어서 작성할 지원서가 없습니다.");
                void navigate(-1);
                return;
              }

              if (step === "APPLY") {
                // APPLY: 지원서 임시 저장됨 → 지원서작성으로
                toastController.positive(APPLY_MESSAGE.success.continueWriting);
                await history.push("지원서작성", prev => ({
                  ...prev,
                  email,
                  tempSavedStep: "APPLY" as const,
                }));
              } else {
                // PROFILE: 프로필 미완료 → 지원자정보로
                await history.push("지원자정보", prev => ({
                  ...prev,
                  email,
                  tempSavedStep: "PROFILE" as const,
                }));
              }
            } catch (error) {
              handleError(error, "지원 상태 확인 실패");
              toastController.destructive("지원 상태 확인에 실패했습니다. 다시 시도해주세요.");
            }
          }}
          onBack={() => {
            // 첫 단계에서는 브라우저 뒤로가기 (지원안내페이지로)
            void navigate(-1);
          }}
        />
      )}
      지원자정보={({ context, history }) => (
        <ApplicantInfoStep
          context={context}
          onNext={() => {
            void history.push("지원서작성", {
              jobFamily: context.jobFamily,
              email: context.email,
              tempSavedStep: "APPLY",
            });
          }}
          onBack={handleBackToFirst}
        />
      )}
      지원서작성={({ context, history }) => (
        <RegistrationStep
          context={context}
          onNext={() => {
            void history.push("완료", { ...context });
          }}
          onBack={handleBackToFirst}
        />
      )}
      완료={({ context }) => <CompleteStep jobFamily={context.jobFamily} />}
    />
    <Dialog
      open={isDialogOpen}
      onOpenChange={open => !open && handleCancel()}
      header='작성된 내용이 모두 사라집니다'
      body='작성을 그만두고 페이지에서 나가시겠어요?'
      primaryAction={{
        children: "페이지 나가기",
        onClick: handleConfirm,
      }}
      secondaryAction={{
        children: "취소",
        onClick: handleCancel,
      }}
    />
    </>
  );
}
