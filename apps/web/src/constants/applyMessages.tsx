export const APPLY_MESSAGE = {
  invalid: {
    nameSize: "이름은 5자 이내로 작성해주세요.",
    nameLang: "이름은 한글로 작성해주세요.",
    phoneNumber: '"010"을 포함해 총 11자리까지만 입력해주세요.',
    url: "URL 형식이 올바르지 않아요. 다시 확인해주세요.",
    fileSize: "첨부 가능한 최대 파일 용량을 다시 확인해주세요",
    answerSize: "작성한 필수 답변들을 다시 확인해주세요",
    fileType: "첨부 가능한 파일 형식을 다시 확인해주세요.",
    unknownFile: "정상적인 PDF 파일인지 다시 확인해주세요",
    exceedText: "최대 글자수를 초과했어요.",
    sameFile: "동일한 이름의 파일이 있어요. 파일을 다시 확인해주세요.",
  },
  success: {
    sendVerificationEmail: "인증 메일이 발송되었습니다.",
    verification: "인증이 완료되었어요. ",
    uploadFile: "파일을 업로드했어요",
    resetPin: "PIN을 다시 설정했어요",
    loadProfile: "프로필을 불러왔어요.",
    continueWriting: "본인 확인 완료, 이제 지원서를 이어서 작성할 수 있어요.",
  },
  fail: {
    pin: "PIN이 올바르지 않아요. 다시 확인해주세요.",
    timeoutVerificationCode: "인증번호 유효 시간이 초과되었어요.",
    verificationCode: "인증번호가 올바르지 않아요. 다시 확인해주세요.",
    uploadFile: "네트워크 점검 후 파일을 다시 첨부해주세요",
    loadProfile: "프로필을 불러오는데 실패했습니다. 다시 시도해주세요.",
    saveProfile: "프로필 저장에 실패했습니다. 다시 시도해주세요.",
  },
  conflict: {
    email: "이미 지원서 제출을 완료한 이메일이에요",
  },
  info: {
    reset: "포지션을 변경해서 답변들이 초기화됐어요. ",
  },
} as const;

export const APPLY_SNACKBAR = {
  default: "지금은 젝트 3기 모집 기간이에요!",
  main: "젝트에서 함께 재밌는 프로젝트 해요!",
};

export const APPLY_BUTTON_TEXT = {
  email: {
    submit: "인증번호 받기",
  },
};

//JDS Dialog용 상수
export const APPLY_DIALOG = {
  tempSaved: {
    header: "페이지를 이동해 지원서를 이어서 작성합니다",
    body: "이미 등록된 이메일은 마지막 작성 단계부터 이어서 작성할 수 있어요.",
    primaryAction: "페이지 이동하기",
    secondaryAction: "닫기",
  },
  submitted: {
    header: "이미 지원서가 접수된 이메일입니다",
    body: (
      <>
        접수된 지원서는 수정하거나 취소할 수 없어요.
        <br />
        내용 수정, 지원 취소 등은 다음의 연락처로 문의 부탁드립니다.
        <br />
        문의: jectofficial@ject.kr
      </>
    ),
    primaryAction: "확인",
  },
};
