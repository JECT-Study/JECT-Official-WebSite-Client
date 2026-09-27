import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./header.css";
import type { HeaderProps } from "./header.types";

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
