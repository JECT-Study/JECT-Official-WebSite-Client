import { useQuery } from "@tanstack/react-query";

import { getMiniStudies } from "@/apis/miniStudy";

const useMiniStudiesQuery = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["miniStudies"],
    queryFn: getMiniStudies,
  });

  return {
    miniStudies: data?.content,
    isError,
    isPending,
  };
};

export default useMiniStudiesQuery;
