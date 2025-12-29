import { Divider, IconButton, Label, MenuItem } from "@ject/jds";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { PATH } from "@/constants/path";

interface SidebarMenusProps {
  handleMenuClick: (e: MouseEvent<HTMLAnchorElement>, targetPath: string) => void;
}

const JectMenu = ({ handleMenuClick }: SidebarMenusProps) => {
  const JDS = "https://www.figma.com/community/file/1547190026603503566/jds";
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label
        size='md'
        textAlign='left'
        weight='normal'
        className='text-(--semantic-object-alternative)'
      >
        젝트
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
        <MenuItem.Anchor
          href={PATH.vision}
          size='lg'
          onClick={e => handleMenuClick(e, PATH.vision)}
        >
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

const ProgramMenu = ({ handleMenuClick }: SidebarMenusProps) => {
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label
        size='md'
        textAlign='left'
        weight='normal'
        className='text-(--semantic-object-alternative)'
      >
        프로그램
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
        <MenuItem.Anchor
          href={PATH.teamProject}
          size='lg'
          onClick={e => handleMenuClick(e, PATH.teamProject)}
        >
          팀 프로젝트
        </MenuItem.Anchor>
        <MenuItem.Anchor
          href={PATH.miniStudy}
          size='lg'
          onClick={e => handleMenuClick(e, PATH.miniStudy)}
        >
          미니 스터디
        </MenuItem.Anchor>
        <MenuItem.Anchor
          href={PATH.liveSession}
          size='lg'
          onClick={e => handleMenuClick(e, PATH.liveSession)}
        >
          라이브 세션
        </MenuItem.Anchor>
      </div>
    </div>
  );
};

const JoinGuideMenu = ({ handleMenuClick }: SidebarMenusProps) => {
  return (
    <div className='flex flex-col gap-(--semantic-spacing-20)'>
      <Label
        size='md'
        textAlign='left'
        weight='normal'
        className='text-(--semantic-object-alternative)'
      >
        합류 가이드
      </Label>
      <div className='flex max-w-[120px] flex-col gap-(--semantic-spacing-16)'>
        <MenuItem.Anchor
          href={PATH.applyList}
          size='lg'
          onClick={e => handleMenuClick(e, PATH.applyList)}
        >
          지원 안내
        </MenuItem.Anchor>
        <MenuItem.Anchor href={PATH.faq} size='lg' onClick={e => handleMenuClick(e, PATH.faq)}>
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
  const navigate = useNavigate();

  const closeSidebar = () => setIsOpenSidebar(false);

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    e.preventDefault();
    closeSidebar();
    void navigate(targetPath);
  };

  useEffect(() => {
    if (isOpenSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpenSidebar]);

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
        <div className='flex items-center justify-end border-b border-(--semantic-stroke-subtle) px-(--semantic-margin-lg) py-(--semantic-margin-sm)'>
          <IconButton.Basic
            hierarchy='primary'
            icon='menu-line'
            size='lg'
            onClick={closeSidebar}
            className='text-(--semantic-object-boldest)'
          />
        </div>
        <div className='flex flex-col gap-(--semantic-spacing-24) p-(--semantic-margin-lg)'>
          <JectMenu handleMenuClick={handleMenuClick} />
          <Divider />
          <ProgramMenu handleMenuClick={handleMenuClick} />
          <Divider />
          <JoinGuideMenu handleMenuClick={handleMenuClick} />
        </div>
      </div>
    </>,
    document.body,
  );
};
