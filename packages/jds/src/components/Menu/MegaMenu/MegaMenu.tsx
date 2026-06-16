import { clsx } from "clsx";
import { forwardRef } from "react";

import {
  megaMenuDivider,
  megaMenuGroup,
  megaMenuLabel,
  megaMenuRoot,
  megaMenuSection,
} from "./megaMenu.css";
import type {
  MegaMenuGroupItemProps,
  MegaMenuGroupProps,
  MegaMenuProps,
  MegaMenuSectionProps,
} from "./megaMenu.types";

import { getLabelClassName } from "@/utils/typography";

const MegaMenuRoot = forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <div ref={ref} className={clsx(megaMenuRoot, className)} {...restProps}>
        {children}
      </div>
    );
  },
);

MegaMenuRoot.displayName = "MegaMenu.Root";

const MegaMenuDivider = () => {
  return <hr className={megaMenuDivider} />;
};

MegaMenuDivider.displayName = "MegaMenu.Divider";

const MegaMenuSection = forwardRef<HTMLDivElement, MegaMenuSectionProps>(
  ({ children, sectionName = "", className, ...restProps }, ref) => {
    return (
      <div ref={ref} className={clsx(megaMenuSection, className)} {...restProps}>
        <span className={clsx(getLabelClassName({ size: "sm" }), megaMenuLabel)}>
          {sectionName}
        </span>
        {children}
      </div>
    );
  },
);

MegaMenuSection.displayName = "MegaMenu.Section";

const MegaMenuGroup = forwardRef<HTMLUListElement, MegaMenuGroupProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <ul ref={ref} role='list' className={clsx(megaMenuGroup, className)} {...restProps}>
        {children}
      </ul>
    );
  },
);

MegaMenuGroup.displayName = "MegaMenu.Group";

const MegaMenuGroupItem = forwardRef<HTMLLIElement, MegaMenuGroupItemProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <li ref={ref} {...restProps}>
        {children}
      </li>
    );
  },
);

MegaMenuGroupItem.displayName = "MegaMenu.GroupItem";

export const MegaMenu = {
  Root: MegaMenuRoot,
  Section: MegaMenuSection,
  Divider: MegaMenuDivider,
  Group: MegaMenuGroup,
  GroupItem: MegaMenuGroupItem,
};
