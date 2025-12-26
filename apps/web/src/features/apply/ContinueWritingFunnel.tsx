import { toastController } from "@ject/jds";
import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ApplicantInfoStep,
  CompleteStep,
  IdentityVerificationStep,
  RegistrationStep,
} from "./steps";

import type { JobFamily } from "@/apis/apply";
import { APPLY_MESSAGE } from "@/constants/applyMessages";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";

interface ContinueWritingFunnelProps {
  jobFamily: JobFamily;
  tempSavedStep: "PROFILE" | "APPLY";
}

export function ContinueWritingFunnel({ jobFamily, tempSavedStep }: ContinueWritingFunnelProps) {
  const navigate = useNavigate();

  const funnel = useFunnel<ContinueWritingFunnelSteps>({
    id: "continue-writing-funnel",
    initial: {
      step: "본인확인",
      context: { jobFamily, tempSavedStep },
    },
  });

  const handleBackToFirst = () => {
    void funnel.history.go(0);
  };

  return (
    <funnel.Render
      본인확인={({ context, history }) => (
        <IdentityVerificationStep
          context={context}
          onNext={async ({ email }) => {
            if (context.tempSavedStep === "APPLY") {
              // APPLY: 지원서 임시 저장됨 → 지원서작성으로 (draft는 RegistrationStep에서 불러옴)
              toastController.positive(APPLY_MESSAGE.success.continueWriting);
              await history.push("지원서작성", prev => ({
                ...prev,
                email,
                tempSavedStep: "APPLY" as const,
              }));
            } else {
              // PROFILE: 프로필 미완료 → 지원자정보로 (빈 폼)
              await history.push("지원자정보", prev => ({
                ...prev,
                email,
                tempSavedStep: "PROFILE" as const,
              }));
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
  );
}
