import { MegaMenu, MenuItem } from "@ject/jds";

import { PATH } from "@/constants/path";

export const JectMenu = () => {
  const JDS = "https://www.figma.com/community/file/1547190026603503566/jds";

  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='젝트'>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.vision}>비전과 스토리</MenuItem.Anchor>
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
  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='프로그램'>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.teamProject}>팀 프로젝트</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.miniStudy}>미니 스터디</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.liveSession}>라이브 세션</MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};

export const JoinGuideMenu = () => {
  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='합류 가이드 '>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.applyInfo}>지원 안내</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor href={PATH.faq}>FAQ</MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};
