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
  },
  fail: {
    pin: "PIN이 올바르지 않아요. 다시 확인해주세요.",
    timeoutVerificationCode: "인증번호 유효 시간이 초과되었어요.",
    verificationCode: "인증번호가 올바르지 않아요. 다시 확인해주세요.",
    uploadFile: "네트워크 점검 후 파일을 다시 첨부해주세요",
  },
  conflict: {
    email: "이미 지원서 제출을 완료한 이메일이에요",
  },
  info: {
    reset: "포지션을 변경해서 답변들이 초기화됐어요. ",
  },
};

export const APPLY_SNACKBAR = {
  default: "지금은 젝트 3기 모집 기간이에요!",
  main: "젝트에서 함께 재밌는 프로젝트 해요!",
};
