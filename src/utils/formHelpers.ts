import { FormEvent } from 'react';

/**
 * React Hook Form의 handleSubmit 함수를 래핑하여 onSubmit 핸들러를 반환합니다.
 *
 * 이 헬퍼 함수는 폼 제출 시 기본 동작(e.preventDefault())을 막고,
 * 제공된 handleSubmit 함수에 onSubmit 핸들러를 전달하여 유효성 검사를 실행합니다.
 * 반환된 함수는 폼 요소의 onSubmit 속성에 사용할 수 있습니다.
 *
 * @template T - 폼 데이터의 타입.
 * @param {function((data: T) => void): (e: FormEvent<HTMLFormElement>) => Promise<void>} handleSubmitFn -
 *   React Hook Form에서 제공하는 handleSubmit 함수입니다.
 * @param {(data: T) => void} onSubmit -
 *   폼이 유효할 때 실행할 함수로, 검증된 데이터를 인자로 받습니다.
 * @returns {(e: FormEvent<HTMLFormElement>) => void} - 래핑된 폼 제출 이벤트 핸들러
 */

export const createSubmitHandler =
  <T>(
    handleSubmitFn: (
      onSubmit: (data: T) => void,
    ) => (e: FormEvent<HTMLFormElement>) => Promise<void>,
    onSubmit: (data: T) => void,
  ) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSubmitFn(onSubmit)(e);
  };
