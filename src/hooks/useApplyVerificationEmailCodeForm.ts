import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  applyVerificationEmailCodeSchema,
  ApplyVerificationEmailCodeFormData,
} from '@/schema/applySchema';

export const useApplyVerificationEmailCodeForm = () => {
  return useForm<ApplyVerificationEmailCodeFormData>({
    resolver: zodResolver(applyVerificationEmailCodeSchema),
    mode: 'onChange',
    defaultValues: {
      verificationEmailCode: '',
    },
  });
};
