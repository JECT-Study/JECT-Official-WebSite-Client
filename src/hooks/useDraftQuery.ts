import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getDraft } from '@/apis/application';
import { AnswersResponse } from '@/types/apis/application';
import { ApiResponse } from '@/types/apis/response';

interface UseDraftQueryProps {
  enabled?: boolean;
}

const useDraftQuery = ({ enabled = true }: UseDraftQueryProps) => {
  const { data, isError, error, refetch } = useQuery<
    ApiResponse<AnswersResponse>,
    AxiosError,
    ApiResponse<AnswersResponse>,
    string[]
  >({
    queryKey: ['getDraft'],
    queryFn: getDraft,
    enabled,
  });

  if (isError) {
    console.error('Query Error :', error);
  }

  return { data, refetch };
};

export default useDraftQuery;
