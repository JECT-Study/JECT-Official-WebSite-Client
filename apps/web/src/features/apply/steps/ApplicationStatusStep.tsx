import { Dialog, LabelButton } from "@ject/jds";

import { APPLY_DIALOG } from "@/constants/applyMessages";
import { APPLY_TITLE } from "@/constants/applyPageData";
import { ApplyStepLayout } from "@/features/shared/components";
import { useApplyStatusSuspenseQuery } from "@/hooks/apply";
import type { ApplyFunnelSteps } from "@/types/funnel";

type DialogType = "tempSaved" | "submitted";

const STATUS_TO_DIALOG_TYPE: Record<string, DialogType | undefined> = {
  TEMP_SAVED: "tempSaved",
  SUBMITTED: "submitted",
  JOINED: "submitted",
};

interface ApplicationStatusStepProps {
  context: ApplyFunnelSteps["지원상태확인"];
  onContinueWriting: () => void;
  onAlreadySubmitted: () => void;
  onBack: () => void;
}

export function ApplicationStatusStep({
  context,
  onContinueWriting,
  onAlreadySubmitted,
  onBack,
}: ApplicationStatusStepProps) {
  const { data } = useApplyStatusSuspenseQuery(context.email);
  const dialogType = STATUS_TO_DIALOG_TYPE[data.status];

  if (!dialogType) {
    return null;
  }

  const isTempSaved = dialogType === "tempSaved";
  const dialog = APPLY_DIALOG[dialogType];

  const handleConfirm = () => {
    if (isTempSaved) {
      onContinueWriting();
    } else {
      onAlreadySubmitted();
    }
  };

  return (
    <ApplyStepLayout
      variant='apply'
      title={APPLY_TITLE.verifyEmail}
      current={0}
      jobFamily={context.jobFamily}
      onBack={onBack}
    >
      <div className='flex flex-col items-start gap-(--semantic-spacing-24) self-stretch'>
        <LabelButton.Basic size='md' hierarchy='tertiary' onClick={onBack}>
          이전 단계로 돌아가기
        </LabelButton.Basic>

        <Dialog
          open
          onOpenChange={open => !open && onBack()}
          header={dialog.header}
          body={dialog.body}
          primaryAction={{
            children: dialog.primaryAction,
            onClick: handleConfirm,
          }}
          secondaryAction={
            isTempSaved
              ? { children: APPLY_DIALOG.tempSaved.secondaryAction, onClick: onBack }
              : undefined
          }
        />
      </div>
    </ApplyStepLayout>
  );
}
