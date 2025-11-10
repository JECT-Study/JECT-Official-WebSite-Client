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
      disabled = false,
      hasError = false,
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

    return (
      <FileItemWrapButton
        ref={ref}
        as={Component}
        role={readonly ? 'button' : undefined}
        aria-disabled={disabled}
        $disabled={disabled}
        $readonly={readonly}
        $hasError={hasError}
        {...buttonRest}
      >
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            $readonly={readonly}
            $disabled={disabled}
            $hasError={hasError}
          />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $readonly={readonly}
              $disabled={disabled}
              $hasError={hasError}
              className='file-name'
            >
              {fileName}
            </FileItemLabel>
            <FileSizeLabel
              size='xs'
              textAlign='right'
              weight='subtle'
              $disabled={disabled}
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
