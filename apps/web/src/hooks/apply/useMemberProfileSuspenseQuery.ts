import { useSuspenseQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

export function useMemberProfileSuspenseQuery() {
  return useSuspenseQuery(applyQueries.profile.me());
}
