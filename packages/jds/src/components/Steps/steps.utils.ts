function calculateStepsActivated(itemIndex: number, currentStep: number): boolean {
  return itemIndex <= currentStep;
}

export function useStepsItemActivated({
  itemIndex,
  currentStep,
  activatedProp,
}: {
  itemIndex?: number;
  currentStep?: number;
  activatedProp?: boolean;
}): boolean {
  if (currentStep !== undefined && itemIndex !== undefined) {
    return calculateStepsActivated(itemIndex, currentStep);
  }

  return activatedProp ?? false;
}
