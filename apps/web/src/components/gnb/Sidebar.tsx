import styled from "@emotion/styled";
import { Divider, IconButton, Label, MenuItem } from "@ject/jds";
import { shadow } from "@ject/jds/utils";
import type { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { PATH } from "@/constants/path";

interface StyledSidebarProps {
  $isOpenSidebar: boolean;
}

const StyledSidebarDimmedScreen = styled.div<StyledSidebarProps>(({ theme, $isOpenSidebar }) => ({
  position: "fixed",
  inset: 0,
  zIndex: "50",
  width: "100dvw",
  height: "100dvh",
  backgroundColor: theme.color.semantic.curtain.dim,
  opacity: $isOpenSidebar ? 1 : 0,
  pointerEvents: $isOpenSidebar ? "auto" : "none",
  transition: "opacity 300ms cubic-bezier(0.19, 0.91, 0.38, 1)",
}));

const StyledSidebar = styled.div<StyledSidebarProps>(({ theme, $isOpenSidebar }) => ({
  backgroundColor: theme.color.semantic.surface.standard,
  zIndex: "51",
  position: "fixed",
  top: 0,
  right: 0,
  width: "240px",
  height: "100dvh",
  transform: $isOpenSidebar ? "translateX(0)" : "translateX(100%)",
  ...shadow(theme, "overlay"),
  transition: "transform 300ms cubic-bezier(0.19, 0.91, 0.38, 1)",
}));

const StyledOpenedMenuButton = styled(IconButton.Basic)(({ theme }) => ({
  color: theme.color.semantic.object.boldest,
}));

const StyledMenuButtonContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: `${theme.scheme.semantic.margin.sm} ${theme.scheme.semantic.margin.lg}`,
  borderBottom: `1px solid ${theme.color.semantic.stroke.subtle}`,
}));

const StyledMenuContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.scheme.semantic.spacing[24],
  padding: theme.scheme.semantic.margin.lg,
}));

const StyledMenuGroupWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.scheme.semantic.spacing[20],
}));

const StyledMenuGroup = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.scheme.semantic.spacing[16],
  maxWidth: "120px",
}));

const StyledLabelCategory = styled(Label)(({ theme }) => ({
  color: theme.color.semantic.object.alternative,
}));

const JectMenu = () => {
  const JDS = "https://www.figma.com/community/file/1547190026603503566/jds";
  return (
    <StyledMenuGroupWrapper>
      <StyledLabelCategory size='md' textAlign='left' weight='normal'>
        젝트
      </StyledLabelCategory>
      <StyledMenuGroup>
        <MenuItem.Anchor href={PATH.vision} size='lg'>
          비전과 스토리
        </MenuItem.Anchor>
        <MenuItem.Anchor
          href={JDS}
          target='_blank'
          rel='noopener noreferrer'
          size='lg'
          suffixIcon='external-link-line'
          suffixIconVisible
        >
          JDS
        </MenuItem.Anchor>
      </StyledMenuGroup>
    </StyledMenuGroupWrapper>
  );
};

const ProgramMenu = () => {
  return (
    <StyledMenuGroupWrapper>
      <StyledLabelCategory size='md' textAlign='left' weight='normal'>
        프로그램
      </StyledLabelCategory>
      <StyledMenuGroup>
        <MenuItem.Anchor href={PATH.teamProject} size='lg'>
          팀 프로젝트
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.miniStudy} size='lg'>
          미니 스터디
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.liveSession} size='lg'>
          라이브 세션
        </MenuItem.Anchor>
      </StyledMenuGroup>
    </StyledMenuGroupWrapper>
  );
};

const JoinGuideMenu = () => {
  return (
    <StyledMenuGroupWrapper>
      <StyledLabelCategory size='md' textAlign='left' weight='normal'>
        합류 가이드
      </StyledLabelCategory>
      <StyledMenuGroup>
        <MenuItem.Anchor href={PATH.applyInfo} size='lg'>
          지원 안내
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.faq} size='lg'>
          FAQ
        </MenuItem.Anchor>
      </StyledMenuGroup>
    </StyledMenuGroupWrapper>
  );
};

interface SidebarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: SidebarProps) => {
  const closeSidebar = () => setIsOpenSidebar(false);

  return createPortal(
    <>
      <StyledSidebarDimmedScreen role='sidebarDimmedScreen' $isOpenSidebar={isOpenSidebar} />
      <StyledSidebar $isOpenSidebar={isOpenSidebar}>
        <StyledMenuButtonContainer>
          <StyledOpenedMenuButton
            hierarchy='primary'
            icon='menu-line'
            size='lg'
            onClick={closeSidebar}
          />
        </StyledMenuButtonContainer>
        <StyledMenuContainer>
          <JectMenu />
          <Divider />
          <ProgramMenu />
          <Divider />
          <JoinGuideMenu />
        </StyledMenuContainer>
      </StyledSidebar>
    </>,
    document.body,
  );
};
