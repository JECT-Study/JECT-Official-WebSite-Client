import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { applyEmailSchema, ApplyEmailFormData } from '@/schema/applySchema';

export const useApplyEmailForm = () => {
  return useForm<ApplyEmailFormData>({
    resolver: zodResolver(applyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
};
