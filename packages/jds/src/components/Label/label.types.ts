import type { LabelSize, LabelTextAlign, LabelWeight } from "./Label.style";

/**
 * @remarks
 * - polymorphicForwardRef를 통해 `as` prop이 자동으로 추가됩니다
 * - 색상 커스터마이징이 필요한 경우 `styled(Label)` 패턴을 사용하면 됩니다.
 */

export type LabelOwnProps = {
  size?: LabelSize;
  textAlign?: LabelTextAlign;
  weight?: LabelWeight;
};
