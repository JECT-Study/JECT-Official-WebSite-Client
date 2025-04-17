import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getDraft } from '@/apis/application';
import { AnswersResponse } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

const useDraftQuery = (enabled?: boolean) => {
  const { data, refetch } = useQuery<
    ApiResponse<AnswersResponse>,
    AxiosError,
    ApiResponse<AnswersResponse>,
    string[]
  >({
    queryKey: ['getDraft'],
    queryFn: getDraft,
    enabled: enabled ?? true,
    retry: 1,
  });

  return { data, refetch };
};

export default useDraftQuery;
