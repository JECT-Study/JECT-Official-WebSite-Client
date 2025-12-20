import { Step } from "@ject/jds";

import { STEP_LABELS } from "@/types/funnel";

interface ApplyStepIndicatorProps {
  current: number;
}

export function ApplyStepIndicator({ current }: ApplyStepIndicatorProps) {
  return (
    <Step.Root size='md' current={current}>
      {STEP_LABELS.map((label, index) => (
        <Step.Item key={label} index={index}>
          {label}
        </Step.Item>
      ))}
    </Step.Root>
  );
}
