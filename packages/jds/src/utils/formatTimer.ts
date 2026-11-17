/**
 * 남은 시간(초)을 0 이상의 정수로 정규화한 뒤 분과 초로 나눈다.
 * 소수는 올림해 만료 전에 0초가 되지 않게 하고, 음수와 유한하지 않은 값은 0으로 처리한다.
 */
const splitTimer = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const totalSeconds = Math.max(0, Math.ceil(safeSeconds));

  return { minutes: Math.floor(totalSeconds / 60), restSeconds: totalSeconds % 60 };
};

/**
 * @description 남은 시간(초)을 `m:ss` 형식 문자열로 반환한다.
 * 소수는 올림해 만료 전에 `0:00`이 표시되지 않게 하고, 음수와 유한하지 않은 값은 0으로 처리한다.
 * 디자인은 10분 미만을 기준으로 하며, 그 이상은 분 자릿수가 늘어난다.
 *
 * @param seconds - 남은 시간 (초)
 */
export const formatTimer = (seconds: number) => {
  const { minutes, restSeconds } = splitTimer(seconds);

  return `${minutes}:${String(restSeconds).padStart(2, "0")}`;
};

/**
 * @description 남은 시간(초)을 스크린 리더가 읽을 `n분 n초` 형식 문자열로 반환한다.
 * `formatTimer`와 같은 규칙으로 정규화하고, 0인 단위는 생략한다. 남은 시간이 없으면 `0초`를 반환한다.
 *
 * @param seconds - 남은 시간 (초)
 */
export const formatTimerLabel = (seconds: number) => {
  const { minutes, restSeconds } = splitTimer(seconds);

  if (minutes === 0) return `${restSeconds}초`;
  if (restSeconds === 0) return `${minutes}분`;

  return `${minutes}분 ${restSeconds}초`;
};
