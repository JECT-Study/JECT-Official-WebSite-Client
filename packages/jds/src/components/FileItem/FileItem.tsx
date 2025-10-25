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
    const closeButton = !readonly && buttonProps && (
      <IconButton.Basic hierarchy='tertiary' size='lg' icon='close-line' {...buttonProps} />
    );
    const hasError = !!errorMessage;

    return (
      <FileItemWrapButton
        as={Component}
        role={readonly ? 'button' : undefined}
        aria-disabled={isDownloadDisabled}
        ref={ref}
        $isDownloadDisabled={isDownloadDisabled}
        $readonly={readonly}
        $hasError={hasError}
        {...buttonRest}
      >
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            $readonly={readonly}
            $isDownloadDisabled={isDownloadDisabled}
            $hasError={hasError}
          />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $readonly={readonly}
              $isDownloadDisabled={isDownloadDisabled}
              $hasError={hasError}
              className='file-name'
            >
              {fileName}
            </FileItemLabel>
            <FileSizeLabel
              size='xs'
              textAlign='right'
              weight='subtle'
              $isDownloadDisabled={isDownloadDisabled}
              $hasError={hasError}
            >
              {fileSize}
            </FileSizeLabel>
            {closeButton}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {hasError && <FileErrorSpan role='alert'>{errorMessage}</FileErrorSpan>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = 'FileItem';
