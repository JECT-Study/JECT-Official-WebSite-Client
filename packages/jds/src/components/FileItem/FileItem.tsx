import { forwardRef } from 'react';
import {
  FileErrorSpan,
  FileItemDataContainer,
  FileItemIcon,
  FileItemLabel,
  FileItemSectionDiv,
  FileItemWrapButton,
  FileSizeLabel,
} from './fileItem.styles';
import { IconButton } from '../Button/IconButton';
import { FileItemProps } from './fileItem.types';

export const FileItem = forwardRef<HTMLButtonElement, FileItemProps>(
  (
    {
      fileName,
      fileSize,
      readonly = false,
      isDownloadDisabled = false,
      errorMessage,
      buttonProps,
      ...buttonRest
    },
    ref,
  ) => {
    const Component = readonly ? 'div' : 'button';

    return (
      <FileItemWrapButton
        as={Component}
        role={readonly ? 'button' : undefined}
        aria-disabled={isDownloadDisabled}
        ref={ref}
        $isDownloadDisabled={isDownloadDisabled}
        $readonly={readonly}
        $hasError={!!errorMessage}
        {...buttonRest}
      >
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            $readonly={readonly}
            $isDownloadDisabled={isDownloadDisabled}
            $hasError={!!errorMessage}
          />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $readonly={readonly}
              $isDownloadDisabled={isDownloadDisabled}
              $hasError={!!errorMessage}
              className='file-name'
              aria-label={`파일 이름: ${fileName}`}
            >
              {fileName}
            </FileItemLabel>
            <FileSizeLabel
              size='xs'
              textAlign='right'
              weight='subtle'
              $isDownloadDisabled={isDownloadDisabled}
              $hasError={!!errorMessage}
              aria-label={`파일 사이즈: ${fileSize}`}
            >
              {fileSize}
            </FileSizeLabel>
            {!readonly && buttonProps && (
              <IconButton.Basic hierarchy='tertiary' size='lg' icon='close-line' {...buttonProps} />
            )}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {!!errorMessage && <FileErrorSpan>{errorMessage}</FileErrorSpan>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = 'FileItem';
