import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { applyPinSchema, ApplyPinFormData } from '@/schema/applySchema';

export const useApplyPinForm = () => {
  return useForm<ApplyPinFormData>({
    resolver: zodResolver(applyPinSchema),
    mode: 'onChange',
    defaultValues: {
      pin: '',
    },
  });
};
