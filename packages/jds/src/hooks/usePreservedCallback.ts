import { useCallback, useEffect, useRef } from "react";

/**
 * 반환된 함수의 참조는 고정하고, 실행할 콜백은 `useEffect`에서 최신 값으로 갱신한다.
 *
 * 타이머나 이벤트 리스너처럼 등록한 뒤 나중에 실행되는 자리에 콜백을 넘길 때 쓴다.
 * 리렌더로 `callback`이 바뀌어도 반환된 함수는 같으므로, effect의 의존성에 넣어도 effect가 다시 실행되지 않는다.
 * 반환된 함수는 타이머나 이벤트 핸들러처럼 effect 실행이 모두 끝난 뒤에 호출해야 한다.
 * 렌더 중이나 layout effect, 이 훅보다 앞에 선언된 effect, 자식 컴포넌트의 effect에서
 * ref 갱신 전에 호출하면 이전 렌더의 콜백이 실행될 수 있다.
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
