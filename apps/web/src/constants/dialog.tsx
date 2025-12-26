import type { ReactNode } from "react";

import type { DialogTypes } from "@/types/ui/dialog";

type BtnLayout = "vertical" | "horizontal" | "singleButton";

interface DialogContent {
  btnLayout: BtnLayout;
  title: string;
  primaryBtnLabel: string;
  secondaryBtnLabel?: string;
  content: ReactNode;
}

/**
 * @description
 * JDS Dialog 컴포넌트용 상수 (header, body 형식)
 */
export const DIALOG_CONTENT = {
  submitAnswer: {
    header: "지원서를 최종 제출합니다",
    body: "제출한 뒤에는 지원서를 수정하거나 지원을 취소할 수 없어요.\n지원 관련 도움이 필요하시다면 jectofficial@ject.kr 로 문의해주세요.",
    primaryLabel: "지원서 제출하기",
    secondaryLabel: "취소",
  },
} as const;

export const dialogTypes: Record<DialogTypes, DialogContent> = {
  example: {
    btnLayout: "vertical",
    title: "다이얼로그 타이틀",
    primaryBtnLabel: "primary",
    secondaryBtnLabel: "secondary",
    content: "스토리북을 위한 예시입니다.",
  },
  changeJob: {
    btnLayout: "horizontal",
    title: "다른 직군으로 변경하시겠어요?",
    primaryBtnLabel: "변경하기",
    secondaryBtnLabel: "변경하지 않기",
    content: (
      <>
        작성된 답변 내용들은 모두 초기화되고,
        <br />
        다시 되돌릴 수 없어요.
      </>
    ),
  },
  submitAnswer: {
    btnLayout: "horizontal",
    title: "지원서를 제출하시겠어요?",
    primaryBtnLabel: "제출하기",
    secondaryBtnLabel: "제출 보류하기",
    content: "제출한 뒤에는 수정하거나 취소할 수 없어요.",
  },
  expiredSession: {
    btnLayout: "singleButton",
    title: "로그인 세션이 만료되었어요",
    primaryBtnLabel: "인증하기",
    content: "안전한 이용을 위해 인증을 다시 진행해주세요.",
  },
  continueWriting: {
    btnLayout: "horizontal",
    title: "작성 중이던 지원서가 있어요",
    primaryBtnLabel: "이어서 작성하기",
    secondaryBtnLabel: "새로 작성하기",
    content: "이어서 작성하거나 새로 작성할 수도 있어요.",
  },
  failedUploadFile: {
    btnLayout: "singleButton",
    title: "파일 업로드에 실패했어요",
    content: (
      <>
        업로드 중 문제가 발생했어요.
        <br />
        파일을 다시 첨부하거나 인터넷 연결을 확인해주세요.
      </>
    ),
    primaryBtnLabel: "확인",
  },
  dirtyCheck: {
    btnLayout: "horizontal",
    title: "다른 페이지로 이동하시겠어요?",
    content: (
      <>
        작성 중인 지원서 내용이 유실될 수 있어요.
        <br />
        임시 저장 여부를 한번 더 확인해주세요.
      </>
    ),
    primaryBtnLabel: "이동하기",
    secondaryBtnLabel: "취소",
  },
  alreadySubmitted: {
    btnLayout: "singleButton",
    title: "이미 지원을 완료했어요",
    content: "동일한 이메일로는 중복 지원이 불가능해요.",
    primaryBtnLabel: "확인",
  },
};
