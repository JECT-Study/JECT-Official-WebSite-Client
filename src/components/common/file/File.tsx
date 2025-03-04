import { MouseEvent } from 'react';

import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';

interface FileProps {
  id: number;
  file: File | string;
  isDisabled?: boolean;
  onDelete?: (id: number) => void;
}

// TODO: CDN URL 형식의 file일 경우, name, size 할당 수정

function File({ id, file, onDelete, isDisabled = false }: FileProps) {
  const name = typeof file === 'object' ? file.name : '임시.pdf';
  const size = typeof file === 'object' ? file.size : 0.0;

  const openFile = () => {
    if (isDisabled || !file) return;

    const newWindow = window.open(
      typeof file === 'object' ? URL.createObjectURL(file) : file,
      '_blank',
      'noopener,noreferrer',
    );
    if (newWindow) newWindow.opener = null;
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
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
        <span className='label-bold-md break-all'>{name}</span>
        <span className='body-xs'>{changeFileSizeUnit(size)}</span>
      </div>
      {onDelete && (
        <LabelButton
          size='lg'
          hierarchy='secondary'
          onClick={deleteHandler}
          leftIcon={<Icon name='clear' size='md' fillColor='fill-object-neutral-dark' />}
          className='z-40'
        />
      )}
    </button>
  );
}

export default File;
