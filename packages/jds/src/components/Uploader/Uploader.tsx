import { useRef } from "react";

import {
  AddIcon,
  FileDropZoneDiv,
  FileSpan,
  FlexRowDiv,
  HiddenInput,
  ImageDropZoneButton,
  ImageLabel,
  LoadingIcon,
} from "./uploader.styles";
import type {
  UploaderFileButtonProps,
  UploaderFileProps,
  UploaderImageButtonProps,
  UploaderImageProps,
} from "./uploader.types";
import { useUploader } from "./useUploader";

const defaultMessages = {
  rest: (
    <>
      파일을 드래그&드롭하거나, 직접 선택해 업로드해주세요.
      <br /> 최대 100MB 이하의 PDF 파일을 업로드할 수 있어요.
    </>
  ),
  loading: (
    <>
      파일을 업로드하고 있습니다. <br />
      잠시만 기다려주세요...
    </>
  ),
  disabled: <>가능한 최대 용량에 도달했어요.</>,
};

const CustomBorderSVG = () => {
  return (
    <svg>
      <rect />
    </svg>
  );
};

const UploaderFileButton = ({
  isLoading,
  isDisabled,
  triggerUpload,
  uploadButton,
  cancelButton,
  helperLabel,
}: UploaderFileButtonProps) => {
  if (isLoading && !isDisabled) {
    return (
      <>
        <LoadingIcon name="spinner" size="2xl" />
        <FlexRowDiv>
          {helperLabel}
          {cancelButton}
        </FlexRowDiv>
      </>
    );
  }

  return uploadButton ? uploadButton(triggerUpload) : <></>;
};

const UploaderFile = ({
  accept,
  multiple = true,
  maxFileSize,
  maxTotalSize,
  existingFilesSize,
  files: controlledFiles,
  onUpload,
  onError,
  isLoading = false,
  isDisabled = false,
  messages = defaultMessages,
  uploadButton,
  cancelButton,
  helperLabel,
}: UploaderFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  } = useUploader<HTMLDivElement>({
    accept,
    maxFileSize,
    maxTotalSize,
    existingFilesSize,
    files: controlledFiles,
    onUpload,
    onError,
  });
  const baseBodyText = isLoading ? messages.loading : messages.rest;
  const bodyText = isDisabled ? messages.disabled : baseBodyText;

  const triggerUpload = () => !isDisabled && !isLoading && inputRef.current?.click();

  return (
    <FileDropZoneDiv
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      $isDragging={isDragging}
      $isDisabled={isDisabled}
      $isLoading={isLoading}
    >
      <CustomBorderSVG />
      <FileSpan>{bodyText}</FileSpan>
      <UploaderFileButton
        triggerUpload={triggerUpload}
        isLoading={isLoading}
        isDisabled={isDisabled}
        uploadButton={uploadButton}
        cancelButton={cancelButton}
        helperLabel={helperLabel}
      />
      <HiddenInput
        ref={inputRef}
        type="file"
        accept={accept?.join(",")}
        multiple={multiple}
        onChange={handleInputChange}
      />
    </FileDropZoneDiv>
  );
};

UploaderFile.displayName = "Uploader.File";

const UploaderImageButton = ({
  isDisabled = false,
  isLoading = false,
  uploadLabel = "이미지 업로드",
  loadingLabel = "업로드 중...",
  cancelButton,
}: UploaderImageButtonProps) => {
  if (!isDisabled && isLoading) {
    return (
      <>
        <LoadingIcon name="spinner" size="xl" />
        <FlexRowDiv>
          <ImageLabel size="sm" textAlign="center" weight="normal" $isDisabled={isDisabled}>
            {loadingLabel}
          </ImageLabel>
          {cancelButton}
        </FlexRowDiv>
      </>
    );
  }

  return (
    <>
      <AddIcon name="add-line" size="xl" $isDisabled={isDisabled} />
      <ImageLabel size="sm" textAlign="center" weight="normal" $isDisabled={isDisabled}>
        {uploadLabel}
      </ImageLabel>
    </>
  );
};

const UploaderImage = ({
  accept,
  multiple = true,
  maxFileSize,
  maxTotalSize,
  existingFilesSize,
  files: controlledFiles,
  onUpload,
  onError,
  isLoading = false,
  isDisabled = false,
  uploadLabel,
  loadingLabel,
  cancelButton,
}: UploaderImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleInputChange } = useUploader({
    accept,
    maxFileSize,
    maxTotalSize,
    existingFilesSize,
    files: controlledFiles,
    onUpload,
    onError,
  });

  const handleClick = () => !isDisabled && !isLoading && inputRef.current?.click();

  return (
    <ImageDropZoneButton $isDisabled={isDisabled} $isLoading={isLoading} onClick={handleClick}>
      <CustomBorderSVG />
      <UploaderImageButton
        isDisabled={isDisabled}
        isLoading={isLoading}
        uploadLabel={uploadLabel}
        loadingLabel={loadingLabel}
        cancelButton={cancelButton}
      />
      <HiddenInput
        ref={inputRef}
        type="file"
        accept={accept?.join(",")}
        multiple={multiple}
        onChange={handleInputChange}
      />
    </ImageDropZoneButton>
  );
};

UploaderImage.displayName = "Uploader.Image";

export const Uploader = {
  File: UploaderFile,
  Image: UploaderImage,
};
