import type {
  SegmentEdge,
  SegmentEditState,
  SegmentRange,
  SegmentStep,
  SegmentedInputRules,
} from "./useSegmentedInput";
import type { TimeStep, TimeValue } from "../TimePicker";

export type TimeSegmentKind = "meridiem" | "hour" | "minute";

type Meridiem = "am" | "pm";

export interface TimeSegments {
  /** 고르지 않았으면 null이다. 표시와 값 계산에서는 오전으로 본다. */
  meridiem: Meridiem | null;
  /** 1~12. 편집 중에는 24 같은 유효하지 않은 숫자도 보존한다. */
  hour: number | null;
  /** 0~59. 편집 중에는 60 이상의 숫자도 보존한다. */
  minute: number | null;
}

/** 자릿수를 다 채우기 전까지 이어 붙이는 숫자열 */
export interface PendingDigits {
  kind: "hour" | "minute";
  digits: string;
}

type TimeEditState = SegmentEditState<TimeSegmentKind, TimeSegments, PendingDigits>;

interface DigitInputResult {
  segments: TimeSegments;
  pending: PendingDigits | null;
  /** 세그먼트 입력이 확정되어 다음 세그먼트로 넘어가야 하는지 여부 */
  isComplete: boolean;
}

const EMPTY_TIME_SEGMENTS: TimeSegments = { meridiem: null, hour: null, minute: null };

const KINDS = ["meridiem", "hour", "minute"] as const;

const MERIDIEM_TEXT = { am: "오전", pm: "오후" } as const satisfies Record<Meridiem, string>;
const EMPTY_DIGITS_TEXT = "--";

// 표시 문자열은 "오전 09:30"이다. 오전, 오후는 두 글자라 세그먼트 위치가 고정된다.
const SEGMENT_RANGES = {
  meridiem: [0, 2],
  hour: [3, 5],
  minute: [6, 8],
} as const satisfies Record<TimeSegmentKind, SegmentRange>;

const DIGIT_LENGTH = 2;
// 한 자리 입력을 바로 확정할지 판단하는 기준. 시는 24시간제 입력까지 받는다.
const TYPED_MAX = { hour: 23, minute: 59 } as const;

const HOURS_PER_HALF_DAY = 12;
const MINUTES_PER_HOUR = 60;
// 시 세그먼트의 증감 순서. TimePicker의 시 열과 같다.
const HOUR_CYCLE = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

// native input[type=time]의 value 규격
const TIME_VALUE_PATTERN = /^(\d{2}):(\d{2})$/;
const MERIDIEM_TIME_TEXT_PATTERN = /^(오전|오후)\s*(\d{1,2})\s*[:시]\s*(\d{1,2})\s*분?$/;
const TIME_TEXT_PATTERN = /^(\d{1,2})\s*[:시]\s*(\d{1,2})\s*분?$/;
const COMPACT_TIME_TEXT_PATTERN = /^(\d{1,2})(\d{2})$/;
const DIGIT_PATTERN = /^\d$/;
const SEPARATOR_PATTERN = /^[:.\s]$/;
const AM_CHARACTER_PATTERN = /^[aA전]$/;
const PM_CHARACTER_PATTERN = /^[pP후]$/;

const pad = (value: number) => String(value).padStart(DIGIT_LENGTH, "0");

const isWithin = (value: number, min: number, max: number) => min <= value && value <= max;

/** 분 간격에 맞는 마지막 분. 간격 5면 55다. */
const getLastMinute = (minuteStep: TimeStep) =>
  Math.floor((MINUTES_PER_HOUR - 1) / minuteStep) * minuteStep;

/**
 * 입력한 시를 세그먼트에 반영한다.
 * 0과 13~23은 24시간제로 보고 오전, 오후를 함께 정한다.
 * 1~12는 오전, 오후를 이미 골랐다면 그대로 두고, 고르지 않았다면 24시간제로 보아 12만 오후로 정한다.
 * 24 이상은 보정하지 않고 보존하여 검증에서 오류를 알린다.
 */
