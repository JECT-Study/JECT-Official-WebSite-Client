import { Dialog } from "@ject/jds";
import { useFunnel } from "@use-funnel/react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  EmailVerificationStep,
  PinSetupStep,
  ApplicantInfoStep,
  RegistrationStep,
  CompleteStep,
} from "./steps";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { useNavigationBlock } from "@/hooks/useNavigationBlock";
import type { ApplyFunnelSteps } from "@/types/funnel";
import { trackApplyStepView, trackApplyStepComplete, trackApplyComplete, APPLY_STEPS } from "@/utils/analytics";

interface ApplyFunnelProps {
  jobFamily: JobFamily;
}

export function ApplyFunnel({ jobFamily }: ApplyFunnelProps) {
  const navigate = useNavigate();
  const {
    isDialogOpen,
    handleConfirm,
    handleCancel,
  } = useNavigationBlock();

  const funnel = useFunnel<ApplyFunnelSteps>({
    id: "apply-funnel",
    initial: {
      step: "이메일인증",
      context: { jobFamily },
    },
  });

  // 단계 진입 시 트래킹 (이탈 지점 파악용)
  useEffect(() => {
    trackApplyStepView(funnel.step, jobFamily);
  }, [funnel.step, jobFamily]);

  const handleBack = () => {
    const targetPath = `${PATH.applyGuide}/${jobFamily}`;
    void navigate(targetPath);
  };

  return (
    <>
    <funnel.Render
      이메일인증={funnel.Render.with({
        events: {
          onVerified: (payload: { email: string; authCode: string }, { context, history }) => {
            // 신규 회원: 인증 성공 → PIN 설정으로
            trackApplyStepComplete(APPLY_STEPS.EMAIL_VERIFICATION, context.jobFamily);
            void history.push("PIN설정", {
              ...context,
              ...payload,
            });
          },
          goToContinueWriting: () => {
            // 기존 회원: 이어서 작성하기로 이동
            void navigate(`${PATH.applyContinue}/${jobFamily}`);
          },
          goBack: () => {
            handleBack();
          },
        },
        render({ context, dispatch }) {
          return <EmailVerificationStep context={context} dispatch={dispatch} />;
        },
      })}
      PIN설정={({ context, history }) => (
        <PinSetupStep
          context={context}
          onNext={() => {
            // 회원가입 성공 → 지원자 정보 입력으로
            trackApplyStepComplete(APPLY_STEPS.PIN_SETUP, context.jobFamily);
            void history.push("지원자정보", {
              ...context,
            });
          }}
          onBack={handleBack}
        />
      )}
      지원자정보={({ context, history }) => (
        <ApplicantInfoStep
          context={context}
          onNext={() => {
            // 프로필 저장 성공 → 지원서 작성으로
            trackApplyStepComplete(APPLY_STEPS.APPLICANT_INFO, context.jobFamily);
            void history.push("지원서작성", {
              ...context,
            });
          }}
          onBack={handleBack}
        />
      )}
      지원서작성={({ context, history }) => (
        <RegistrationStep
          context={context}
          onNext={() => {
            // 제출 성공 → 완료
            trackApplyStepComplete(APPLY_STEPS.REGISTRATION, context.jobFamily);
            trackApplyComplete(context.jobFamily);
            void history.push("완료", {
              ...context,
            });
          }}
          onBack={handleBack}
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
