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
      description: "메뉴 컨테이너 스타일 (배경/그림자 유무)",
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
      description: "메뉴 아이템 크기",
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
      <Menu.Content side='right' align='start' sideOffset={10} style={{ width: "200px" }}>
        <Menu.Category>카테고리</Menu.Category>
        <Menu.Group>
          <Menu.GroupItem>
            <Menu.Button fullWidthText suffixIconVisible suffixIcon='arrow-right-s-line'>
              메뉴 레이블
            </Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button isSelected>메뉴 레이블 (selected)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Button disabled>메뉴 레이블 (disabled)</Menu.Button>
          </Menu.GroupItem>
          <Menu.GroupItem>
            <Menu.Anchor href='/' fullWidthText suffixBadgeVisible suffixBadge={5}>
              메뉴 레이블 (badge)
            </Menu.Anchor>
          </Menu.GroupItem>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "기본 메뉴 구성입니다. 동작용 항목은 Menu.Button, 페이지 이동용 항목은 Menu.Anchor(후행 배지 노출 가능)를 사용합니다. 우측 Controls로 menuStyle / size를 바꿔볼 수 있습니다.",
      },
    },
  },
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
          "solid는 배경/테두리/그림자가 있는 팝오버, hollow는 컨테이너 장식 없이 항목만 노출하는 스타일입니다. Menu.Content의 side / align / sideOffset으로 위치를 조정합니다.",
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
      <Menu.Content side='right' align='start' sideOffset={10} style={{ width: "220px" }}>
        <Menu.Category>카테고리</Menu.Category>

        {/* depth 1 — 자식이 있는 펼침 헤더 (chevron 노출, 클릭/←·→ 로 토글) */}
        <Menu.Tree label='상위 메뉴' defaultOpen fullWidthText>
          {/* depth 2 — 말단 항목 (withTreeButton={false} 로 chevron 자리 비움) */}
          <Menu.Tree label='하위 메뉴' withTreeButton={false} fullWidthText />

          {/* depth 2 — 다시 펼쳐지는 헤더 */}
          <Menu.Tree label='하위 그룹' defaultOpen fullWidthText>
            {/* depth 3 — 선택 / 비활성 말단 항목 */}
            <Menu.Tree label='선택된 항목' withTreeButton={false} fullWidthText isSelected />
            <Menu.Tree label='비활성 항목' withTreeButton={false} fullWidthText disabled />
          </Menu.Tree>
        </Menu.Tree>

        {/* depth 1 — 단독 말단 항목 */}
        <Menu.Tree
          label='단일 메뉴'
          withTreeButton={false}
          fullWidthText
          suffixIconVisible
          suffixIcon='arrow-right-up-line'
        />
      </Menu.Content>
    </Menu.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "계층적 항목을 탐색/선택하는 tree variant입니다. 펼쳐지는 브랜치는 Menu.Tree(label로 헤더 + chevron 렌더, defaultOpen/open으로 펼침 제어)로 구성하고, 말단 항목은 withTreeButton={false}로 chevron 없이 표현합니다. chevron 클릭 또는 →/← 키로 펼치고 접을 수 있으며, depth는 중첩 깊이에 따라 자동으로 들여쓰기됩니다.",
      },
    },
  },
};
