import { useMemo } from 'react';

import { AuthStep } from '@/components/auth/types';

interface ButtonStateParams {
  step: AuthStep;
  email: string;
  isCooldownActive: boolean;
  verificationComplete: boolean;
  isPinValid: boolean;
  isResetPin: boolean;
  isTermsChecked: boolean;
  isSubmitting: boolean;
}

export const useButtonState = ({
  step,
  email,
  isCooldownActive,
  verificationComplete,
  isPinValid,
  isResetPin,
  isTermsChecked,
  isSubmitting,
}: ButtonStateParams) => {
  const isButtonDisabled = useMemo(() => {
    switch (step) {
      case 'EMAIL':
        return !email || isCooldownActive;
      case 'VERIFICATION':
        return !verificationComplete;
      case 'PIN':
        return !isPinValid || isSubmitting || (!isResetPin && !isTermsChecked);
      default:
        return true;
    }
  }, [
    step,
    email,
    isCooldownActive,
    verificationComplete,
    isPinValid,
    isResetPin,
    isTermsChecked,
    isSubmitting,
  ]);

  const rightIconFillColor = useMemo(
    () =>
      isButtonDisabled ? 'fill-accent-trans-hero-dark' : 'fill-object-static-inverse-hero-dark',
    [isButtonDisabled],
  );

  return { isButtonDisabled, rightIconFillColor };
};
