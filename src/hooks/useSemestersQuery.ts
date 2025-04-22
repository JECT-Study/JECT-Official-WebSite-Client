import { useQuery } from '@tanstack/react-query';

import { getSemesters } from '@/apis/semester';
import { ApiResponse } from '@/types/apis/response';
import { SemestersResponse } from '@/types/apis/semester';

export const useSemestersQuery = () => {
  return useQuery<ApiResponse<SemestersResponse>>({
    queryKey: ['getSemesters'],
    queryFn: getSemesters,
  });
};
