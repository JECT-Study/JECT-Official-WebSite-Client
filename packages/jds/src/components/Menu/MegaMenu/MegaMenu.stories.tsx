import type { Meta, StoryObj } from "@storybook/react-vite";

import { MegaMenu } from "./MegaMenu";
import { MenuItem } from "../MenuItem";

import { BlockButton } from "@/components/Button/BlockButton";
import { LabelButton } from "@/components/Button/LabelButton";
import { Logo } from "@/components/Logo";
import { GlobalNavigation } from "@/components/Navigation/GlobalNavigation";

const meta: Meta<typeof MegaMenu.Root> = {
  title: "Components/Menu/MegaMenu",
  component: MegaMenu.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='카테고리'>
        <MegaMenu.Group style={{ width: "180px" }}>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
      <MegaMenu.Divider />
      <MegaMenu.Section sectionName='콘텐츠'>
        <MegaMenu.Group style={{ width: "620px" }}>카드</MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  ),
};

const TempNavigationContent = () => {
  return (
    <MegaMenu.Root>
      <MegaMenu.Section sectionName='카테고리'>
        <MegaMenu.Group style={{ width: "180px" }}>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
          <MegaMenu.GroupItem>
            <MenuItem.Button>메뉴 레이블</MenuItem.Button>
          </MegaMenu.GroupItem>
        </MegaMenu.Group>
      </MegaMenu.Section>
      <MegaMenu.Divider />
      <MegaMenu.Section sectionName='콘텐츠'>
        <MegaMenu.Group style={{ width: "620px" }}>카드</MegaMenu.Group>
      </MegaMenu.Section>
    </MegaMenu.Root>
  );
};

export const WithGlobalNavigation: Story = {
  render: () => (
    <GlobalNavigation.Root variant='solid'>
      <GlobalNavigation.LogoItem>
        <Logo href='/' hierarchy='primary' height={16} />
      </GlobalNavigation.LogoItem>
      <GlobalNavigation.Divider />
      <GlobalNavigation.List>
        <GlobalNavigation.Item>
          <GlobalNavigation.Trigger>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              젝트
            </LabelButton.Basic>
          </GlobalNavigation.Trigger>
          <GlobalNavigation.Content offset={10}>
            <TempNavigationContent />
          </GlobalNavigation.Content>
        </GlobalNavigation.Item>
        <GlobalNavigation.Item>
          <GlobalNavigation.Trigger>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              프로그램
            </LabelButton.Basic>
          </GlobalNavigation.Trigger>
          <GlobalNavigation.Content offset={10}>
            <TempNavigationContent />
          </GlobalNavigation.Content>
        </GlobalNavigation.Item>
        <GlobalNavigation.Item>
          <GlobalNavigation.Trigger>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              뉴스
            </LabelButton.Basic>
          </GlobalNavigation.Trigger>
          <GlobalNavigation.Content offset={10}>
            <TempNavigationContent />
          </GlobalNavigation.Content>
        </GlobalNavigation.Item>
        <GlobalNavigation.Item>
          <GlobalNavigation.Trigger>
            <LabelButton.Basic hierarchy='primary' size='md' suffixIcon='arrow-down-s-line'>
              합류 가이드
            </LabelButton.Basic>
          </GlobalNavigation.Trigger>
          <GlobalNavigation.Content offset={10}>
            <TempNavigationContent />
          </GlobalNavigation.Content>
        </GlobalNavigation.Item>
      </GlobalNavigation.List>
      <GlobalNavigation.List align='right'>
        <GlobalNavigation.Item>
          <BlockButton.Basic hierarchy='primary' size='sm' onClick={() => alert("hello!")}>
            지원하기
          </BlockButton.Basic>
        </GlobalNavigation.Item>
      </GlobalNavigation.List>
    </GlobalNavigation.Root>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Menu.Content의 side, align, sideOffset, alignOffset 속성을 통해서 Menu.Content의 위치를 조정할 수 있습니다",
      },
    },
  },
};
