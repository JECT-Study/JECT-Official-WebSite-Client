import { useQueries, useQuery } from "@tanstack/react-query";

import { getJectalks } from "@/apis/jectalk";
import { useSemestersQuery } from "@/hooks/useSemestersQuery";
import type { SemesterData } from "@/types/apis/semester";

const useJectalksQuery = (semesterName?: string | null) => {
  const { data: semestersData } = useSemestersQuery();
  const semesters: SemesterData[] = semestersData?.semesterResponses ?? [];

  const { data: allData } = useQuery({
    queryKey: ["jectalks", null],
    queryFn: () => getJectalks(null),
  });

  const semesterQueries = useQueries({
    queries: semesters.map(semester => ({
      queryKey: ["jectalks", semester.name],
      queryFn: () => getJectalks(semester.name),
    })),
  });

  const currentSemesterIndex = semesters.findIndex(semester => semester.name === semesterName);
  const currentData = semesterName ? semesterQueries[currentSemesterIndex] : null;

  const semesterCounts = semesters.reduce<Record<string, number>>((acc, semester, index) => {
    acc[semester.name] = semesterQueries[index]?.data?.totalElements ?? 0;
    return acc;
  }, {});

  const counts: Record<string, number> = {
    all: allData?.totalElements ?? 0,
    ...semesterCounts,
  };

  const jectalks = semesterName ? currentData?.data?.content : allData?.content;
  const isError = semesterName ? currentData?.isError : false;
  const isPending = semesterName ? currentData?.isPending : !allData;

  return {
    jectalks,
    semesters,
    counts,
    isError,
    isPending,
  };
};

export default useJectalksQuery;
