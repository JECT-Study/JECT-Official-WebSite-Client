import Lottie from 'lottie-react';
import { MouseEvent, useEffect } from 'react';

import loadingSpinner from '@/assets/lottie/ject-loadingSpinner.json';
import LabelButton from '@/components/common/button/LabelButton';
import { feedbackStyle, FeedbackType } from '@/components/common/file/fileItem.style';
import Icon from '@/components/common/icon/Icon';
import useUploadFileToS3Mutation from '@/hooks/useUploadFileToS3Mutation';
import { NewPortfolio } from '@/types/apis/answer';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';
import { extractFileInfo } from '@/utils/extractFileInfo';

interface FileItemProps {
  file: File | NewPortfolio;
  isDisabled?: boolean;
  onDelete?: (id: number | string) => void;
  feedback?: FeedbackType | null;
}

function FileItem({ file, onDelete, isDisabled = false, feedback = null }: FileItemProps) {
  const { uploadFileMutate, isPending, isNetworkError, source } = useUploadFileToS3Mutation();
  const { fileName, fileSize, id, fileUrl, rawFile, presignedUrl } = extractFileInfo(file);
  const feedbackType = isNetworkError ? 'error' : feedback;

  const openFile = () => {
    if (isDisabled || (!fileUrl && !rawFile)) return;

    let url = '';

    if (fileUrl) {
      url = fileUrl;
    } else if (rawFile) {
      url = URL.createObjectURL(rawFile);
    }

    if (url) window.open(url, '_blank', 'noopener,noreferrer');

    if (!fileUrl) setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    source.cancel();
    onDelete?.(id);
  };

  useEffect(() => {
    if (presignedUrl && rawFile) {
      uploadFileMutate({ url: presignedUrl, file: rawFile });
    }
  }, [presignedUrl, rawFile, uploadFileMutate]);

  if (feedbackType) {
    return (
      <div
        className={`${feedbackStyle[feedbackType].bgColor} ${feedbackStyle[feedbackType].borderColor} radius-xs gap-md flex items-center border px-(--gap-lg) py-(--gap-sm)`}
      >
        <Icon
          name={feedbackStyle[feedbackType].icon}
          size='md'
          fillColor={feedbackStyle[feedbackType].fillColor}
        />
        <div className={`text-object-normal-dark gap-6xs flex grow flex-col text-left`}>
          <span className='label-bold-md break-all'>{fileName}</span>
          <span className='body-xs'>{changeFileSizeUnit(fileSize, ['KB', 'MB'], true)}</span>
          <span className={`body-xs ${feedbackStyle[feedbackType].textColor}`}>
            {feedbackStyle[feedbackType].message}
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
      {isPending ? (
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
