import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useDraftSuspenseQuery() {
  return useSuspenseQuery(applyQueries.draft.current());
}
