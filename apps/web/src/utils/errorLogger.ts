/**
 * 개발 환경에서만 에러 로깅을 수행하는 유틸리티 함수
 *
 * @param error - 에러 객체
 * @param context - 에러가 발생한 컨텍스트 설명
 */
export const handleError = (error: unknown, context: string): void => {
  if (import.meta.env.DEV) {
    console.error(`[Error] ${context}:`, error);
  }
};
