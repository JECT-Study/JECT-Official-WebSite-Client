import { useQuery } from "@tanstack/react-query";

import { getMiniStudies } from "@/apis/miniStudy";

const useMiniStudies = () => {
  const { data } = useQuery({
    queryKey: ["miniStudies"],
    queryFn: getMiniStudies,
  });

  const miniStudies = data?.data.content;

  return { miniStudies };
};

export default useMiniStudies;
