import { useMutation } from '@tanstack/react-query';

import { putJob } from '@/apis/changeJob';

const useChangeJobQuery = () => {
  const { mutate: changeJob } = useMutation({
    mutationFn: putJob,
  });

  return { changeJob };
};

export default useChangeJobQuery;
