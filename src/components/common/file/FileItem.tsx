import Lottie from 'lottie-react';
import { MouseEvent, useEffect } from 'react';

import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import LabelButton from '@/components/common/button/LabelButton';
import { feedbackStyle, FeedbackType } from '@/components/common/file/fileItem.style';
import Icon from '@/components/common/icon/Icon';
import useUploadFileToS3Query from '@/hooks/useUploadFileToS3Query';
import { NewPortfolio } from '@/types/apis/answer';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';

interface FileItemProps {
  file: File | NewPortfolio;
  isDisabled?: boolean;
  onDelete?: (id: number | string) => void;
  feedback?: FeedbackType | null;
}

function FileItem({ file, onDelete, isDisabled = false, feedback = null }: FileItemProps) {
  const { uploadFileToS3 } = useUploadFileToS3Query();
  const fileName = 'fileName' in file ? file.fileName : file.name;
  const fileSize = 'fileSize' in file ? Number(file.fileSize) : file.size;

  const openFile = () => {
    if (isDisabled || !file) return;

    if ('fileUrl' in file) {
      return window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
    }

    const url = URL.createObjectURL(file);

    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if ('id' in file) {
      onDelete?.(file.id);
    } else {
      onDelete?.(file.lastModified);
    }
  };

  useEffect(() => {
    if ('presignedUrl' in file && file.presignedUrl) {
      uploadFileToS3.mutate({ url: file.presignedUrl, file: file.file });
    }
  }, [file]);

  if (feedback) {
    return (
      <div
        className={`${feedbackStyle[feedback].bgColor} ${feedbackStyle[feedback].borderColor} radius-xs gap-md flex items-center border px-(--gap-lg) py-(--gap-sm)`}
      >
        <Icon
          name={feedbackStyle[feedback].icon}
          size='md'
          fillColor={feedbackStyle[feedback].fillColor}
        />
        <div className={`text-object-normal-dark gap-6xs flex grow flex-col text-left`}>
          <span className='label-bold-md break-all'>{fileName}</span>
          <span className='body-xs'>{changeFileSizeUnit(fileSize, ['KB', 'MB'], true)}</span>
          <span className={`body-xs ${feedbackStyle[feedback].textColor}`}>
            {feedbackStyle[feedback].message}
          </span>
        </div>
        {onDelete && (
          <LabelButton
            size='lg'
            hierarchy='secondary'
            onClick={deleteHandler}
            leftIcon={<Icon name='clear' size='md' fillColor='fill-object-neutral-dark' />}
          />
        )}
      </div>
    );
  }

  return (
    <div
      onClick={openFile}
      className={`${isDisabled ? 'cursor-default' : 'interaction-default-subtle transition-faster-fluent-hover cursor-pointer'} bg-surface-embossed-dark radius-xs gap-md border-border-trans-assistive-dark flex items-center border px-(--gap-lg) py-(--gap-sm)`}
    >
      {uploadFileToS3.isPending ? (
        <Lottie animationData={loadingSpinner} />
      ) : (
        <Icon
          name='file'
          size='md'
          fillColor={isDisabled ? 'fill-object-disabled-dark' : 'fill-object-normal-dark'}
        />
      )}
      <div
        className={`${isDisabled ? 'text-object-disabled-dark' : 'text-object-normal-dark'} gap-6xs flex grow flex-col text-left`}
      >
        <span className='label-bold-md break-all'>{fileName}</span>
        <span className='body-xs'>{changeFileSizeUnit(fileSize, ['KB', 'MB'], true)}</span>
      </div>
      {onDelete && (
        <LabelButton
          size='lg'
          hierarchy='secondary'
          onClick={deleteHandler}
          leftIcon={<Icon name='clear' size='md' fillColor='fill-object-neutral-dark' />}
        />
      )}
    </div>
  );
}

export default FileItem;
