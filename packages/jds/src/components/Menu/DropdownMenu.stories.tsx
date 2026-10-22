import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { action } from "storybook/actions";
import { expect, userEvent, within } from "storybook/test";
import { vars } from "tokens";

import { DropdownMenu } from "./DropdownMenu";

import { IconButton } from "@/components/Button/IconButton";
import { getLabelClassName } from "@/utils/typography";

/**
 * 트리거로 여닫는 메뉴입니다. `role="menu"`를 가지며 화살표 이동, typeahead, Escape 닫기를
 * 제공합니다. 여닫을 필요가 없으면 `Menu`를 사용합니다.
 */
const meta: Meta<typeof DropdownMenu.Root> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu.Root,
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

interface RouterLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  to: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...restProps }, ref) => (
  <a ref={ref} {...restProps} href={to} />
));

RouterLink.displayName = "RouterLink";

/**
 * 동작은 `DropdownMenu.Button`, 이동은 `DropdownMenu.Anchor`를 사용합니다.
 */
export const Default: Story = {
  render: args => (
    <DropdownMenu.Root {...args}>
      <DropdownMenu.Trigger asChild>
        <IconButton icon='menu' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side='right' align='start' sideOffset={10} style={{ width: "200px" }}>
        <DropdownMenu.Category>카테고리</DropdownMenu.Category>
        <DropdownMenu.Group>
          <DropdownMenu.Button autoFocus fullWidthText suffixIconVisible suffixIcon='chevron-right'>
            메뉴 레이블
          </DropdownMenu.Button>
          <DropdownMenu.Button isSelected>메뉴 레이블 (selected)</DropdownMenu.Button>
          <DropdownMenu.Button disabled>메뉴 레이블 (disabled)</DropdownMenu.Button>
          <DropdownMenu.Anchor href='#' fullWidthText suffixBadgeVisible suffixBadge={5}>
            메뉴 레이블 (badge)
          </DropdownMenu.Anchor>
          <DropdownMenu.Anchor asChild fullWidthText suffixIconVisible suffixIcon='arrow-up-right'>
            <RouterLink to='#'>메뉴 레이블 (asChild)</RouterLink>
          </DropdownMenu.Anchor>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
};

/**
 * `solid`는 배경과 그림자가 있는 팝오버, `hollow`는 항목만 노출하는 스타일입니다.
 */
export const MenuStyles: Story = {
  render: () => (
    <FlexRow>
      <span className={getLabelClassName()} style={{ color: vars.color.semantic.object.bold }}>
        solid style
      </span>
      <DropdownMenu.Root menuStyle='solid'>
        <DropdownMenu.Trigger asChild>
          <IconButton icon='menu' />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='end'>
          <DropdownMenu.Category>카테고리</DropdownMenu.Category>
          <DropdownMenu.Group>
            <DropdownMenu.Button autoFocus>메뉴 레이블</DropdownMenu.Button>
            <DropdownMenu.Button>메뉴 레이블</DropdownMenu.Button>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <span className={getLabelClassName()} style={{ color: vars.color.semantic.object.bold }}>
        hollow style
      </span>
      <DropdownMenu.Root menuStyle='hollow'>
        <DropdownMenu.Trigger asChild>
          <IconButton icon='menu' />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='start' sideOffset={10}>
          <DropdownMenu.Category>카테고리</DropdownMenu.Category>
          <DropdownMenu.Group>
            <DropdownMenu.Button autoFocus>메뉴 레이블</DropdownMenu.Button>
            <DropdownMenu.Button>메뉴 레이블</DropdownMenu.Button>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </FlexRow>
  ),
};

/**
 * 계층 항목을 탐색하고 선택하는 tree variant입니다. 브랜치는 `DropdownMenu.Tree`,
 * 말단 항목은 `withTreeButton={false}`로 표현합니다. chevron 클릭 또는 좌우 화살표 키로 펼치고
 * 라벨 클릭이나 Enter로 선택합니다.
 */
export const Tree: Story = {
  render: args => (
    <DropdownMenu.Root {...args}>
      <DropdownMenu.Trigger asChild>
        <IconButton icon='menu' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content side='right' align='start' sideOffset={10} style={{ width: "220px" }}>
        <DropdownMenu.Category>카테고리</DropdownMenu.Category>
        {/* 최상위 트리는 DropdownMenu.Group(ul) 안에 둬야 유효한 리스트 마크업이 된다 */}
        <DropdownMenu.Group>
          {/* depth 1 — 자식이 있는 펼침 헤더 (chevron 클릭 또는 좌우 화살표 키로 토글, 라벨 클릭/Enter 는 항목 선택) */}
          <DropdownMenu.Tree
            label='상위 메뉴'
            autoFocus
            defaultOpen
            fullWidthText
            onClick={() => onItemClick("상위 메뉴")}
          >
            {/* depth 2 — 말단 항목 (withTreeButton={false} 로 chevron 자리 비움) */}
            <DropdownMenu.Tree
              label='하위 메뉴'
              withTreeButton={false}
              fullWidthText
              onClick={() => onItemClick("하위 메뉴")}
            />
            {/* depth 2 — 다시 펼쳐지는 헤더 */}
            <DropdownMenu.Tree
              label='하위 그룹'
              defaultOpen
              fullWidthText
              onClick={() => onItemClick("하위 그룹")}
            >
              {/* depth 3 — 선택 / 비활성 말단 항목 */}
              <DropdownMenu.Tree
                label='선택된 항목'
                withTreeButton={false}
                fullWidthText
                isSelected
                onClick={() => onItemClick("선택된 항목")}
              />
              <DropdownMenu.Tree
                label='비활성 항목'
                withTreeButton={false}
                fullWidthText
                disabled
              />
            </DropdownMenu.Tree>
          </DropdownMenu.Tree>
          {/* depth 1 — 단독 말단 항목 */}
          <DropdownMenu.Tree
            label='단일 메뉴'
            withTreeButton={false}
            fullWidthText
            suffixIconVisible
            suffixIcon='arrow-up-right'
            onClick={() => onItemClick("단일 메뉴")}
          />
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
};
