import { ComponentPropsWithoutRef, forwardRef } from 'react';
import {
  FileErrorP,
  FileItemDataContainer,
  FileItemIcon,
  FileItemLabel,
  FileItemSectionDiv,
  FileItemWrapButton,
  FileItemWrapDiv,
  FileSizeLabel,
} from './fileItem.styles';
import { Label } from '@/components';

interface FileItemProps extends ComponentPropsWithoutRef<'button'> {
  isRemovable: boolean;
  readonly: boolean;
  disabled: boolean;
  hasError: boolean;
}

export const FileItem = forwardRef<HTMLButtonElement, FileItemProps>(
  ({ isRemovable, readonly, disabled, hasError }, ref) => {
    return (
      <FileItemWrapButton disabled={disabled} hasError={hasError}>
        <FileItemSectionDiv>
          <FileItemIcon
            size='sm'
            name='attachment-line'
            isReadonly={readonly}
            isDisabled={disabled}
            hasError={hasError}
          />
          <FileItemDataContainer className='dataContainer'>
            <FileItemLabel
              size='sm'
              textAlign='left'
              weight='subtle'
              isReadonly={readonly}
              isDisabled={disabled}
              hasError={hasError}
            >
              파일명.pdf
            </FileItemLabel>
            <FileSizeLabel
              size='xs'
              textAlign='right'
              weight='subtle'
              isDisabled={disabled}
              hasError={hasError}
            >
              2.6MB
            </FileSizeLabel>
          </FileItemDataContainer>
        </FileItemSectionDiv>

        {hasError && (
          <FileErrorP>
            파일 업로드 시 에러 메시지에 대해 작성합니다. 최대 두 줄 까지 작성할 수 있고, 초과할 시
            말줄임(...) 표시합니다.
          </FileErrorP>
        )}
      </FileItemWrapButton>
    );
  },
);

FileItem.displayName = 'FileItem';
