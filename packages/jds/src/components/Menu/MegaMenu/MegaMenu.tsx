import { forwardRef } from "react";

import {
  StyledDivider,
  StyledLabel,
  StyledMegaMenuGroup,
  StyledMegaMenuRoot,
  StyledMegaMenuSection,
} from "./megaMenu.styles";
import type {
  MegaMenuGroupItemProps,
  MegaMenuGroupProps,
  MegaMenuProps,
  MegaMenuSectionProps,
} from "./megaMenu.types";

const MegaMenuRoot = forwardRef<HTMLDivElement, MegaMenuProps>(({ children, ...rest }, ref) => {
  return (
    <StyledMegaMenuRoot ref={ref} {...rest}>
      {children}
    </StyledMegaMenuRoot>
  );
});

MegaMenuRoot.displayName = "MegaMenu.Root";

const MegaMenuDivider = () => {
  return <StyledDivider />;
};

MegaMenuDivider.displayName = "MegaMenu.Divider";

const MegaMenuSection = forwardRef<HTMLDivElement, MegaMenuSectionProps>(
  ({ children, sectionName = "", ...rest }, ref) => {
    return (
      <StyledMegaMenuSection ref={ref} {...rest}>
        <StyledLabel as='span' textAlign='left' size='sm' weight='normal'>
          {sectionName}
        </StyledLabel>
        {children}
      </StyledMegaMenuSection>
    );
  },
);

StyledMegaMenuSection.displayName = "MegaMenu.Section";

const MegaMenuGroup = forwardRef<HTMLUListElement, MegaMenuGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledMegaMenuGroup ref={ref} role='list' {...rest}>
        {children}
      </StyledMegaMenuGroup>
    );
  },
);

MegaMenuGroup.displayName = "MegaMenu.Group";

const MegaMenuGroupItem = forwardRef<HTMLLIElement, MegaMenuGroupItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <li ref={ref} {...rest}>
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
