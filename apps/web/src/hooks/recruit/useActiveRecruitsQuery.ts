import { useQuery } from "@tanstack/react-query";

import { recruitQueries } from "@/apis/recruit";

export function useActiveRecruitsQuery() {
  return useQuery(recruitQueries.active.list());
}
