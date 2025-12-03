import type { ReactNode } from "react";

export type ByteNumber = number;
export type UploadError = { type: UploadErrorType; file: File };

export type UploadErrorType = "FILE_TOO_LARGE" | "INVALID_TYPE" | "TOTAL_SIZE_EXCEEDED";

export interface UploaderOptions {
  accept?: string[];
  maxFileSize?: ByteNumber;
  maxTotalSize?: ByteNumber;
  existingFilesSize?: ByteNumber;
  files?: File[];
  onUpload?: (files: File[]) => void;
  onError?: (error: UploadError) => void;
}

export interface UploaderMessages {
  rest: ReactNode;
  loading: ReactNode;
  disabled: ReactNode;
}

export interface UploaderFileButtonProps {
  triggerUpload: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  uploadButton?: (triggerUpload: () => void) => ReactNode;
  cancelButton?: ReactNode;
  helperLabel?: ReactNode;
}

export interface UploaderFileProps
  extends UploaderOptions,
    Omit<UploaderFileButtonProps, "triggerUpload"> {
  multiple?: boolean;
  messages?: UploaderMessages;
}

export interface UploaderImageButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  uploadLabel?: string;
  loadingLabel?: string;
  cancelButton?: ReactNode;
}

export interface UploaderImageProps extends UploaderOptions, UploaderImageButtonProps {
  multiple?: boolean;
}

/* 스타일 */
export interface UploaderFileContainerDivProps {
  $isDisabled: boolean;
  $isLoading: boolean;
  $isDragging: boolean;
}

export interface UploaderImageContainerButtonProps {
  $isDisabled: boolean;
  $isLoading: boolean;
}

export interface UploaderImageIconProps {
  $isDisabled: boolean;
}

export interface UploaderImageLabelProps {
  $isDisabled: boolean;
}
