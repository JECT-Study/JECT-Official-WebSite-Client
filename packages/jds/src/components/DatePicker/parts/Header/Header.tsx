import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./header.css";
import type { HeaderProps } from "./header.types";

/**
 * @description DatePicker 상단에서 연월 버튼과 이동 버튼의 자리를 나누는 레이아웃 파츠
 *
 * @remarks
 * 버튼과 상태는 만들지 않습니다. 호출부가 `titles`와 `navigation`에 넣습니다.
 * @internal
 * @name Header
 * @tag div
 */
export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ titles, navigation, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      <div data-part='titles' className={styles.titles}>
        {titles}
      </div>
      <div data-part='navigation' className={styles.navigation}>
        {navigation}
      </div>
    </div>
  ),
);

Header.displayName = "DatePicker.Header";
