import { Dialog } from "@ject/jds";
import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  EmailVerificationStep,
  PinSetupStep,
  ApplicationStatusStep,
  ApplicantInfoStep,
  RegistrationStep,
  CompleteStep,
} from "./steps";

import type { JobFamily } from "@/apis/apply";
import { PATH } from "@/constants/path";
import { useNavigationBlock } from "@/hooks/useNavigationBlock";
import type { ApplyFunnelSteps } from "@/types/funnel";

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

  const handleBack = () => {
    const targetPath = `${PATH.applyGuide}/${jobFamily}`;
    void navigate(targetPath);
  };

  return (
    <>
    <funnel.Render
      이메일인증={({ context, history }) => (
        <EmailVerificationStep
          context={context}
          onNext={(email, authCode) => {
            // 신규 회원: 인증 성공 → PIN 설정으로
            void history.push("PIN설정", {
              ...context,
              email,
              authCode,
            });
          }}
          onExistingMember={email => {
            // 기존 회원 → 지원 상태 확인으로
            void history.push("지원상태확인", {
              ...context,
              email,
            });
          }}
          onBack={handleBack}
        />
      )}
      PIN설정={({ context, history }) => (
        <PinSetupStep
          context={context}
          onNext={() => {
            // 회원가입 성공 → 지원자 정보 입력으로
            void history.push("지원자정보", {
              ...context,
            });
          }}
          onBack={handleBack}
        />
      )}
      지원상태확인={({ context }) => (
        <ApplicationStatusStep
          context={context}
          onContinueWriting={() => {
            // 이어쓰기 선택 → ContinueWritingFunnel로 리다이렉트
            void navigate(`${PATH.applyContinue}/${jobFamily}`);
          }}
          onAlreadySubmitted={() => {
            // 이미 제출 완료 (SUBMITTED/JOINED) → 메인으로 리다이렉트
            void navigate(PATH.main);
          }}
          onBack={handleBack}
        />
      )}
      지원자정보={({ context, history }) => (
        <ApplicantInfoStep
          context={context}
          onNext={() => {
            // 프로필 저장 성공 → 지원서 작성으로
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
