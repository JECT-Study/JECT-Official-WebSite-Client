import { forwardRef } from "react";

import {
  FileErrorSpan,
  FileItemDataContainer,
  FileItemIcon,
  FileItemLabel,
  FileItemSectionDiv,
  FileItemWrapButton,
  FileSizeLabel,
} from "./fileItem.styles";
import type { FileItemProps } from "./fileItem.types";
import { IconButton } from "../Button/IconButton";

export const FileItem = forwardRef<HTMLButtonElement, FileItemProps>(
  (
    {
      fileName,
      fileSize,
      readonly = false,
      disabled = false,
      hasError = false,
      errorMessage,
      removeable = false,
      removeOnClick,
      ...buttonRest
    },
    ref,
  ) => {
    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      removeOnClick?.();
    };
    return (
      <FileItemWrapButton
        ref={ref}
        as={readonly ? "div" : "button"}
        role={readonly ? "button" : undefined}
        aria-disabled={disabled}
        $disabled={disabled}
        $readonly={readonly}
        $hasError={hasError}
        {...buttonRest}
      >
        <FileItemSectionDiv>
          <FileItemIcon size='sm' name='attachment-line' />
          <FileItemDataContainer>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              $disabled={disabled}
              $readonly={readonly}
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
            {!readonly && removeable && <IconButton.Basic
              hierarchy='tertiary'
              size='lg'
              icon='close-line'
              onClick={handleRemoveClick}
            />}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {hasError && errorMessage && <FileErrorSpan role='alert'>{errorMessage}</FileErrorSpan>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = "FileItem";
