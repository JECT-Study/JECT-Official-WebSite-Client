import { MouseEvent, ReactNode } from 'react';

import LabelButton from '@/components/common/button/LabelButton';
import Icon from '@/components/common/icon/Icon';
import { FileUrl } from '@/types/file';
import { IconNames } from '@/types/icon';
import { changeFileSizeUnit } from '@/utils/changeFileSizeUnit';

type FeedbackType = 'error' | 'unknown';

interface FeedbackStyleType {
  icon: IconNames;
  bgColor: string;
  borderColor: string;
  fillColor: string;
  textColor: string;
  message: ReactNode;
}

const feedbackStyle: Record<FeedbackType, FeedbackStyleType> = {
  error: {
    icon: 'error',
    bgColor: 'bg-feedback-trans-negative-dark',
    borderColor: 'border-feedback-trans-negative-dark',
    fillColor: 'fill-feedback-negative-dark',
    textColor: 'text-feedback-negative-dark',
    message: (
      <>
        네트워크 오류로 업로드가 중단되었어요.
        <br />
        삭제 후 다시 첨부해주세요.
      </>
    ),
  },
  unknown: {
    icon: 'question',
    bgColor: 'bg-feedback-trans-notification-dark',
    borderColor: 'border-feedback-trans-notification-dark',
    fillColor: 'fill-feedback-notification-dark',
    textColor: 'text-feedback-notification-dark',
    message: '알 수 없는 형식의 파일이에요. 확인 후 다시 첨부해주세요.',
  },
};

interface FileProps {
  file: FileUrl;
  isDisabled?: boolean;
  onDelete?: (id: number | string) => void;
  feedback?: FeedbackType | null;
}

function File({ file, onDelete, isDisabled = false, feedback = null }: FileProps) {
  const openFile = () => {
    if (isDisabled || !file) return;

    const newWindow = window.open(file.url, '_blank', 'noopener,noreferrer');

    if (newWindow) newWindow.opener = null;
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete?.(file.id);
  };

  if (feedback) {
    return (
      <div
        className={`${feedbackStyle[feedback].bgColor} ${feedbackStyle[feedback].borderColor} radius-xs gap-md flex cursor-pointer items-center border px-(--gap-lg) py-(--gap-sm)`}
      >
        <Icon
          name={feedbackStyle[feedback].icon}
          size='md'
          fillColor={feedbackStyle[feedback].fillColor}
        />
        <div className={`text-object-normal-dark gap-6xs flex grow flex-col text-left`}>
          <span className='label-bold-md break-all'>{file.name}</span>
          <span className='body-xs'>{changeFileSizeUnit(file.size)}</span>
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
    <button
      disabled={isDisabled}
      onClick={openFile}
      className={`${isDisabled ? '' : 'interaction-default-subtle transition-faster-fluent-hover'} bg-surface-embossed-dark radius-xs gap-md border-border-trans-assistive-dark flex cursor-pointer items-center border px-(--gap-lg) py-(--gap-sm)`}
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
