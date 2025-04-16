import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getDraft } from '@/apis/application';
import { AnswersResponse } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

const useDraftQuery = (enabled?: boolean) => {
  const { data, isError, error, refetch } = useQuery<
    ApiResponse<AnswersResponse>,
    AxiosError,
    ApiResponse<AnswersResponse>,
    string[]
  >({
    queryKey: ['getDraft'],
    queryFn: getDraft,
    enabled: enabled ?? true,
    retry: 0,
  });

  if (isError) {
    console.error('Query Error :', error);
  }

  return { data, refetch };
};

export default useDraftQuery;
