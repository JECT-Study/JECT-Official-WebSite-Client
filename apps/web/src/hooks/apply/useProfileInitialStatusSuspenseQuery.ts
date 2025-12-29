import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useProfileInitialStatusSuspenseQuery() {
  return useSuspenseQuery(applyQueries.profile.initialStatus());
}
