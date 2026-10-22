import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface HeaderProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** 파츠 식별자는 내부에서 지정하므로 넘길 수 없습니다. */
  "data-part"?: never;
  /** 왼쪽에 놓이는 연월 버튼. 남는 공간을 모두 차지합니다. */
  titles: ReactNode;
  /** 오른쪽 끝에 붙는 이전 달, 다음 달 버튼 */
  navigation: ReactNode;
}