const withTypedHour = (segments: TimeSegments, hour: number): TimeSegments => {
  if (hour === 0) return { ...segments, meridiem: "am", hour: HOURS_PER_HALF_DAY };
  if (isWithin(hour, 13, 23)) return { ...segments, meridiem: "pm", hour: hour - 12 };
  if (hour === HOURS_PER_HALF_DAY && segments.meridiem === null) {
    return { ...segments, meridiem: "pm", hour };
  }

  return { ...segments, hour };
};

const withTypedValue = (
  segments: TimeSegments,
  kind: PendingDigits["kind"],
  value: number,
): TimeSegments =>
  kind === "hour" ? withTypedHour(segments, value) : { ...segments, minute: value };

const formatDigits = (
  kind: PendingDigits["kind"],
  value: number | null,
  pending: PendingDigits | null,
) => {
  if (pending?.kind === kind) return pending.digits.padStart(DIGIT_LENGTH, "0");

  return value === null ? EMPTY_DIGITS_TEXT : pad(value);
};

const formatTimeSegments = (segments: TimeSegments, pending: PendingDigits | null): string => {
  const meridiem = MERIDIEM_TEXT[segments.meridiem ?? "am"];
  const hour = formatDigits("hour", segments.hour, pending);
  const minute = formatDigits("minute", segments.minute, pending);

  return `${meridiem} ${hour}:${minute}`;
};

/** 세그먼트를 "HH:mm" 값으로 바꾼다. 비어 있거나 없는 시각이면 빈 문자열이다. */
const toTimeValue = ({ meridiem, hour, minute }: TimeSegments): string => {
  if (hour === null || minute === null) return "";
  if (!isWithin(hour, 1, HOURS_PER_HALF_DAY) || !isWithin(minute, 0, MINUTES_PER_HOUR - 1)) {
    return "";
  }

  const hour24 = (hour % HOURS_PER_HALF_DAY) + (meridiem === "pm" ? HOURS_PER_HALF_DAY : 0);
  return `${pad(hour24)}:${pad(minute)}`;
};

const toSegmentsFrom24Hour = (hour: number, minute: number): TimeSegments | null => {
  if (!isWithin(hour, 0, 23) || !isWithin(minute, 0, MINUTES_PER_HOUR - 1)) return null;

  return {
    meridiem: hour < HOURS_PER_HALF_DAY ? "am" : "pm",
    hour: hour % HOURS_PER_HALF_DAY || HOURS_PER_HALF_DAY,
    minute,
  };
};

const parseTimeValue = (value: string): TimeSegments | null => {
  const match = TIME_VALUE_PATTERN.exec(value);
  if (match === null) return null;

  return toSegmentsFrom24Hour(Number(match[1]), Number(match[2]));
};

/** 표시와 제출에서 같은 검증 결과를 사용한다. 해석할 수 없는 값은 빈 문자열이다. */
export const normalizeTimeValue = (value: string): string => {
  const segments = parseTimeValue(value);
  return segments === null ? "" : toTimeValue(segments);
};

/** "HH:mm" 값을 TimePicker의 시각으로 바꾼다. 값이 비어 있거나 없는 시각이면 null이다. */
export const valueToTime = (value: string): TimeValue | null => {
  const match = TIME_VALUE_PATTERN.exec(normalizeTimeValue(value));
  if (match === null) return null;

  return { hour: Number(match[1]), minute: Number(match[2]), second: 0 };
};

/** TimePicker의 시각을 "HH:mm" 값으로 바꾼다. 초는 버린다. null이면 빈 문자열이다. */
export const timeToValue = (time: TimeValue | null): string => {
  if (time === null) return "";

  return `${pad(time.hour)}:${pad(time.minute)}`;
};

/**
 * 붙여넣은 "오후 9:30", "오후 9시 30분", "21:30", "2130", "930" 같은 텍스트를 해석한다.
 * 오전, 오후가 없으면 24시간제로 본다. 숫자는 보정하지 않고 보존하여 검증에서 오류를 알린다.
 */
