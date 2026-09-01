export type FieldStatus = "default" | "success" | "error";

/** 컨트롤이 보고하는 카운터 값. Field.Counter가 이 값을 렌더한다. */
export interface FieldCounterState {
  /** 현재 개수 (글자 수, 선택 개수 등) */
  current: number;
  /** 허용 최대 개수 */
  max: number;
}
