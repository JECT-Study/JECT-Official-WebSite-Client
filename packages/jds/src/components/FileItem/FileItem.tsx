import { forwardRef } from 'react';
import {
  FileErrorDiv,
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
      downloadDisabled = false,
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
        ref={ref}
        $disabled={downloadDisabled}
        $readonly={readonly}
        $hasError={!!errorMessage}
        {...buttonRest}
      >
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            $readonly={readonly}
            $disabled={downloadDisabled}
            $hasError={!!errorMessage}
          />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $readonly={readonly}
              $disabled={downloadDisabled}
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
              $disabled={downloadDisabled}
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
        {!!errorMessage && <FileErrorDiv>{errorMessage}</FileErrorDiv>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = 'FileItem';
