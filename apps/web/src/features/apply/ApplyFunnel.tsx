import { useFunnel } from "@use-funnel/react-router-dom";
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
import type { ApplyFunnelSteps } from "@/types/funnel";

interface ApplyFunnelProps {
  jobFamily: JobFamily;
}

export function ApplyFunnel({ jobFamily }: ApplyFunnelProps) {
  const navigate = useNavigate();

  const funnel = useFunnel<ApplyFunnelSteps>({
    id: "apply-funnel",
    initial: {
      step: "이메일인증",
      context: { jobFamily },
    },
  });

  const handleBack = () => {
    void navigate(`${PATH.applyGuide}/${jobFamily}`);
  };

  return (
    <funnel.Render
      이메일인증={funnel.Render.with({
        events: {
          onVerified: (payload: { email: string; authCode: string }, { context, history }) => {
            // 신규 회원: 인증 성공 → PIN 설정으로
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
  );
}
