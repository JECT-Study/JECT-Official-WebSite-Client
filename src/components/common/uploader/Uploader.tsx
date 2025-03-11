import clsx from 'clsx';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import { FileExtension } from '@/types/ui/file';

interface UploaderProps {
  onChangeFile: (file: FileList | null) => void;
  isDisabled: boolean;
  fileExtensions: FileExtension[];
}

function Uploader({ onChangeFile, isDisabled, fileExtensions }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>, isDragging: boolean) => {
    e.preventDefault();

    if (!isDisabled) setIsDragging(isDragging);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (!isDisabled) setIsDragging(false);
    if (files) onChangeFile(e.dataTransfer.files);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isDisabled) inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (isDisabled || !files?.length) return;
    if (files) onChangeFile(files);
  };

  return (
    <div
      onDragEnter={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDragOver={e => handleDrag(e, true)}
      onDrop={handleDrop}
      className={clsx(
        {
          'border-border-trans-assistive-dark cursor-no-drop': isDisabled,
          'border-accent-inverse-normal-dark bg-accent-trans-neutral-dark': isDragging,
          'border-border-trans-alternative-dark bg-surface-deep-dark': !isDragging,
        },
        'radius-sm gap-xl body-sm text-object-assistive-dark flex flex-col items-center border-2 border-dashed px-(--gap-7xl) py-(--gap-8xl) text-center whitespace-pre-wrap',
      )}
    >
      <label
        htmlFor='fileUpload'
        className={isDragging ? 'pointer-events-none' : isDisabled ? 'cursor-no-drop' : ''}
      >
        <BlockButton
          size='sm'
          style='solid'
          hierarchy='tertiary'
          onClick={handleClick}
          disabled={isDisabled}
          className={isDragging ? 'pointer-events-none' : ''}
          leftIcon={
            <Icon
              name='upload'
              size='xs'
              fillColor={`${isDisabled ? 'fill-object-disabled-dark' : 'fill-object-neutral-dark'}`}
            />
          }
        >
          파일 첨부하기
        </BlockButton>
      </label>
      {isDisabled
        ? '첨부할 수 있는 파일의 최대 용량에 도달했어요.'
        : `파일을 드래그 & 드롭하거나, 버튼을 눌러 첨부해주세요.\n 최대 100MB까지의 ${fileExtensions.join(', ')} 파일을 첨부할 수 있어요.`}
      <input
        ref={inputRef}
        id='fileUpload'
        type='file'
        className='hidden'
        multiple={true}
        onChange={handleChange}
      />
    </div>
  );
}

export default Uploader;
