import { useCallback, useEffect, useRef } from "react";

/**
 * 참조는 고정하고, 호출하면 항상 최신 콜백을 실행하는 함수를 반환한다.
 *
 * 타이머나 이벤트 리스너처럼 등록한 뒤 나중에 실행되는 자리에 콜백을 넘길 때 쓴다.
 * 리렌더로 `callback`이 바뀌어도 반환된 함수는 같으므로, effect의 의존성에 넣어도 effect가 다시 실행되지 않는다.
 * 콜백은 effect에서 갱신되므로, 반환된 함수를 렌더 중이나 layout effect에서 호출하면 이전 렌더의 콜백이 실행된다.
 *
 * @param callback 호출 시점에 실행할 콜백
 * @returns 참조가 바뀌지 않는 함수
 */
export const usePreservedCallback = <TArguments extends unknown[], TResult>(
  callback: (...callbackArguments: TArguments) => TResult,
): ((...callbackArguments: TArguments) => TResult) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...callbackArguments: TArguments) => callbackRef.current(...callbackArguments),
    [],
  );
};
