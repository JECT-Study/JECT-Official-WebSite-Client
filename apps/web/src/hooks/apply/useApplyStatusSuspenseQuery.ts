import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useApplyStatusSuspenseQuery(email: string) {
  return useSuspenseQuery(applyQueries.status.byEmail(email));
}
