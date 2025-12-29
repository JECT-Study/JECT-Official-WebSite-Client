import { Dialog, LabelButton, toastController } from "@ject/jds";
import { useEffect } from "react";

import { APPLY_DIALOG } from "@/constants/applyMessages";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout } from "@/features/shared/components";
import { useProfileInitialStatusSuspenseQuery } from "@/hooks/apply";
import type { ApplyFunnelSteps } from "@/types/funnel";
import { handleError } from "@/utils/errorLogger";

export type ApplicationStatusEvents = {
  goToContinueWriting: undefined;
  goBack: undefined;
};

interface ApplicationStatusStepProps {
  context: ApplyFunnelSteps["지원상태확인"];
  dispatch: (
    ...args:
      | [type: "goToContinueWriting", payload?: undefined]
      | [type: "goBack", payload?: undefined]
  ) => void;
}

export function ApplicationStatusStep({ context, dispatch }: ApplicationStatusStepProps) {
  const { data: isProfileRegistered } = useProfileInitialStatusSuspenseQuery();

  const handleBack = () => dispatch("goBack");

  // 프로필 미등록(에러) 상태 처리
  useEffect(() => {
    if (!isProfileRegistered) {
      handleError(new Error("프로필 미등록 상태"), "비정상 접근");
      toastController.destructive("가입되지 않은 회원입니다. 다시 시도해주세요.");
    }
  }, [isProfileRegistered]);

  if (!isProfileRegistered) {
    return (
      <ApplyStepLayout
        variant='apply'
        title={APPLY_TITLE.verifyEmail}
        current={0}
        jobFamily={context.jobFamily}
        onBack={handleBack}
      >
        <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
          <LabelButton.Basic size='md' hierarchy='tertiary' onClick={handleBack}>
            이전 단계로 돌아가기
          </LabelButton.Basic>
        </div>
      </ApplyStepLayout>
    );
  }

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.verifyEmail}
      current={0}
      jobFamily={context.jobFamily}
      onBack={handleBack}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <LabelButton.Basic size='md' hierarchy='tertiary' onClick={handleBack}>
          이전 단계로 돌아가기
        </LabelButton.Basic>

        <Dialog
          open
          onOpenChange={open => !open && handleBack()}
          header={APPLY_DIALOG.tempSaved.header}
          body={APPLY_DIALOG.tempSaved.body}
          primaryAction={{
            children: APPLY_DIALOG.tempSaved.primaryAction,
            onClick: () => dispatch("goToContinueWriting"),
          }}
          secondaryAction={{
            children: APPLY_DIALOG.tempSaved.secondaryAction,
            onClick: handleBack,
          }}
        />
      </div>
    </ApplyStepLayout>
  );
}
