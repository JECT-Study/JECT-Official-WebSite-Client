import {
  FORMAT_COLUMNS,
  HOURS_PER_DAY,
  HOURS_PER_HALF_DAY,
  MERIDIEM_LABELS,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
  TIME_COLUMN_KINDS,
  type TimeColumnKind,
} from "./timePicker.constants";
import type { TimePickerFormat, TimeStep, TimeValue } from "./timePicker.types";

/** 열 하나에 표시할 항목 */
export interface TimeColumnOption {
  value: number;
  label: string;
  disabled: boolean;
}

/** 열 항목을 만들고 선택을 반영할 때 필요한 공통 조건 */
export interface TimeColumnContext {
  /** 선택이 없으면 `minTime`, 그것도 없으면 자정 */
  base: TimeValue;
  format: TimePickerFormat;
  minuteStep: TimeStep;
  secondStep: TimeStep;
  minTime?: TimeValue;
  maxTime?: TimeValue;
}

interface CandidateUnits {
  hours: number[];
  minutes: number[];
  seconds: number[];
}

const range = (count: number, step = 1) => {
  return Array.from({ length: Math.ceil(count / step) }, (_, index) => index * step);
};

const padTwoDigits = (value: number) => {
  return String(value).padStart(2, "0");
};

const getRank = (kind: TimeColumnKind) => {
  return TIME_COLUMN_KINDS.indexOf(kind);
};

/** 하루 시작부터 지난 초 */
export const toSeconds = ({ hour, minute, second }: TimeValue) => {
  return (hour * MINUTES_PER_HOUR + minute) * SECONDS_PER_MINUTE + second;
};

export const isSameTime = (a: TimeValue | null, b: TimeValue | null) => {
  if (a == null || b == null) return a === b;

  return toSeconds(a) === toSeconds(b);
};

export const is12HourFormat = (format: TimePickerFormat) => {
  return format.startsWith("hh");
};

export const getColumnKinds = (format: TimePickerFormat): readonly TimeColumnKind[] => {
  return FORMAT_COLUMNS[format];
};

const isTimeInRange = (seconds: number, minTime?: TimeValue, maxTime?: TimeValue) => {
  if (minTime != null && seconds < toSeconds(minTime)) return false;
  if (maxTime != null && seconds > toSeconds(maxTime)) return false;

  return true;
};

/** 시각을 열의 항목 값으로 바꿉니다. 12시간제 시 열은 12시를 0으로 나타냅니다. */
export const getColumnValue = (time: TimeValue, kind: TimeColumnKind, format: TimePickerFormat) => {
  switch (kind) {
    case "meridiem":
      return time.hour < HOURS_PER_HALF_DAY ? 0 : 1;
    case "hour":
      return is12HourFormat(format) ? time.hour % HOURS_PER_HALF_DAY : time.hour;
    case "minute":
      return time.minute;
    default:
      return time.second;
  }
};

const applyColumnValue = (
  time: TimeValue,
  kind: TimeColumnKind,
  value: number,
  format: TimePickerFormat,
): TimeValue => {
  switch (kind) {
    case "meridiem":
      return { ...time, hour: (time.hour % HOURS_PER_HALF_DAY) + value * HOURS_PER_HALF_DAY };
    case "hour": {
      if (!is12HourFormat(format)) return { ...time, hour: value };

      const meridiemOffset = time.hour < HOURS_PER_HALF_DAY ? 0 : HOURS_PER_HALF_DAY;

      return { ...time, hour: meridiemOffset + value };
    }
    case "minute":
      return { ...time, minute: value };
    default:
      return { ...time, second: value };
  }
};

/**
 * @description 한 항목을 골랐을 때 만들어질 수 있는 시각의 단위별 후보
 *
 * @remarks
 * 고른 열보다 큰 단위는 고정하고, 작은 단위는 화면에 열이 있으면 목록 전체, 없으면 현재 값으로 둡니다.
 */
const getCandidateUnits = (
  resolved: TimeValue,
  kind: TimeColumnKind,
  context: TimeColumnContext,
): CandidateUnits => {
  const kinds = getColumnKinds(context.format);
  const isFree = (unit: TimeColumnKind) => {
    return getRank(unit) > getRank(kind) && kinds.includes(unit);
  };
  const meridiemOffset = resolved.hour < HOURS_PER_HALF_DAY ? 0 : HOURS_PER_HALF_DAY;

  return {
    hours: isFree("hour")
      ? range(HOURS_PER_HALF_DAY).map(hour => meridiemOffset + hour)
      : [resolved.hour],
    minutes: isFree("minute") ? range(MINUTES_PER_HOUR, context.minuteStep) : [resolved.minute],
    seconds: isFree("second") ? range(SECONDS_PER_MINUTE, context.secondStep) : [resolved.second],
  };
};

const findNearestValidTime = (
  target: TimeValue,
  { hours, minutes, seconds }: CandidateUnits,
  minTime?: TimeValue,
  maxTime?: TimeValue,
) => {
  const targetSeconds = toSeconds(target);
  let nearest: TimeValue | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const hour of hours) {
    for (const minute of minutes) {
      for (const second of seconds) {
        const candidate = { hour, minute, second };
        const candidateSeconds = toSeconds(candidate);
        const distance = Math.abs(candidateSeconds - targetSeconds);

        if (distance < nearestDistance && isTimeInRange(candidateSeconds, minTime, maxTime)) {
          nearest = candidate;
          nearestDistance = distance;
        }
      }
    }
  }

  return nearest;
};

const hasTimeRange = ({ minTime, maxTime }: TimeColumnContext) => {
  return minTime != null || maxTime != null;
};

/**
 * @description 열 항목을 골랐을 때 확정할 시각을 계산합니다.
 *
 * @remarks
 * 고른 결과가 `minTime`, `maxTime` 밖이면 고른 단위는 유지한 채 가장 가까운 유효 시각으로 맞춥니다. 맞출 시각이 없으면 `null`입니다.
 */
export const resolveColumnSelection = (
  kind: TimeColumnKind,
  value: number,
  context: TimeColumnContext,
) => {
  const resolved = applyColumnValue(context.base, kind, value, context.format);
  if (!hasTimeRange(context)) return resolved;

  return findNearestValidTime(
    resolved,
    getCandidateUnits(resolved, kind, context),
    context.minTime,
    context.maxTime,
  );
};

const getOptionValues = (kind: TimeColumnKind, context: TimeColumnContext) => {
  switch (kind) {
    case "meridiem":
      return range(MERIDIEM_LABELS.length);
    case "hour":
      return range(is12HourFormat(context.format) ? HOURS_PER_HALF_DAY : HOURS_PER_DAY);
    case "minute":
      return range(MINUTES_PER_HOUR, context.minuteStep);
    default:
      return range(SECONDS_PER_MINUTE, context.secondStep);
  }
};

const getOptionLabel = (kind: TimeColumnKind, value: number, format: TimePickerFormat) => {
  if (kind === "meridiem") return MERIDIEM_LABELS[value];
  if (kind === "hour" && is12HourFormat(format) && value === 0) {
    return String(HOURS_PER_HALF_DAY);
  }

  return padTwoDigits(value);
};

/** 열에 표시할 항목. 고르면 유효한 시각을 만들 수 없는 항목은 `disabled`입니다. */
export const getColumnOptions = (
  kind: TimeColumnKind,
  context: TimeColumnContext,
): TimeColumnOption[] => {
  return getOptionValues(kind, context).map(value => ({
    value,
    label: getOptionLabel(kind, value, context.format),
    disabled: resolveColumnSelection(kind, value, context) == null,
  }));
};
