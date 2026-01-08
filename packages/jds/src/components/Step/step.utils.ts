import type { StepStatus } from './step.types';

function calculateStepStatus(itemIndex: number, currentStep: number): StepStatus {
  if (itemIndex < currentStep) return 'completed';
  if (itemIndex === currentStep) return 'ongoing';
  return 'uncompleted';
}

export function useStepItemStatus({
  itemIndex,
  currentStep,
  statusProp,
}: {
  itemIndex?: number;
  currentStep?: number;
  statusProp?: StepStatus;
}): StepStatus {
  if (currentStep !== undefined && itemIndex !== undefined) {
    return calculateStepStatus(itemIndex, currentStep);
  }

  return statusProp ?? 'uncompleted';
}
