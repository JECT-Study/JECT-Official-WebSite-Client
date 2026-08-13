import { useQuery } from "@tanstack/react-query";

import { applyQueries } from "@/apis/apply";

interface UseDraftQueryOptions {
  enabled?: boolean;
}

export function useDraftQuery(recruitId: number, options: UseDraftQueryOptions = {}) {
  const { enabled: isEnabled = true } = options;

  return useQuery({
    ...applyQueries.draft.byRecruitId(recruitId),
    enabled: isEnabled,
    retry: 0,
  });
}
