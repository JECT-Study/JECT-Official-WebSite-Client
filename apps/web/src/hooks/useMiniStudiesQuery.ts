import { useQuery } from "@tanstack/react-query";

import { getMiniStudies, type PositionFilter } from "@/apis/miniStudy";

const useMiniStudiesQuery = (position?: PositionFilter) => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["miniStudies", position],
    queryFn: () => getMiniStudies(position),
  });

  const { data: allData } = useQuery({
    queryKey: ["miniStudies", null],
    queryFn: () => getMiniStudies(null),
  });

  const { data: pmData } = useQuery({
    queryKey: ["miniStudies", "PM"],
    queryFn: () => getMiniStudies("PM"),
  });

  const { data: pdData } = useQuery({
    queryKey: ["miniStudies", "PD"],
    queryFn: () => getMiniStudies("PD"),
  });

  return {
    miniStudies: data?.data.content,
    counts: {
      all: allData?.data.totalElements ?? 0,
      PM: pmData?.data.totalElements ?? 0,
      PD: pdData?.data.totalElements ?? 0,
    },
    isError,
    isPending,
  };
};

export default useMiniStudiesQuery;
