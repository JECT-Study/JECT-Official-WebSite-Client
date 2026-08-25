import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";
import { action } from "storybook/actions";
import { expect, userEvent, within } from "storybook/test";
import { vars } from "tokens";

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
const onItemClick = action("menu-item-click");

export const Default: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Trigger asChild>
        <IconButton icon='menu' />
      </Menu.Trigger>
      <Menu.Content side='right' align='start' sideOffset={10} style={{ width: "200px" }}>
        <Menu.Category>카테고리</Menu.Category>
        <Menu.Group>
          <Menu.Button autoFocus fullWidthText suffixIconVisible suffixIcon='chevron-right'>
            메뉴 레이블
          </Menu.Button>
          <Menu.Button isSelected>메뉴 레이블 (selected)</Menu.Button>
          <Menu.Button disabled>메뉴 레이블 (disabled)</Menu.Button>
          <Menu.Anchor href='#' fullWidthText suffixBadgeVisible suffixBadge={5}>
            메뉴 레이블 (badge)
          </Menu.Anchor>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 메뉴 구성. 동작은 Menu.Button, 이동은 Menu.Anchor를 사용합니다.",
      },
    },
  },
};

export const MenuStyles: Story = {
  render: () => (
    <FlexRow>
      <span className={getLabelClassName()} style={{ color: vars.color.semantic.object.bold }}>
        solid style
      </span>
      <Menu.Root menuStyle='solid'>
        <Menu.Trigger asChild>
          <IconButton icon='menu' />
        </Menu.Trigger>
        <Menu.Content align='end'>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.Button autoFocus>메뉴 레이블</Menu.Button>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
      <span className={getLabelClassName()} style={{ color: vars.color.semantic.object.bold }}>
        hollow style
      </span>
      <Menu.Root menuStyle='hollow'>
        <Menu.Trigger asChild>
          <IconButton icon='menu' />
        </Menu.Trigger>
        <Menu.Content align='start' sideOffset={10}>
          <Menu.Category>카테고리</Menu.Category>
          <Menu.Group>
            <Menu.Button autoFocus>메뉴 레이블</Menu.Button>
            <Menu.Button>메뉴 레이블</Menu.Button>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "solid는 배경/그림자가 있는 팝오버, hollow는 항목만 노출하는 스타일입니다.",
      },
    },
  },
};

export const Tree: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Trigger asChild>
        <IconButton icon='menu' />
      </Menu.Trigger>
      <Menu.Content side='right' align='start' sideOffset={10} style={{ width: "220px" }}>
        <Menu.Category>카테고리</Menu.Category>

        {/* 최상위 트리는 Menu.Group(ul) 안에 둬야 유효한 리스트 마크업이 된다 */}
        <Menu.Group>
          {/* depth 1 — 자식이 있는 펼침 헤더 (chevron 클릭/←·→ 로 토글, 라벨 클릭/Enter 는 항목 선택) */}
          <Menu.Tree
            label='상위 메뉴'
            autoFocus
            defaultOpen
            fullWidthText
            onClick={() => onItemClick("상위 메뉴")}
          >
            {/* depth 2 — 말단 항목 (withTreeButton={false} 로 chevron 자리 비움) */}
            <Menu.Tree
              label='하위 메뉴'
              withTreeButton={false}
              fullWidthText
              onClick={() => onItemClick("하위 메뉴")}
            />

            {/* depth 2 — 다시 펼쳐지는 헤더 */}
            <Menu.Tree
              label='하위 그룹'
              defaultOpen
              fullWidthText
              onClick={() => onItemClick("하위 그룹")}
            >
              {/* depth 3 — 선택 / 비활성 말단 항목 */}
              <Menu.Tree
                label='선택된 항목'
                withTreeButton={false}
                fullWidthText
                isSelected
                onClick={() => onItemClick("선택된 항목")}
              />
              <Menu.Tree label='비활성 항목' withTreeButton={false} fullWidthText disabled />
            </Menu.Tree>
          </Menu.Tree>

          {/* depth 1 — 단독 말단 항목 */}
          <Menu.Tree
            label='단일 메뉴'
            withTreeButton={false}
            fullWidthText
            suffixIconVisible
            suffixIcon='arrow-up-right'
            onClick={() => onItemClick("단일 메뉴")}
          />
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
  // 키보드(↓)로 메뉴를 열면 WAI-ARIA 메뉴 표준에 따라 첫 항목으로 포커스가 이동하는 것을 시연한다.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const firstItem = await canvas.findByRole("menuitem", { name: "상위 메뉴" });
    await expect(firstItem).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: `계층 항목을 탐색/선택하는 tree variant입니다.\n
브랜치는 Menu.Tree, 말단 항목은 withTreeButton={false}로 표현합니다. chevron·→/← 로 펼치고 라벨 클릭·Enter로 선택합니다.`,
      },
    },
  },
};
