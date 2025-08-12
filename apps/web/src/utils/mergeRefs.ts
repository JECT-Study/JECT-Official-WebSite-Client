import { MutableRefObject, Ref } from 'react';

/**
 * 여러 개의 React ref를 하나로 병합하는 유틸리티 함수입니다.
 *
 * React에서는 `forwardRef` 또는 여러 ref를 동시에 사용할 때, 하나의 요소에 여러 ref를 연결할 방법이 필요합니다.
 * `mergeRefs`를 사용하면 여러 개의 ref를 하나의 요소에 연결할 수 있습니다.
 *
 * @template T - 연결할 요소의 타입 (예: HTMLDivElement, HTMLInputElement 등)
 * @param {...(React.Ref<T> | undefined)[]} refs - 병합할 여러 개의 ref (함수형 ref 또는 객체형 ref 가능)
 * @returns {(element: T | null) => void} - 주어진 `element`를 각 ref에 전달하는 함수
 *
 * @example
 * ```tsx
 * import React, { useRef, forwardRef } from 'react';
 * import { mergeRefs } from './utils';
 *
 * const Input = forwardRef<HTMLInputElement>((props, ref) => {
 *   const localRef = useRef<HTMLInputElement>(null);
 *   return <input ref={mergeRefs(ref, localRef)} {...props} />;
 * });
 * ```
 */
export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]) => {
  return (element: T | null) => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(element);
      } else if ('current' in ref) {
        (ref as MutableRefObject<T | null>).current = element;
      }
    });
  };
};
