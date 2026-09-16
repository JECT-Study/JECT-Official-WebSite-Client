import { clsx } from "clsx";
import { forwardRef } from "react";

import * as styles from "./header.css";
import type { HeaderNavigationProps, HeaderRootProps, HeaderTitlesProps } from "./header.types";

const HeaderRoot = forwardRef<HTMLDivElement, HeaderRootProps>(
  ({ children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='root'
      className={clsx(styles.root, className)}
    >
      {children}
    </div>
  ),
);

HeaderRoot.displayName = "DatePicker.Header.Root";

const HeaderTitles = forwardRef<HTMLDivElement, HeaderTitlesProps>(
  ({ children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='titles'
      className={clsx(styles.titles, className)}
    >
      {children}
    </div>
  ),
);

HeaderTitles.displayName = "DatePicker.Header.Titles";

const HeaderNavigation = forwardRef<HTMLDivElement, HeaderNavigationProps>(
  ({ children, className, ...restProps }, forwardedRef) => (
    <div
      ref={forwardedRef}
      {...restProps}
      data-part='navigation'
      className={clsx(styles.navigation, className)}
    >
      {children}
    </div>
  ),
);

HeaderNavigation.displayName = "DatePicker.Header.Navigation";

export const Header = {
  Root: HeaderRoot,
  Titles: HeaderTitles,
  Navigation: HeaderNavigation,
};
