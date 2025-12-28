import { useQuery } from "@tanstack/react-query";

import { getJectalks } from "@/apis/jectalk";

const useJectalksQuery = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["jectalks"],
    queryFn: getJectalks,
  });

  return {
    jectalks: data?.content,
    isError,
    isPending,
  };
};

export default useJectalksQuery;
