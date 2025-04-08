import { ReactNode } from 'react';

type BtnLayout = 'vertical' | 'horizontal' | 'singleButton';
export type DialogTypes =
  | 'example'
  | 'changeJob'
  | 'submitAnswer'
  | 'expiredSession'
  | 'continueWriting';

interface DialogContent {
  btnLayout: BtnLayout;
  title: string;
  primaryBtnLabel: string;
  secondaryBtnLabel?: string;
  content: ReactNode;
}

export const dialogTypes: Record<DialogTypes, DialogContent> = {
  example: {
    btnLayout: 'vertical',
    title: '다이얼로그 타이틀',
    primaryBtnLabel: 'primary',
    secondaryBtnLabel: 'secondary',
    content: '스토리북을 위한 예시입니다.',
  },
  changeJob: {
    btnLayout: 'horizontal',
    title: '다른 직군으로 변경하시겠어요?',
    primaryBtnLabel: '변경하기',
    secondaryBtnLabel: '변경하지 말기',
    content: (
      <>
        작성된 답변 내용들은 모두 초기화되고,
        <br />
        다시 되돌릴 수 없어요.
      </>
    ),
  },
  submitAnswer: {
    btnLayout: 'horizontal',
    title: '지원서를 제출하시겠어요?',
    primaryBtnLabel: '제출하기',
    secondaryBtnLabel: '제출 보류하기',
    content: '제출한 뒤에는 수정하거나 취소할 수 없어요.',
  },
  expiredSession: {
    btnLayout: 'singleButton',
    title: '로그인 세션이 만료되었어요',
    primaryBtnLabel: '인증하기',
    content: '안전한 이용을 위해 인증을 다시 진행해주세요.',
  },
  continueWriting: {
    btnLayout: 'horizontal',
    title: '작성 중이던 지원서가 있어요',
    primaryBtnLabel: '새로 작성하기',
    secondaryBtnLabel: '이어서 작성하기',
    content: '이어서 작성하거나 새로 작성할 수도 있어요.',
  },
};
