import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries, type JobFamily } from "@/apis/apply";

export function useQuestionsSuspenseQuery(jobFamily: JobFamily) {
  return useSuspenseQuery(applyQueries.questions.byJobFamily(jobFamily));
}
