import { Dialog } from "@ject/jds";
import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ApplicantInfoStep,
  CompleteStep,
  IdentityVerificationStep,
  RegistrationStep,
} from "./steps";

import type { JobFamily } from "@/apis/apply";
import { useNavigationBlock } from "@/hooks/useNavigationBlock";
import type { ContinueWritingFunnelSteps } from "@/types/funnel";

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
