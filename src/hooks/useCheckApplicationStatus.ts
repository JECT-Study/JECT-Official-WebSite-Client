import { useQuery } from '@tanstack/react-query';

import { getApplicationStatus } from '@/apis/application';

const useCheckApplicationStatus = () => {
  return useQuery({
    queryKey: ['applicationStatus'],
    queryFn: getApplicationStatus,
    enabled: false,
  });
};

export default useCheckApplicationStatus;
