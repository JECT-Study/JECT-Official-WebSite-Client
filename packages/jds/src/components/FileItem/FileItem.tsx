import { forwardRef } from 'react';
import {
  FileErrorP,
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
    { fileName, fileSize, readonly = false, disabled = false, errorMessage, buttonProps, ...rest },
    ref,
  ) => {
    const buttonPropsByState =
      readonly || disabled ? { ...buttonProps, onClick: () => {} } : buttonProps;

    return (
      <FileItemWrapButton
        ref={ref}
        $disabled={disabled}
        $readonly={readonly}
        hasError={!!errorMessage}
        {...rest}
      >
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            $readonly={readonly}
            $disabled={disabled}
            hasError={!!errorMessage}
          />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $readonly={readonly}
              $disabled={disabled}
              hasError={!!errorMessage}
              className='file-name'
            >
              {fileName}
            </FileItemLabel>
            <FileSizeLabel
              size='xs'
              textAlign='right'
              weight='subtle'
              $disabled={disabled}
              hasError={!!errorMessage}
            >
              {fileSize}
            </FileSizeLabel>
            {!readonly && buttonProps && (
              <IconButton.Basic
                hierarchy='tertiary'
                size='lg'
                icon='close-line'
                {...buttonPropsByState}
              />
            )}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {!!errorMessage && <FileErrorP>{errorMessage}</FileErrorP>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = 'FileItem';
