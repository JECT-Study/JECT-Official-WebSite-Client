import type { SegmentEditState, SegmentedInputRules } from "./useSegmentedInput";

export type DateSegmentKind = "year" | "month" | "day";

export interface DateSegments {
  year: number | null;
  /** 1–12 */
  month: number | null;
  day: number | null;
}

/** 자릿수를 다 채우기 전까지 이어 붙이는 숫자열 */
export interface PendingDigits {
  kind: DateSegmentKind;
  digits: string;
}

type DateEditState = SegmentEditState<DateSegmentKind, DateSegments, PendingDigits>;

const EMPTY_DATE_SEGMENTS: DateSegments = { year: null, month: null, day: null };

const KINDS = ["year", "month", "day"] as const;
const SEPARATOR = ".";

// 표시 문자열은 세그먼트를 순서대로 구분자로 이은 "YYYY.MM.DD"다.
// 세그먼트의 자릿수와 선택 범위는 emptyText의 길이에서 계산하므로 여기만 고치면 함께 바뀐다.
// 일의 max는 입력을 받아들이는 상한이다. 달마다 다른 마지막 날은 constrainDay가 맞춘다.
const SEGMENT_SPEC = {
  year: { min: 1, max: 9999, emptyText: "YYYY" },
  month: { min: 1, max: 12, emptyText: "MM" },
  day: { min: 1, max: 31, emptyText: "DD" },
} satisfies Record<DateSegmentKind, { min: number; max: number; emptyText: string }>;

// native input[type=date]의 value 규격
const DATE_VALUE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DATE_TEXT_PATTERN = /^(\d{4})\s*[.\-/년]\s*(\d{1,2})\s*[.\-/월]\s*(\d{1,2})\s*[.일]?$/;
const COMPACT_DATE_TEXT_PATTERN = /^(\d{4})(\d{2})(\d{2})$/;
const DIGIT_PATTERN = /^\d$/;
const SEPARATOR_PATTERN = /^[.\-/\s]$/;

const pad = (n: number, length: number) => String(n).padStart(length, "0");

const isWithin = (value: number, min: number, max: number) => min <= value && value <= max;

const getLength = (kind: DateSegmentKind) => SEGMENT_SPEC[kind].emptyText.length;

/** 표시 문자열에서 세그먼트가 차지하는 [start, end) 범위 */
const getRange = (kind: DateSegmentKind): [number, number] => {
  const start = KINDS.slice(0, KINDS.indexOf(kind)).reduce(
    (offset, previous) => offset + getLength(previous) + SEPARATOR.length,
    0,
  );

  return [start, start + getLength(kind)];
};

const withSegment = (
  segments: DateSegments,
  kind: DateSegmentKind,
  value: number | null,
): DateSegments => ({ ...segments, [kind]: value });

