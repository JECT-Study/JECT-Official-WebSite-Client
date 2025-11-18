export type ByteNumber = number;
export type UploadError = { type: UploadErrorType; file: File };

export type UploadErrorType = 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'TOTAL_SIZE_EXCEEDED';

export interface UploaderOptions {
  accept?: string[];
  maxFileSize?: ByteNumber;
  maxTotalSize?: ByteNumber;
  existingFilesSize?: ByteNumber;
  onUpload?: (files: File[]) => void;
  onError?: (error: UploadError) => void;
  files?: File[];
}

export interface UploaderMessages {
  rest: React.ReactNode;
  loading: React.ReactNode;
  disabled: React.ReactNode;
}

export interface UploaderFileProps extends UploaderOptions {
  isLoading?: boolean;
  isDisabled?: boolean;
  onCancel?: () => void;
  onIssue?: () => void;
  multiple?: boolean;
  messages?: UploaderMessages;
}

export interface UploaderFileButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
  onCancel?: () => void;
  onIssue?: () => void;
}

export interface UploaderImageProps extends UploaderOptions {
  isLoading?: boolean;
  isDisabled?: boolean;
  onCancel?: () => void;
  onIssue?: () => void;
  multiple?: boolean;
}

export interface UploaderImageButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  onCancel?: () => void;
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
