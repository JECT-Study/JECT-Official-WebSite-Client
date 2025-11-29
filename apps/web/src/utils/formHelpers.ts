import type { FormEvent } from "react";
import type { FieldValues, UseFormHandleSubmit } from "react-hook-form";

/**
 * React Hook Form의 handleSubmit과 커스텀 onSubmit 핸들러를 결합하는 유틸리티 함수
 *
 * @param handleSubmit React Hook Form의 handleSubmit 함수
 * @param onSubmit 폼 데이터 처리 콜백 함수
 * @returns 폼 제출 이벤트 핸들러
 */
export function CreateSubmitHandler<TFieldValues extends FieldValues, TSubmitData>(
  handleSubmit: UseFormHandleSubmit<TFieldValues>,
  onSubmit: (data: TSubmitData) => void,
): (e: FormEvent<HTMLFormElement>) => void {
  return (e: FormEvent<HTMLFormElement>) => {
    void handleSubmit((formData: TFieldValues) => {
      onSubmit(formData as unknown as TSubmitData);
    })(e);
  };
}
