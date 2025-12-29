import { MegaMenu, MenuItem } from "@ject/jds";
import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { PATH } from "@/constants/path";

const useMenuNavigation = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    e.preventDefault();
    void navigate(targetPath);
  };

  return { handleMenuClick };
};

export const JectMenu = () => {
  const JDS = "https://www.figma.com/community/file/1547190026603503566/jds";
  const { handleMenuClick } = useMenuNavigation();

  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='젝트'>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.vision} onClick={e => handleMenuClick(e, PATH.vision)}>
              비전과 스토리
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor
              href={JDS}
              suffixIcon='external-link-line'
              suffixIconVisible
              target='_blank'
              rel='noopener noreferrer'
            >
              JDS
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};

export const ProgramMenu = () => {
  const { handleMenuClick } = useMenuNavigation();

  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='프로그램'>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor
              href={PATH.teamProject}
              onClick={e => handleMenuClick(e, PATH.teamProject)}
            >
              팀 프로젝트
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor
              href={PATH.miniStudy}
              onClick={e => handleMenuClick(e, PATH.miniStudy)}
            >
              미니 스터디
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor
              href={PATH.liveSession}
              onClick={e => handleMenuClick(e, PATH.liveSession)}
            >
              라이브 세션
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};

export const JoinGuideMenu = () => {
  const { handleMenuClick } = useMenuNavigation();

  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='합류 가이드 '>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor
              href={PATH.applyList}
              onClick={e => handleMenuClick(e, PATH.applyList)}
            >
              지원 안내
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.faq} onClick={e => handleMenuClick(e, PATH.faq)}>
              FAQ
            </MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};
