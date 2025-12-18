import { MegaMenu, MenuItem } from "@ject/jds";

export const JectMenu = () => {
  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='젝트'>
        <MegaMenu.Group className='w-[120px]'>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor>비전과 스토리</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor suffixIcon='external-link-line' suffixIconVisible>
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
            <MenuItem.Anchor>팀 프로젝트</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor>미니 스터디</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor>라이브 세션</MenuItem.Anchor>
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
            <MenuItem.Anchor>지원 안내</MenuItem.Anchor>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Anchor>FAQ</MenuItem.Anchor>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};
