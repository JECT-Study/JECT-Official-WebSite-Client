import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { putMemberProfileInitial } from "@/apis/apply";
import type { MemberProfileInitialPayload, MemberProfileInitialResponse } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useMemberProfileInitialMutation = (): UseMutationResult<
  ApiResponse<MemberProfileInitialResponse>,
  AxiosError,
  MemberProfileInitialPayload
> => {
  return useMutation({
    mutationKey: ["putMemberProfileInitial"],
    mutationFn: putMemberProfileInitial,
  });
};
