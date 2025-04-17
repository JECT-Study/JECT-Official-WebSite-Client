import { useQuery } from '@tanstack/react-query';

import { getApplicationStatus } from '@/apis/application';

const useCheckApplicationStatus = (enabled?: boolean) => {
  return useQuery({
    queryKey: ['applicationStatus'],
    queryFn: getApplicationStatus,
    enabled: enabled ?? true,
    staleTime: 60000,
  });
};

export default useCheckApplicationStatus;
