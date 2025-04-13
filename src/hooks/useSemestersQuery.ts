import { useQuery } from '@tanstack/react-query';

import { getSemesters } from '@/apis/semester';
import { ApiResponse } from '@/types/apis/response';
import { SemesterResponse } from '@/types/apis/semester';

export const useSemestersQuery = () => {
  return useQuery<ApiResponse<SemesterResponse>>({
    queryKey: ['getSemesters'],
    queryFn: getSemesters,
  });
};