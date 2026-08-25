import { useFunnel } from "@use-funnel/react-router-dom";
import { useNavigate } from "react-router-dom";

import { EmailVerificationStep, NewPinSetupStep } from "./steps";

import type { ResetPinFunnelSteps } from "@/types/funnel";

interface ResetPinFunnelProps {
  recruitId: number;
  returnTo: string;
}

export function ResetPinFunnel({ recruitId, returnTo }: ResetPinFunnelProps) {
  const navigate = useNavigate();

  const funnel = useFunnel<ResetPinFunnelSteps>({
    id: "reset-pin-funnel",
    initial: {
      step: "이메일인증",
      context: { recruitId, returnTo },
    },
  });

  const handleBack = () => {
    void navigate(returnTo, { replace: true });
  };

  return (
    <funnel.Render
      이메일인증={({ context, history }) => (
        <EmailVerificationStep
          context={context}
          onNext={(email, authCode) => {
            void history.push("새PIN설정", {
              ...context,
              email,
              authCode,
            });
          }}
          onBack={handleBack}
        />
      )}
      새PIN설정={({ context }) => <NewPinSetupStep context={context} onBack={handleBack} />}
    />
  );
}
