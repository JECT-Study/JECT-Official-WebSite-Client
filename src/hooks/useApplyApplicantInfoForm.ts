import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { applyApplicantInfoSchema, ApplyApplicantInfoFormData } from '@/schema/applySchema';

export const useApplyApplicantInfoForm = () => {
  return useForm<ApplyApplicantInfoFormData>({
    resolver: zodResolver(applyApplicantInfoSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
  });
};
