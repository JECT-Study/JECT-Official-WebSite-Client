import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useDraftSuspenseQuery(recruitId: number) {
  return useSuspenseQuery(applyQueries.draft.byRecruitId(recruitId));
}
