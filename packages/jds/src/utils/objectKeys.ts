/**
 * Object.keys의 반환 타입을 키의 리터럴 타입으로 좁힌 래퍼입니다.
 * @param obj - 키를 추출할 객체
 * @returns 객체 키의 배열 (리터럴 타입)
 */
export const objectKeys = <T extends string>(obj: Record<T, unknown>): T[] =>
  Object.keys(obj) as T[];
