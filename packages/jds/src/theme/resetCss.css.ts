// Vanilla Extract 형식의 전역 reset CSS
// reference: https://piccalil.li/blog/a-more-modern-css-reset/
import { globalStyle } from "@vanilla-extract/css";

// 모든 요소의 box-sizing을 보더박스로 설정
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

// 폰트 크기의 팽창 방지
globalStyle("html", {
  MozTextSizeAdjust: "none",
  WebkitTextSizeAdjust: "none",
  textSizeAdjust: "none",
});

// 기본 여백 제거 (block-end 기준)
globalStyle("body, h1, h2, h3, h4, p, figure, blockquote, dl, dd", {
  marginBlockEnd: 0,
});

// role=list를 가진 목록의 기본 스타일 제거
globalStyle("ul[role='list'], ol[role='list']", {
  listStyle: "none",
  padding: 0,
  margin: 0,
});

globalStyle("li", {
  outline: "none",
});

// 핵심 body 기본값
globalStyle("body", {
  fontFamily: '"Pretendard Variable", "D2Coding", sans-serif',
  minHeight: "100vh",
  lineHeight: 1.5,
});

// 제목 및 상호작용 요소 line-height 축소
globalStyle("h1, h2, h3, h4, button, input, label", {
  lineHeight: 1.1,
});

// 제목 text-wrap 균형
globalStyle("h1, h2, h3, h4", {
  textWrap: "balance",
});

// 클래스가 없는 a의 기본 스타일
globalStyle("a:not([class])", {
  textDecorationSkipInk: "auto",
  color: "currentColor",
});

// 이미지 다루기 편하게
globalStyle("img, picture", {
  maxWidth: "100%",
  display: "block",
});

// form 요소가 폰트를 상속받도록
globalStyle("input, button, textarea, select", {
  font: "inherit",
});

// rows 속성이 없는 textarea의 최소 높이 확보
globalStyle("textarea:not([rows])", {
  minHeight: "10em",
});

// 클래스가 있는 a에 대해서만 기본 장식 제거
globalStyle("a[class]", {
  textDecoration: "none",
});

// 버튼 기본 스타일 초기화 및 포인터 커서
globalStyle("button", {
  border: "none",
  background: "none",
  cursor: "pointer",
  padding: "0",
  outline: "none",
});
