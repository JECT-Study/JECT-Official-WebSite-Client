import { Divider, IconButton, Label, MenuItem } from "@ject/jds";
import type { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

import { PATH } from "@/constants/path";

const JectMenu = () => {
  const JDS = "https://www.figma.com/community/file/1547190026603503566/jds";
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label size='md' textAlign='left' weight='normal' className='text-(--semantic-object-alternative)'>
        젝트
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
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
      </div>
    </div>
  );
};

const ProgramMenu = () => {
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label size='md' textAlign='left' weight='normal' className='text-(--semantic-object-alternative)'>
        프로그램
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
        <MenuItem.Anchor href={PATH.teamProject} size='lg'>
          팀 프로젝트
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.miniStudy} size='lg'>
          미니 스터디
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.liveSession} size='lg'>
          라이브 세션
        </MenuItem.Anchor>
      </div>
    </div>
  );
};

const JoinGuideMenu = () => {
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label size='md' textAlign='left' weight='normal' className='text-(--semantic-object-alternative)'>
        합류 가이드
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
        <MenuItem.Anchor href={PATH.applyInfo} size='lg'>
          지원 안내
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.faq} size='lg'>
          FAQ
        </MenuItem.Anchor>
      </div>
    </div>
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
      <div
        role='sidebarDimmedScreen'
        className='fixed inset-0 z-50 h-dvh w-dvw bg-(--semantic-curtain-dim) transition-opacity duration-300 ease-[cubic-bezier(0.19,0.91,0.38,1)]'
        style={{
          opacity: isOpenSidebar ? 1 : 0,
          pointerEvents: isOpenSidebar ? "auto" : "none",
        }}
      />
      <div
        className='fixed top-0 right-0 z-51 h-dvh w-60 bg-(--semantic-surface-standard) shadow-(--shadow-semantic-overlay) transition-transform duration-300 ease-[cubic-bezier(0.19,0.91,0.38,1)]'
        style={{
          transform: isOpenSidebar ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className='flex items-center justify-end border-b border-(--semantic-stroke-subtle) py-(--semantic-margin-sm) px-(--semantic-margin-lg)'>
          <IconButton.Basic
            hierarchy='primary'
            icon='menu-line'
            size='lg'
            onClick={closeSidebar}
            className='text-(--semantic-object-boldest)'
          />
        </div>
        <div className='flex flex-col gap-(--semantic-spacing-24) p-(--semantic-margin-lg)'>
          <JectMenu />
          <Divider />
          <ProgramMenu />
          <Divider />
          <JoinGuideMenu />
        </div>
      </div>
    </>,
    document.body,
  );
};
