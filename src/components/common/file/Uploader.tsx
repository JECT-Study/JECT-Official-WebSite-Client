import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import Icon from '@/components/common/icon/Icon';
import { checkFileType } from '@/utils/checkFileType';

interface UploaderProps {
  onChangeFile: (file: FileList | null) => void;
  isDisabled: boolean;
}

function Uploader({ onChangeFile, isDisabled }: UploaderProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer && e.dataTransfer.files) {
      if (checkFileType(e.dataTransfer.files, ['.pdf'])) {
        onChangeFile(e.dataTransfer.files);
      }
      // TODO: 옳지 않은 확장자 예외 처리
    }

    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChangeFile(e.target.files);
    }
  };

  return (
    <div
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${
        isDisabled
          ? 'border-border-trans-assistive-dark'
          : isDragging
            ? 'border-accent-inverse-normal-dark'
            : 'border-border-trans-alternative-dark'
      } ${isDragging ? 'bg-accent-trans-neutral-dark' : 'bg-surface-deep-dark'} radius-sm border-2 border-dashed p-(--gap-2xl)`}
    >
      <div className='gap-xl flex flex-col items-center px-(--gap-2xl) py-(--gap-4xl)'>
        <label htmlFor='fileUpload'>
          <BlockButton
            size='sm'
            style='solid'
            hierarchy='tertiary'
            onClick={() => inputRef.current?.click()}
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
        <p className='body-sm text-object-assistive-dark text-center'>
          {isDisabled ? (
            '첨부할 수 있는 파일의 최대 갯수에 도달했어요.'
          ) : (
            <>
              파일을 드래그 & 드롭하거나, 버튼을 눌러 첨부해주세요. <br /> 최대 -MB까지의 jpg, png,
              pdf 파일을 첨부할 수 있어요.
            </>
          )}
        </p>
        <input
          ref={inputRef}
          id='fileUpload'
          type='file'
          className='hidden'
          multiple={true}
          onChange={handleChange}
          accept='.pdf'
        />
      </div>
    </div>
  );
}

export default Uploader;
