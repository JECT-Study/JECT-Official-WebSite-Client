import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { applyAuthCodeSchema, ApplyAuthCodeFormData } from '@/schema/applySchema';

export const useApplyAuthCodeForm = () => {
  return useForm<ApplyAuthCodeFormData>({
    resolver: zodResolver(applyAuthCodeSchema),
    mode: 'onChange',
    defaultValues: {
      authCode: '',
    },
  });
};
