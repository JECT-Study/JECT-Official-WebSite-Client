import { useQuery } from "@tanstack/react-query";

import { getJectalks, type SemesterFilter } from "@/apis/jectalk";

const useJectalksQuery = (semester?: SemesterFilter) => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["jectalks", semester],
    queryFn: () => getJectalks(semester),
  });

  const { data: allData } = useQuery({
    queryKey: ["jectalks", null],
    queryFn: () => getJectalks(null),
  });

  const { data: semester1Data } = useQuery({
    queryKey: ["jectalks", "1"],
    queryFn: () => getJectalks("1"),
  });

  const { data: semester2Data } = useQuery({
    queryKey: ["jectalks", "2"],
    queryFn: () => getJectalks("2"),
  });

  const { data: semester3Data } = useQuery({
    queryKey: ["jectalks", "3"],
    queryFn: () => getJectalks("3"),
  });

  return {
    jectalks: data?.data.content,
    counts: {
      all: allData?.data.totalElements ?? 0,
      "1": semester1Data?.data.totalElements ?? 0,
      "2": semester2Data?.data.totalElements ?? 0,
      "3": semester3Data?.data.totalElements ?? 0,
    },
    isError,
    isPending,
  };
};

export default useJectalksQuery;
