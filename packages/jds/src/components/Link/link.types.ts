import type { ComponentPropsWithoutRef } from "react";

interface LinkBaseProps extends ComponentPropsWithoutRef<"a"> {
  external?: boolean;
}

/**
 * `asChild`와 `disabled`는 동시에 사용할 수 없다.
 *
 * asChild로 라우팅 컴포넌트를 전달하면 href가 자식 요소에 있어 Link가 이동을
 * 제어할 수 없으므로, 두 속성의 조합을 타입 수준에서 차단한다. 비활성 링크는 이동
 * 대상이 아니므로, 비활성 상태는 asChild 없이 `<Link disabled>`로 표현한다.
 */
export type LinkProps =
  | (LinkBaseProps & { asChild?: false; disabled?: boolean })
  | (LinkBaseProps & { asChild: true; disabled?: never });
