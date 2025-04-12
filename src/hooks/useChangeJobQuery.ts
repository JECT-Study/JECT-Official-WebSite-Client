import { useMutation } from '@tanstack/react-query';

import { putJob } from '@/apis/changeJob';

const useChangeJobQuery = () => {
  const { mutate: changeJobMutate } = useMutation({
    mutationKey: ['changeJob'],
    mutationFn: putJob,
    onError: error => console.error(`Query Error : ${error}`),
  });

  return { changeJobMutate };
};

export default useChangeJobQuery;
