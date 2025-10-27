import { useState } from 'react';
import {
  AddIcon,
  FileDropZoneDiv,
  FileHelperLabel,
  FileSpan,
  FlexRowDiv,
  ImageDropZoneButton,
  ImageLabel,
  LoadingIcon,
} from './uploader.styles';
import { BlockButton, LabelButton } from 'components';
import {
  UploaderButtonProps,
  UploaderFileProps,
  UploaderImageProps,
  UploaderState,
} from './uploader.types';

const uploaderMessages = {
  rest: (
    <>
      파일을 드래그&드롭하거나, 직접 선택해 업로드해주세요.
      <br /> 최대 100MB 이하의 PDF 파일을 업로드할 수 있어요.
    </>
  ),
  disabled: <>가능한 최대 용량에 도달했어요.</>,
};

const UploaderFileButton = ({ isLoading, isDisabled }: UploaderButtonProps) => {
  if (isLoading && !isDisabled) {
    return (
      <>
        <LoadingIcon name='spinner' size='2xl' />
        <FlexRowDiv>
          <FileHelperLabel size='xs' textAlign='center' weight='bold'>
            업로드에 문제가 있나요?
          </FileHelperLabel>
          <LabelButton.Basic
            hierarchy='tertiary'
            size='sm'
            prefixIcon='blank'
            suffixIcon='arrow-go-back-line'
            disabled={isDisabled}
          >
            업로드 취소
          </LabelButton.Basic>
        </FlexRowDiv>
      </>
    );
  }

  return (
    <BlockButton.Basic
      hierarchy='tertiary'
      size='sm'
      variant='outlined'
      prefixIcon='blank'
      suffixIcon='upload-2-line'
      disabled={isDisabled}
    >
      파일 업로드
    </BlockButton.Basic>
  );
};

const UploaderFile = ({ isLoading = false, isDisabled = true }: UploaderFileProps) => {
  const [uploaderState, useUploaderState] = useState<UploaderState>('rest');
  const bodyText = isDisabled ? uploaderMessages.disabled : uploaderMessages.rest;

  return (
    <FileDropZoneDiv $isDisabled={isDisabled} $isLoading={isLoading} state={uploaderState}>
      <FileSpan>{bodyText}</FileSpan>
      <UploaderFileButton isLoading={isLoading} isDisabled={isDisabled} />
    </FileDropZoneDiv>
  );
};

UploaderFile.displayName = 'Uploader.File';

export interface UploaderImageButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
}

const UploaderImageButton = ({ isDisabled, isLoading }: UploaderImageButtonProps) => {
  if (!isDisabled && isLoading) {
    return (
      <>
        <LoadingIcon name='spinner' size='xl' />
        <FlexRowDiv>
          <ImageLabel size='sm' textAlign='center' weight='normal' $isDisabled={isDisabled}>
            업로드 중...
          </ImageLabel>
          <LabelButton.Basic hierarchy='tertiary' size='xs' suffixIcon='arrow-go-back-line'>
            취소
          </LabelButton.Basic>
        </FlexRowDiv>
      </>
    );
  }

  return (
    <>
      <AddIcon name='add-line' size='xl' $isDisabled={isDisabled} />
      <ImageLabel size='sm' textAlign='center' weight='normal' $isDisabled={isDisabled}>
        이미지 업로드
      </ImageLabel>
    </>
  );
};

const UploaderImage = ({ isDisabled = false, isLoading = false }: UploaderImageProps) => {
  return (
    <ImageDropZoneButton $isDisabled={isDisabled} $isLoading={isLoading}>
      <UploaderImageButton isDisabled={isDisabled} isLoading={isLoading} />
    </ImageDropZoneButton>
  );
};

UploaderImage.displayName = 'Uploader.Image';

export const Uploader = {
  File: UploaderFile,
  Image: UploaderImage,
};
