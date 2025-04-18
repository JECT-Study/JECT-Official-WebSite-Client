import { useQuery } from '@tanstack/react-query';

import { getMemberProfileInitialStatus } from '@/apis/apply';
import { MemberProfileInitialStatusResponse } from '@/types/apis/apply';
import { ApiResponse } from '@/types/apis/response';

export const useMemberProfileInitialStatusQuery = () => {
  return useQuery<ApiResponse<MemberProfileInitialStatusResponse>>({
    queryKey: ['memberProfileInitialStatus'],
    queryFn: getMemberProfileInitialStatus,
    enabled: false,
  });
};
