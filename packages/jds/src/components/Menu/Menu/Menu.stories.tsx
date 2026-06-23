import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";

import { Menu } from "./Menu";

import { IconButton } from "@/components/Button/IconButton";
import { getLabelClassName } from "@/utils/typography";

const meta: Meta<typeof Menu.Root> = {
  title: "Components/Menu/Menu",
  component: Menu.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    menuStyle: {
      control: "radio",
      options: ["solid", "hollow"],
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
    },
  },
  args: {
    menuStyle: "solid",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Trigger asChild>
        <IconButton icon='menu-line' />
      </Menu.Trigger>
      <Menu.Content side='right' align='start' sideOffset={10}>
        <Menu.Category>카테고리</Menu.Category>
        <Menu.Group>
          <Menu.GroupItem style={{ width: "120px" }}>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem style={{ width: "120px" }}>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button disabled>메뉴 레이블(disabled)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button isSelected>메뉴 레이블(selected)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button>메뉴 레이블(destructive)</Menu.Button>
          </Menu.GroupItem>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
};

export const MenuStyles: Story = {
  render: () => (
    <FlexRow>
      <span className={getLabelClassName()}>solid style</span>
      <Menu.Root menuStyle='solid'>
        <Menu.Trigger asChild>
          <IconButton icon='menu-line' />
        </Menu.Trigger>
        <Menu.Content align='end'>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
      <span className={getLabelClassName()}>hollow style</span>
      <Menu.Root menuStyle='hollow'>
        <Menu.Trigger asChild>
          <IconButton icon='menu-line' />
        </Menu.Trigger>
        <Menu.Content align='start' sideOffset={10}>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
            <Menu.GroupItem>
              <Menu.Button>메뉴 레이블</Menu.Button>
            </Menu.GroupItem>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu.Content의 side, align, sideOffset, alignOffset 속성을 통해서 Menu.Content의 위치를 조정할 수 있습니다",
      },
    },
  },
};

export const Tree: Story = {
  render: args => (
    <Menu.Root open {...args}>
      <Menu.Trigger asChild>
        <IconButton icon='menu-line' />
      </Menu.Trigger>
      <Menu.Content side='right' align='start' sideOffset={10}>
        <Menu.Category>레이블</Menu.Category>
        {/* depth 1 헤더 */}
        <Menu.Tree
          label='메뉴 레이블 (fullWidthText)'
          defaultOpen
          fullWidthText
          suffixIconVisible={true}
          suffixIcon='blank'
        >
          {/* depth 2 리프 */}
          <Menu.Tree
            label='메뉴 레이블'
            withTreeButton={false}
            prefixIcon='arrow-right-s-line'
            fullWidthText
          />
          {/* depth 2 헤더 */}
          <Menu.Tree label='메뉴 레이블' defaultOpen>
            {/* depth 3 리프 */}
            <Menu.Tree
              label='메뉴 레이블(selected)'
              prefixIconVisible={true}
              prefixIcon='blank'
              fullWidthText
              withTreeButton={false}
            />
          </Menu.Tree>
          <Menu.Tree label='메뉴 레이블(disabled)' withTreeButton={false} disabled />
        </Menu.Tree>
        {/* depth 1 리프 */}
        <Menu.GroupItem>
          <Menu.Tree label='메뉴 레이블' withTreeButton={false} />
        </Menu.GroupItem>
      </Menu.Content>
    </Menu.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "계층적 관계의 항목을 탐색/선택하는 tree variant입니다. 펼쳐지는 브랜치는 Menu.Tree(label로 헤더 + chevron 렌더, defaultOpen/open으로 펼침 제어)로, 말단 항목은 기존 Menu.GroupItem + Menu.Button/Anchor로 구성합니다. depth는 중첩 깊이에 따라 자동으로 파생되어 들여쓰기됩니다.",
      },
    },
  },
};
