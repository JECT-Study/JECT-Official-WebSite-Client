import { style } from "@vanilla-extract/css";

/**
 * 요소를 시각적으로만 숨기고 접근성 트리에는 유지하기 위한 패턴
 *
 * 포커스 가능한 native input이나 aria-live 컨테이너처럼
 * 화면에는 보이지 않아야 하지만 접근성 트리에는 남아 있어야 하는 요소에 사용한다.
 */
export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});
