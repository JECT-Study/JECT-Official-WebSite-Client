import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postSubmitAnswer } from "@/apis/application";
import type { AnswersPayload, JobFamily } from "@/types/apis/application";
import type { ApiResponse } from "@/types/apis/response";

interface SubmitAnswerMutationVariable {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

const useSubmitAnswerMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  SubmitAnswerMutationVariable,
  unknown
> => {
  return useMutation({
    mutationKey: ["submitAnswer"],
    mutationFn: ({ jobFamily, answers }) => postSubmitAnswer(jobFamily, answers),
  });
};

export default useSubmitAnswerMutation;
