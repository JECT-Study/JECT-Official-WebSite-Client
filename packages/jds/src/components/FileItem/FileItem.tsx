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

import { getLabelClassName } from "@/utils/typography";

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
      onRemove,
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
              className={`${getLabelClassName({ size: "sm", weight: "subtle" })} file-name`}
              $disabled={disabled}
              $readonly={readonly}
              $hasError={hasError}
            >
              {fileName}
            </FileItemLabel>
            <FileSizeLabel
              className={getLabelClassName({ size: "xs", textAlign: "right", weight: "subtle" })}
              $disabled={disabled}
              $hasError={hasError}
            >
              {fileSize}
            </FileSizeLabel>
            {!readonly && removeable && (
              <IconButton hierarchy='tertiary' size='lg' icon='close-line' onClick={onRemove} />
            )}
          </FileItemDataContainer>
        </FileItemSectionDiv>
        {hasError && errorMessage && <FileErrorSpan role='alert'>{errorMessage}</FileErrorSpan>}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = "FileItem";
