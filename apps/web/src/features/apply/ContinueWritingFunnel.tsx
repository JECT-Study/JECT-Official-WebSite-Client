import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ApplicantInfoStep,
  CompleteStep,
  IdentityVerificationStep,
  RegistrationStep,
} from "./steps";

import type { JobFamily } from "@/apis/apply";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";

interface ContinueWritingFunnelProps {
  jobFamily: JobFamily;
}

export function ContinueWritingFunnel({ jobFamily }: ContinueWritingFunnelProps) {
  const navigate = useNavigate();

  const funnel = useFunnel<ContinueWritingFunnelSteps>({
    id: "continue-writing-funnel",
    initial: {
      step: "본인확인",
      context: { jobFamily },
    },
  });

  const handleBackToFirst = () => {
    void funnel.history.go(0);
  };

  return (
    <funnel.Render
      본인확인={funnel.Render.with({
        events: {
          goToProfile: (email: string, { context, history }) => {
            void history.push("지원자정보", {
              ...context,
              email,
              tempSavedStep: "PROFILE" as const,
            });
          },
          goToApply: (email: string, { context, history }) => {
            void history.push("지원서작성", {
              ...context,
              email,
              tempSavedStep: "APPLY" as const,
            });
          },
          goBack: () => {
            void navigate(-1);
          },
        },
        render({ context, dispatch }) {
          return <IdentityVerificationStep context={context} dispatch={dispatch} />;
        },
      })}
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
