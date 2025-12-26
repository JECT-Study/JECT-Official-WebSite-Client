import { validateUrlDetail } from "./validateUrl";

import type { Question } from "@/apis/apply";
import type { Application } from "@/types/ui/application";

/**
 * 주어진 질문 목록과 답변을 기반으로 유효성을 검사하는 함수
 *
 * 이 함수는 각 질문에 대해 다음의 조건을 검사한다.
 *
 * - FILE 타입
 *   답변 필수 O: 하나 이상의 파일이 존재해야한다.
 *   답변 필수 X: 무조건 통과.
 *
 * - TEXT 타입
 *   답변 필수 O, 길이 제한 O: 공백 제거된 답변이 0 초과 maxLength 이하여야한다.
 *   답변 필수 O, 길이 제한 X: 공백 제거된 답변이 0 초과여야한다.
 *   답변 필수 X, 길이 제한 O: maxLength 이하여야한다.
 *   답변 필수 X, 길이 제한 X : 무조건 통과
 *
 * - URL 타입
 *   답변 필수 O : 유효한 url이여야한다.
 *   답변 필수 X : 답변이 있다면 유효한 url이여야한다. 답변이 없으면 통과.
 *
 * - SELECT 타입
 *   답변 필수 O : 빈 문자열이 아닌 값이 있어야한다.
 *   답변 필수 X : 무조건 통과
 *
 * 만약 예상하지 못한 inputType이 전달되면 기본적으로 false를 반환한다.
 *
 * @param questions - 질문 객체들의 배열.
 * @param application - 각 질문에 대한 답변과 파일 정보를 담고 있는 객체.
 * @returns 모든 질문의 답변이 유효하면 true를, 그렇지 않으면 false를 반환.
 */
export const validateApplication = (questions: Question[], application: Application) => {
  return questions.every(question => {
    if (question.inputType === "FILE") {
      if (!question.isRequired) return true;

      return application.portfolios.length > 0;
    }

    if (question.inputType === "TEXT") {
      const text = application.answers[question.id] ?? "";

      if (!question.isRequired) {
        if (question.maxTextLength) return text.length <= question.maxTextLength;

        return true;
      }

      if (text.trim().length === 0) return false;

      if (question.maxTextLength) return text.length <= question.maxTextLength;

      return true;
    }

    if (question.inputType === "URL") {
      const url = application.answers[question.id] || "";

      return url ? validateUrlDetail(url) : !question.isRequired;
    }

    if (question.inputType === "SELECT") {
      if (!question.isRequired) return true;

      const text = application.answers[question.id] ?? "";

      return text !== "";
    }

    return false;
  });
};
