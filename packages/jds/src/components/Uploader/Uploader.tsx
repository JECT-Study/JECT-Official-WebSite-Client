import { useState } from 'react';
import {
  FlexRowDiv,
  HelperLabel,
  UploaderFileContainerDiv,
  UploaderFileSpan,
  UploaderLoadingIcon,
} from './uploader.styles';
import { BlockButton, LabelButton } from 'components';
import { UploaderButtonProps, UploaderFileProps, UploaderState } from './uploader.types';

const uploaderMessages = {
  rest: (
    <>
      파일을 드래그&드롭하거나, 직접 선택해 업로드해주세요.
      <br /> 최대 100MB 이하의 PDF 파일을 업로드할 수 있어요.
    </>
  ),
  disabled: <>가능한 최대 용량에 도달했어요.</>,
};

const UploaderButton = ({ isLoading, isDisabled }: UploaderButtonProps) => {
  if (isLoading && !isDisabled) {
    return (
      <>
        <UploaderLoadingIcon name='spinner' size='2xl' />
        <FlexRowDiv>
          <HelperLabel size='xs' textAlign='center' weight='bold'>
            업로드에 문제가 있나요?
          </HelperLabel>
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
    <UploaderFileContainerDiv $isDisabled={isDisabled} $isLoading={isLoading} state={uploaderState}>
      <UploaderFileSpan>{bodyText}</UploaderFileSpan>
      <UploaderButton isLoading={isLoading} isDisabled={isDisabled} />
    </UploaderFileContainerDiv>
  );
};

UploaderFile.displayName = 'Uploader.File';

export const Uploader = {
  File: UploaderFile,
};
