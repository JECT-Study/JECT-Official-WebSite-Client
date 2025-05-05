import { useMemo } from 'react';

import { AuthStep } from '@/components/auth/types';

export const useFormId = (step: AuthStep): string => {
  return useMemo(() => {
    switch (step) {
      case 'EMAIL':
        return 'emailForm';
      case 'VERIFICATION':
        return 'verificationForm';
      case 'PIN':
        return 'pinForm';
      default:
        return '';
    }
  }, [step]);
};
