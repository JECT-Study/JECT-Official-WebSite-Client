import { MouseEvent } from 'react';

import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import { FileUrl } from '@/types/file';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';

interface FileProps {
  file: FileUrl;
  isDisabled?: boolean;
  onDelete?: (id: number | string) => void;
}

// TODO: CDN URL 형식의 file일 경우, name, size 할당 수정

function File({ file, onDelete, isDisabled = false }: FileProps) {
  const openFile = () => {
    if (isDisabled || !file) return;

    const newWindow = window.open(file.url, '_blank', 'noopener,noreferrer');

    if (newWindow) newWindow.opener = null;
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete?.(file.id);
  };

  return (
    <button
      disabled={isDisabled}
      onClick={openFile}
      className={`${isDisabled ? '' : 'interaction-default-subtle transition-faster-fluent-hover'} bg-surface-embossed-dark radius-xs gap-md border-border-trans-assistive-dark flex items-center border px-(--gap-lg) py-(--gap-sm)`}
    >
      <Icon
        name='file'
        size='md'
        fillColor={isDisabled ? 'fill-object-disabled-dark' : 'fill-object-normal-dark'}
      />
      <div
        className={`${isDisabled ? 'text-object-disabled-dark' : 'text-object-normal-dark'} gap-6xs flex grow flex-col text-left`}
      >
        <span className='label-bold-md break-all'>{file.name}</span>
        <span className='body-xs'>{changeFileSizeUnit(file.size)}</span>
      </div>
      {onDelete && (
        <LabelButton
          size='lg'
          hierarchy='secondary'
          onClick={deleteHandler}
          leftIcon={<Icon name='clear' size='md' fillColor='fill-object-neutral-dark' />}
        />
      )}
    </button>
  );
}

export default File;
