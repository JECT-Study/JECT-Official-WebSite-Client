import LabelButton from '../common/button/LabelButton';
import Icon from '../common/icon/Icon';

import { getByteSize } from '@/utils/getByteSize';

interface FileProps {
  file: File;
  onClick: (lastModified: number) => void;
}

// FIXME: LabelButton 인터렉션 공간이 아이콘 공간과 맞지 않음, children props 에러
function File({ file, onClick }: FileProps) {
  const { name, size, lastModified } = file;

  const handleFile = () => {
    onClick(lastModified);
  };

  return (
    <div className='bg-surface-embossed-dark radius-xs gap-md border-border-trans-assistive-dark flex items-center border px-(--gap-lg) py-(--gap-sm)'>
      <Icon name='file' size='md' fillColor='fill-object-normal-dark' />
      <div className='gap-6xs text-object-normal-dark flex grow flex-col'>
        <span className='label-bold-md break-all'>{name}</span>
        <span className='body-xs'>{getByteSize(size)}</span>
      </div>
      <LabelButton
        size='lg'
        hierarchy='secondary'
        onClick={handleFile}
        leftIcon={<Icon name='clear' size='md' fillColor='fill-object-neutral-dark' />}
      />
    </div>
  );
}

export default File;
