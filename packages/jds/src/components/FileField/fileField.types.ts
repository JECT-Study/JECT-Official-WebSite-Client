import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { FieldProps } from "../Field";

export type FileFieldProps = FieldProps;

/**
 * 필드가 표시에 사용하는 값. `File`이 구조적으로 이 타입에 해당하므로 그대로 전달할 수 있고,
 * 서버에 이미 존재하는 파일처럼 실제 데이터가 없으면 이름과 용량만 전달한다.
 */
export interface FileFieldValue {
  name: string;
  /** 파일 용량 (바이트) */
  size: number;
}

export type FileFieldErrorType = "INVALID_TYPE" | "FILE_TOO_LARGE";

export interface FileFieldError {
  type: FileFieldErrorType;
  file: File;
}

type FileFieldInputBaseProps = Omit<
  ComponentPropsWithoutRef<"input">,
  | "id"
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onError"
  | "required"
  | "multiple"
  | "aria-invalid"
> & {
  /** 필수 입력 여부. 레이블의 필수 표시와 스크린리더에 전달하는 상태 문구에 반영한다. */
  required?: boolean;
  /** 파일이 없을 때 표시하는 문구 */
  placeholder?: string;
  /** 허용할 최대 파일 용량 (바이트) */
  maxSize?: number;
  /** accept나 maxSize를 만족하지 않는 파일이 선택되면 호출된다. */
  onError?: (error: FileFieldError) => void;
  /** 삭제 버튼 오른쪽에 형제로 배치되는 부가 요소 */
  suffix?: ReactNode;
};

type FileFieldInputControlledProps = {
  value: FileFieldValue | null;
  defaultValue?: never;
  onChange: (file: File | null) => void;
};

type FileFieldInputUncontrolledProps = {
  value?: never;
  defaultValue?: FileFieldValue | null;
  onChange?: (file: File | null) => void;
};

export type FileFieldInputProps = FileFieldInputBaseProps &
  (FileFieldInputControlledProps | FileFieldInputUncontrolledProps);

export interface FileFieldSizeProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /** 용량 표기에 사용할 포매터. 기본값은 `formatFileSize` */
  sizeFormatter?: (bytes: number) => string;
}
