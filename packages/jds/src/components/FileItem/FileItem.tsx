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

export const FileItem = forwardRef<HTMLButtonElement, FileItemProps>(
  (
    {
      fileName,
      fileSize,
      readonly = false,
      disabled = false,
      hasError = false,
      errorMessage,
      suffixButton,
      ...buttonRest
    },
    ref,
  ) => {
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
            {suffixButton}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {hasError && errorMessage && <FileErrorSpan role='alert'>{errorMessage}</FileErrorSpan>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = "FileItem";
