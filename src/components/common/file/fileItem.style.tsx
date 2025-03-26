import { ReactNode } from 'react';

import { IconNames } from '@/types/ui/icon';

export type FeedbackType = 'error' | 'unknown';

interface FeedbackStyleType {
  icon: IconNames;
  bgColor: string;
  borderColor: string;
  fillColor: string;
  textColor: string;
  message: ReactNode;
}

export const feedbackStyle: Record<FeedbackType, FeedbackStyleType> = {
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
