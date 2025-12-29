import type { InputValidation } from "@ject/jds";

/**
 * Validation 상태를 도출하는 유틸리티 함수
 * - error: 에러가 있으면
 * - success: 에러 없이 값이 있으면(error의 경우 early return됨)
 * - none: 기본 상태
 */
export const deriveInputValidation = ({
  hasError,
  hasValue,
}: {
  hasError: boolean;
  hasValue: boolean;
}): InputValidation => {
  if (hasError) return "error";
  if (hasValue) return "success";
  return "none";
};
