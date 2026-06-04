function calculateStepActivated(itemIndex: number, currentStep: number): boolean {
  return itemIndex <= currentStep;
}

export function useStepItemActivated({
  itemIndex,
  currentStep,
  activatedProp,
}: {
  itemIndex?: number;
  currentStep?: number;
  activatedProp?: boolean;
}): boolean {
  if (currentStep !== undefined && itemIndex !== undefined) {
    return calculateStepActivated(itemIndex, currentStep);
  }

  return activatedProp ?? false;
}
