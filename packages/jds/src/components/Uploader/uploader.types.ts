export type ByteNumber = number;
export type UploadError = { type: UploadErrorType; file: File };

export type UploadErrorType = 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'TOTAL_SIZE_EXCEEDED';

export interface UseUploaderOptions {
  accept?: string[];
  maxFileSize?: ByteNumber;
  maxTotalSize?: ByteNumber;
  existingFilesSize?: ByteNumber;
  onUpload?: (files: File[]) => void;
  onError?: (error: UploadError) => void;
}

export interface UploaderFileProps extends UseUploaderOptions {
  isLoading?: boolean;
  isDisabled?: boolean;
  onCancel?: () => void;
  onIssue?: () => void;
  multiple?: boolean;
}

export interface UploaderImageProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface UploaderFileButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
  onCancel?: () => void;
  onIssue?: () => void;
}

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