const parseTimeText = (text: string): TimeSegments | null => {
  const trimmed = text.trim();

  // 오전, 오후를 적었다면 12시간제 숫자로 보고 그대로 둔다. "오전 13:00"은 검증에서 오류가 된다.
  const meridiemMatch = MERIDIEM_TIME_TEXT_PATTERN.exec(trimmed);
  if (meridiemMatch !== null) {
    return {
      meridiem: meridiemMatch[1] === "오전" ? "am" : "pm",
      hour: Number(meridiemMatch[2]),
      minute: Number(meridiemMatch[3]),
    };
  }

  const match = TIME_TEXT_PATTERN.exec(trimmed) ?? COMPACT_TIME_TEXT_PATTERN.exec(trimmed);
  if (match === null) return null;

  return withTypedHour({ ...EMPTY_TIME_SEGMENTS, minute: Number(match[2]) }, Number(match[1]));
};

/**
 * 숫자 입력을 누적한다.
 * 자릿수를 다 채우면 확정하고 다음 세그먼트로 넘어간다. 숫자를 더 붙일 수 없으면(예: 시의 3, 분의 7) 곧바로 넘어간다.
 */
const inputDigit = (
  segments: TimeSegments,
  kind: PendingDigits["kind"],
  digit: string,
  pending: PendingDigits | null,
): DigitInputResult => {
  const digits = (pending?.kind === kind ? pending.digits : "") + digit;
  const value = Number(digits);
  const hasRoomForMoreDigits = digits.length < DIGIT_LENGTH && value * 10 <= TYPED_MAX[kind];

  return {
    segments: hasRoomForMoreDigits ? segments : withTypedValue(segments, kind, value),
    pending: hasRoomForMoreDigits ? { kind, digits } : null,
    isComplete: !hasRoomForMoreDigits,
  };
};

/** 세그먼트 이동이나 blur로 숫자 입력을 끝낸다. */
const finalizeTimeSegment = (segments: TimeSegments, pending: PendingDigits | null) => {
  if (pending === null) return segments;

  return withTypedValue(segments, pending.kind, Number(pending.digits));
};

const getMeridiemFromCharacter = (char: string): Meridiem | null => {
  if (AM_CHARACTER_PATTERN.test(char)) return "am";
  if (PM_CHARACTER_PATTERN.test(char)) return "pm";
  return null;
};

/**
 * 글자 하나를 편집 상태에 적용한다.
 * - 숫자는 현재 세그먼트에 누적한다. 오전, 오후 세그먼트에서 입력하면 시부터 채운다.
 * - a, p 또는 한글 조합으로 끝나는 "전", "후"는 오전, 오후를 정한다.
 * - 구분자(":", ".", 공백)는 입력 중인 세그먼트를 확정하고 다음 세그먼트로 넘어간다.
 * 그 외 문자는 받아들이지 않는다.
 */
const applyCharacter = (state: TimeEditState, char: string): TimeEditState | null => {
  const index = KINDS.indexOf(state.active);
  const nextKind = KINDS[Math.min(index + 1, KINDS.length - 1)];

  const meridiem = getMeridiemFromCharacter(char);
  if (meridiem !== null) {
    return {
      segments: { ...finalizeTimeSegment(state.segments, state.pending), meridiem },
      active: state.active === "meridiem" ? "hour" : state.active,
      pending: null,
    };
  }

  if (SEPARATOR_PATTERN.test(char)) {
    if (state.pending !== null) {
      return {
        segments: finalizeTimeSegment(state.segments, state.pending),
        active: nextKind,
        pending: null,
      };
    }

    return state.active === "meridiem" ? { ...state, active: "hour" } : null;
  }

  if (!DIGIT_PATTERN.test(char)) return null;

  const kind = state.active === "meridiem" ? "hour" : state.active;
  const result = inputDigit(state.segments, kind, char, state.pending);

  return {
    segments: result.segments,
    pending: result.pending,
    active: result.isComplete ? KINDS[Math.min(KINDS.indexOf(kind) + 1, KINDS.length - 1)] : kind,
  };
};