const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/** 연이나 월이 비어 있으면 가능한 가장 긴 달로 본다. */
const getDaysInMonth = (year: number | null, month: number | null) => {
  if (month == null) return 31;
  if (month === 2) return year == null || isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

/** 월은 12, 일은 그 달의 마지막 날 */
const getLastValue = (segments: DateSegments, kind: "month" | "day") =>
  kind === "month" ? SEGMENT_SPEC.month.max : getDaysInMonth(segments.year, segments.month);

/** 일이 그 달의 마지막 날을 넘으면 마지막 날로 맞춘다. 예: 2026.02.30 → 2026.02.28 */
const constrainDay = (segments: DateSegments): DateSegments => {
  const lastDay = getDaysInMonth(segments.year, segments.month);
  return segments.day != null && segments.day > lastDay ? { ...segments, day: lastDay } : segments;
};

/** 실제로 있는 날짜일 때만 세그먼트를 만든다. */
const toDateSegments = (year: number, month: number, day: number): DateSegments | null => {
  const { year: yearSpec, month: monthSpec, day: daySpec } = SEGMENT_SPEC;

  if (!isWithin(year, yearSpec.min, yearSpec.max)) return null;
  if (!isWithin(month, monthSpec.min, monthSpec.max)) return null;
  if (!isWithin(day, daySpec.min, getDaysInMonth(year, month))) return null;

  return { year, month, day };
};

const formatDateSegments = (segments: DateSegments, pending: PendingDigits | null) =>
  KINDS.map(kind => {
    if (pending?.kind === kind) return pending.digits.padStart(getLength(kind), "0");

    const value = segments[kind];
    return value == null ? SEGMENT_SPEC[kind].emptyText : pad(value, getLength(kind));
  }).join(SEPARATOR);

/** 세그먼트를 "YYYY-MM-DD" 값으로 바꾼다. 비어 있는 세그먼트가 있으면 빈 문자열이다. */
const toDateValue = ({ year, month, day }: DateSegments) => {
  if (year == null || month == null || day == null) return "";

  return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
};

const parseDateValue = (value: string) => {
  const match = DATE_VALUE_PATTERN.exec(value);
  if (match == null) return null;

  return toDateSegments(Number(match[1]), Number(match[2]), Number(match[3]));
};

/** "YYYY-MM-DD" 값을 로컬 자정의 Date로 바꾼다. 값이 비어 있거나 없는 날짜면 null이다. */
export const valueToDate = (value: string) => {
  const segments = parseDateValue(value);
  if (segments?.year == null || segments.month == null || segments.day == null) return null;

  // new Date(year, month, day)는 0~99년을 1900년대로 해석하므로 연도를 따로 지정한다.
  const date = new Date(0);
  date.setFullYear(segments.year, segments.month - 1, segments.day);
  date.setHours(0, 0, 0, 0);
  return date;
};

/** 로컬 시간대 기준으로 Date를 "YYYY-MM-DD" 값으로 바꾼다. null이면 빈 문자열이다. */
export const dateToValue = (date: Date | null) => {
  if (date == null) return "";

  return toDateValue({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
};

/** 붙여넣은 "2026.07.25", "2026-7-25", "2026년 7월 25일", "20260725" 같은 텍스트를 해석한다. */
const parseDateText = (text: string) => {
  const trimmed = text.trim();
  const match = DATE_TEXT_PATTERN.exec(trimmed) ?? COMPACT_DATE_TEXT_PATTERN.exec(trimmed);
  if (match == null) return null;

  return toDateSegments(Number(match[1]), Number(match[2]), Number(match[3]));
};

/**
 * 위아래 방향키 증감.
 * 월과 일은 범위 끝에서 반대쪽 끝으로 넘어가고, 빈 세그먼트는 첫 값이나 마지막 값으로 채운다.
 * 연은 범위 끝에서 멈추고, 비어 있으면 올해로 채운다.
 */
const stepDateSegment = (segments: DateSegments, kind: DateSegmentKind, delta: 1 | -1) => {
  const current = segments[kind];

  if (kind === "year") {
    const { min, max } = SEGMENT_SPEC.year;
    const year =
      current == null ? new Date().getFullYear() : Math.min(Math.max(current + delta, min), max);
    return constrainDay(withSegment(segments, kind, year));
  }

  const last = getLastValue(segments, kind);
  if (current == null) return constrainDay(withSegment(segments, kind, delta > 0 ? 1 : last));

  // 1부터 last까지를 순환한다.
  const next = ((current - 1 + delta + last) % last) + 1;
  return constrainDay(withSegment(segments, kind, next));
};

/** 연은 첫 값과 마지막 값이 의미가 없으므로 바꾸지 않는다. */
const setDateSegmentToEdge = (
  segments: DateSegments,
  kind: DateSegmentKind,
  edge: "first" | "last",
) => {
  if (kind === "year") return segments;

  const value = edge === "first" ? SEGMENT_SPEC[kind].min : getLastValue(segments, kind);
  return constrainDay(withSegment(segments, kind, value));
};

const clearDateSegment = (segments: DateSegments, kind: DateSegmentKind) =>
  segments[kind] == null ? null : withSegment(segments, kind, null);

/**
 * 숫자 입력을 누적한다.
 * 자릿수를 다 채우면 확정하고 다음 세그먼트로 넘어간다. 숫자를 더 붙일 수 없으면(예: 월의 3, 일의 7) 곧바로 넘어간다.
 * 이어 붙인 값이 범위를 벗어나면 마지막 숫자를 새 첫 자리로 본다.
 */
const inputDigit = (
  segments: DateSegments,
  kind: DateSegmentKind,
  digit: string,
  pending: PendingDigits | null,
): { segments: DateSegments; pending: PendingDigits | null; advance: boolean } => {
  const { min, max } = SEGMENT_SPEC[kind];
  const length = getLength(kind);

  const appended = (pending?.kind === kind ? pending.digits : "") + digit;
  const isOverMax = Number(appended) > max;
  // 예: 월의 "00"
  const isFilledBelowMin = appended.length === length && Number(appended) < min;
  const digits = isOverMax || isFilledBelowMin ? digit : appended;

  const value = Number(digits);
  const hasRoomForMoreDigits = digits.length < length && value * 10 <= max;

  return {
    segments: constrainDay(withSegment(segments, kind, value >= min ? value : null)),
    pending: hasRoomForMoreDigits ? { kind, digits } : null,
    advance: !hasRoomForMoreDigits,
  };
};

/**
 * 글자 하나를 편집 상태에 적용한다.
 * 숫자는 현재 세그먼트에 누적한다. 구분자는 입력 중인 세그먼트를 확정하고 다음 세그먼트로 넘어간다.
 * 그래서 "2026.7.25"처럼 구분자를 포함해 입력해도 된다. 그 외 문자는 받아들이지 않는다.
 */
const applyCharacter = (state: DateEditState, char: string): DateEditState | null => {
  const index = KINDS.indexOf(state.active);
  const nextKind = KINDS[Math.min(index + 1, KINDS.length - 1)];

  if (SEPARATOR_PATTERN.test(char)) {
    return state.pending == null ? null : { ...state, active: nextKind, pending: null };
  }

  if (!DIGIT_PATTERN.test(char)) return null;

  const result = inputDigit(state.segments, state.active, char, state.pending);

  return {
    segments: result.segments,
    pending: result.pending,
    active: result.advance ? nextKind : state.active,
  };
};

export const DATE_SEGMENT_RULES: SegmentedInputRules<DateSegmentKind, DateSegments, PendingDigits> =
  {
    kinds: KINDS,
    empty: EMPTY_DATE_SEGMENTS,
    getRange,
    format: formatDateSegments,
    hasInput: (segments, pending) =>
      segments.year != null || segments.month != null || segments.day != null || pending != null,
    parseValue: parseDateValue,
    toValue: toDateValue,
    parseText: parseDateText,
    applyCharacter,
    clear: clearDateSegment,
    step: stepDateSegment,
    setToEdge: setDateSegmentToEdge,
  };

export const DATE_PLACEHOLDER = formatDateSegments(EMPTY_DATE_SEGMENTS, null);
