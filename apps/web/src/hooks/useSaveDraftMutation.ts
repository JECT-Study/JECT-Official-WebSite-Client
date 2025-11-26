import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postDraft } from "@/apis/application";
import type { AnswersPayload, JobFamily } from "@/types/apis/application";
import type { ApiResponse } from "@/types/apis/response";

interface SaveDraftMutationVariables {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

const useSaveDraftMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  SaveDraftMutationVariables,
  unknown
> => {
  return useMutation({
    mutationKey: ["saveDraft"],
    mutationFn: ({ jobFamily, answers }) => postDraft(jobFamily, answers),
  });
};

export default useSaveDraftMutation;
