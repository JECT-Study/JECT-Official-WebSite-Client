import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { formatDraftPortfolios } from "./utils";

import { useDraftSuspenseQuery, useQuestionsSuspenseQuery } from "@/hooks/apply";
import type {
  AnswersByQuestionId,
  JobFamily,
  PortfolioFile,
  Question,
} from "@/types/apis/application";

interface UseRegistrationFormWithDraftReturn {
  questions: Question[];
  answers: AnswersByQuestionId;
  portfolios: PortfolioFile[];
  setAnswers: Dispatch<SetStateAction<AnswersByQuestionId>>;
  setPortfolios: Dispatch<SetStateAction<PortfolioFile[]>>;
}

/**
 * @description
 * API 응답의 answers (Record<string, string>)를
 * AnswersByQuestionId (Record<number, string>)로 변환
 *
 * API 스키마가 z.record(z.string(), z.string())로 정의되어 있어
 * key가 string이지만, 실제로는 숫자 ID를 문자열로 전송함
 */
const parseAnswersFromApi = (
  apiAnswers: Record<string, string> | undefined,
): AnswersByQuestionId => {
  if (!apiAnswers) return {};

  return Object.fromEntries(
    Object.entries(apiAnswers).map(([key, value]) => [Number(key), value]),
  ) as AnswersByQuestionId;
};

export function useRegistrationFormWithDraft(
  jobFamily: JobFamily,
): UseRegistrationFormWithDraftReturn {
  const { data: questionsData } = useQuestionsSuspenseQuery(jobFamily);
  const { data: draftData } = useDraftSuspenseQuery();

  const questions: Question[] = questionsData.questionResponses;

  const [answers, setAnswers] = useState<AnswersByQuestionId>(() => {
    return parseAnswersFromApi(draftData?.answers);
  });

  const [portfolios, setPortfolios] = useState<PortfolioFile[]>(() => {
    if (!draftData?.portfolios || draftData.portfolios.length === 0) {
      return [];
    }
    return formatDraftPortfolios(draftData.portfolios);
  });

  return {
    questions,
    portfolios,
    answers,
    setAnswers,
    setPortfolios,
  };
}
