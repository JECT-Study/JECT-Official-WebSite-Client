import { LocalNavigation, Step } from "@ject/jds";

import type { JobFamily } from "@/types/apis/application";
import { STEP_LABELS } from "@/types/funnel";

const JOB_FAMILY_LABELS: Record<JobFamily, string> = {
  PM: "[젝트 4기] 프로덕트 매니저 개발자 모집",
  PD: "[젝트 4기] 프로덕트 디자이너 개발자 모집",
  FE: "[젝트 4기] 프론트엔드 개발자 모집",
  BE: "[젝트 4기] 백엔드 개발자 모집",
};

interface ApplyFunnelHeaderProps {
  current?: number;
  jobFamily?: JobFamily;
  title?: string;
  onBack: () => void;
}

export function ApplyFunnelHeader({ current, jobFamily, title, onBack }: ApplyFunnelHeaderProps) {
  const hasSteps = current !== undefined && jobFamily !== undefined;
  const headerTitle = jobFamily ? JOB_FAMILY_LABELS[jobFamily] : title;

  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-[32.5rem] px-4'>
        <LocalNavigation.Root>
          <LocalNavigation.BackButton onClick={onBack} />
          {headerTitle && <LocalNavigation.Title>{headerTitle}</LocalNavigation.Title>}
        </LocalNavigation.Root>
        {hasSteps && (
          <Step.Root size='md' current={current}>
            {STEP_LABELS.map((label, index) => (
              <Step.Item key={label} index={index}>
                {label}
              </Step.Item>
            ))}
          </Step.Root>
        )}
      </div>
    </div>
  );
}
