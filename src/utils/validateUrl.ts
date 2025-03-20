/**
 * URL 간단 검증 정규식
 */
const simpleRegex = /^https?:\/\/.*$/;

/**
 * URL 상세 검증 정규식
 * - 프로토콜(http/https)
 * - 유효한 도메인과 최상위 도메인(TLD)
 * - 선택적인 경로, 쿼리 스트링, 해시 값
 */
const detailedRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:\/?#[\]@!$&'()*+,;=%]*)?$/;

/**
 * URL이 http 또는 https 프로토콜로 시작하는지 검증하는 함수
 * @param url 검사할 URL 문자열
 * @returns URL이 유효하거나 빈 문자열인 경우 true, 그렇지 않으면 false
 */
export const validateUrlStartHttp = (url: string): boolean => {
  return simpleRegex.test(url) || url.length === 0;
};

/**
 * 프로토콜, 도메인, 경로 등 URL의 전체 구조가 유효한지 검증하는 함수
 * @param url 검사할 URL 문자열
 * @returns URL이 유효하거나 빈 문자열인 경우 true, 그렇지 않으면 false
 */
export const validateUrlDetail = (url: string): boolean => {
  return detailedRegex.test(url) || url.length === 0;
};
