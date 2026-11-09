/**
 * @description 남은 시간(초)을 `m:ss` 형식 문자열로 반환한다.
 * 소수는 올림해 만료 전에 `0:00`이 표시되지 않게 하고, 음수와 유한하지 않은 값은 0으로 처리한다.
 * 디자인은 10분 미만을 기준으로 하며, 그 이상은 분 자릿수가 늘어난다.
 *
 * @param seconds - 남은 시간 (초)
 */
export const formatTimer = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const totalSeconds = Math.max(0, Math.ceil(safeSeconds));

  const minutes = Math.floor(totalSeconds / 60);
  const restSeconds = totalSeconds % 60;

  return `${minutes}:${String(restSeconds).padStart(2, "0")}`;
};
