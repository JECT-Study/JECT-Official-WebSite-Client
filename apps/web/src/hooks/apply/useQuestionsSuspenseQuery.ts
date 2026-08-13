import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useQuestionsSuspenseQuery(recruitId: number) {
  return useSuspenseQuery(applyQueries.questions.byRecruitId(recruitId));
}
