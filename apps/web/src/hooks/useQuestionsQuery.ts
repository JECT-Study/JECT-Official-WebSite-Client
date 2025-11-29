import { useQuery } from "@tanstack/react-query";

import { getQuestions } from "@/apis/application";
import type { JobFamily } from "@/types/apis/application";

const useQuestionsQuery = (jobFamily: JobFamily | null) => {
  return useQuery({
    queryKey: ["question", jobFamily],
    queryFn: () => {
      if (!jobFamily) throw new Error("jobFamily is null");
      return getQuestions(jobFamily);
    },
    enabled: !!jobFamily,
    retry: 0,
  });
};

export default useQuestionsQuery;
