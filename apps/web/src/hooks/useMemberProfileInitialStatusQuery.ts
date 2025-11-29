import { useQuery } from "@tanstack/react-query";

import { getMemberProfileInitialStatus } from "@/apis/apply";
import type { MemberProfileInitialStatusResponse } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useMemberProfileInitialStatusQuery = () => {
  return useQuery<ApiResponse<MemberProfileInitialStatusResponse>>({
    queryKey: ["memberProfileInitialStatus"],
    queryFn: getMemberProfileInitialStatus,
    enabled: false,
  });
};