const stepHour = (hour: number | null, delta: SegmentStep): number => {
  if (hour === null) return delta > 0 ? HOUR_CYCLE[0] : HOUR_CYCLE[HOUR_CYCLE.length - 1];

  const index = hour % HOURS_PER_HALF_DAY;
  return HOUR_CYCLE[(index + delta + HOUR_CYCLE.length) % HOUR_CYCLE.length];
};

/** 분은 간격 단위로 증감한다. 간격에 맞지 않는 분은 가까운 간격 값으로 옮긴다. */
const stepMinute = (minute: number | null, delta: SegmentStep, minuteStep: TimeStep): number => {
  const lastMinute = getLastMinute(minuteStep);
  if (minute === null) return delta > 0 ? 0 : lastMinute;

  if (delta > 0) {
    const next = Math.floor(minute / minuteStep) * minuteStep + minuteStep;
    return next > lastMinute ? 0 : next;
  }

  const previous = Math.ceil(minute / minuteStep) * minuteStep - minuteStep;
  if (previous < 0) return lastMinute;
  return Math.min(previous, lastMinute);
};

/**
 * 위아래 방향키 증감. 모든 세그먼트가 끝에서 반대쪽 끝으로 순환한다.
 * 빈 세그먼트는 첫 값이나 마지막 값으로 채운다. 시가 12와 11 사이를 넘어가도 오전, 오후는 바꾸지 않는다.
 */
const stepTimeSegment = (
  segments: TimeSegments,
  kind: TimeSegmentKind,
  delta: SegmentStep,
  minuteStep: TimeStep,
): TimeSegments => {
  switch (kind) {
    case "meridiem": {
      if (segments.meridiem === null) return { ...segments, meridiem: delta > 0 ? "am" : "pm" };
      return { ...segments, meridiem: segments.meridiem === "am" ? "pm" : "am" };
    }
    case "hour":
      return { ...segments, hour: stepHour(segments.hour, delta) };
    default:
      return { ...segments, minute: stepMinute(segments.minute, delta, minuteStep) };
  }
};

const setTimeSegmentToEdge = (
  segments: TimeSegments,
  kind: TimeSegmentKind,
  edge: SegmentEdge,
  minuteStep: TimeStep,
): TimeSegments => {
  const isFirst = edge === "first";

  switch (kind) {
    case "meridiem":
      return { ...segments, meridiem: isFirst ? "am" : "pm" };
    case "hour":
      return { ...segments, hour: isFirst ? HOUR_CYCLE[0] : HOUR_CYCLE[HOUR_CYCLE.length - 1] };
    default:
      return { ...segments, minute: isFirst ? 0 : getLastMinute(minuteStep) };
  }
};

const clearTimeSegment = (segments: TimeSegments, kind: TimeSegmentKind): TimeSegments | null =>
  segments[kind] === null ? null : { ...segments, [kind]: null };

/** 분 증감 간격에 맞춘 편집 규칙을 만든다. 간격이 바뀔 때만 새로 만든다. */
export const createTimeSegmentRules = (
  minuteStep: TimeStep,
): SegmentedInputRules<TimeSegmentKind, TimeSegments, PendingDigits> => ({
  kinds: KINDS,
  empty: EMPTY_TIME_SEGMENTS,
  getRange: kind => SEGMENT_RANGES[kind],
  format: formatTimeSegments,
  hasInput: (segments, pending) =>
    segments.meridiem !== null ||
    segments.hour !== null ||
    segments.minute !== null ||
    pending !== null,
  isComplete: segments => segments.hour !== null && segments.minute !== null,
  parseValue: parseTimeValue,
  toValue: toTimeValue,
  parseText: parseTimeText,
  applyCharacter,
  finalize: finalizeTimeSegment,
  clear: clearTimeSegment,
  step: (segments, kind, delta) => stepTimeSegment(segments, kind, delta, minuteStep),
  setToEdge: (segments, kind, edge) => setTimeSegmentToEdge(segments, kind, edge, minuteStep),
});

export const TIME_PLACEHOLDER = formatTimeSegments(EMPTY_TIME_SEGMENTS, null);
