import type { CSSObject } from "@emotion/react";

export interface GlobalStyleObject {
  [selector: string]: CSSObject;
}
// resetCss를 Emotion Global에서 소비할 수 있는 객체 형태로 관리
// reference: https://piccalil.li/blog/a-more-modern-css-reset/
export const resetCss = {
  // 모든 요소의 box-sizing을 보더박스로 설정
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  // 폰트 크기의 팽창 방지
  html: {
    MozTextSizeAdjust: "none",
    WebkitTextSizeAdjust: "none",
    textSizeAdjust: "none",
  },

  // 기본 여백 제거 (block-end 기준)
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
    marginBlockEnd: 0,
  },

  // role=list를 가진 목록의 기본 스타일 제거
  "ul[role='list'], ol[role='list']": {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  li: {
    outline: "none",
  },

  // 핵심 body 기본값
  body: {
    fontFamily: '"Pretendard Variable", "D2Coding", sans-serif',
    minHeight: "100vh",
    lineHeight: 1.5,
  },

  // 제목 및 상호작용 요소 line-height 축소
  "h1, h2, h3, h4, button, input, label": {
    lineHeight: 1.1,
  },

  // 제목 text-wrap 균형
  "h1, h2, h3, h4": {
    textWrap: "balance",
  },

  // 클래스가 없는 a의 기본 스타일
  "a:not([class])": {
    textDecorationSkipInk: "auto",
    color: "currentColor",
  },

  // 이미지 다루기 편하게
  "img, picture": {
    maxWidth: "100%",
    display: "block",
  },

  // form 요소가 폰트를 상속받도록
  "input, button, textarea, select": {
    font: "inherit",
  },

  // rows 속성이 없는 textarea의 최소 높이 확보
  "textarea:not([rows])": {
    minHeight: "10em",
  },

  // 추가: 클래스가 있는 a에 대해서만 기본 장식 제거 (기존 규칙 보완)
  "a[class]": {
    textDecoration: "none",
  },

  // 추가: 버튼 기본 스타일 초기화 및 포인터 커서
  button: {
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0",
    outline: "none",
  },
} satisfies GlobalStyleObject;
