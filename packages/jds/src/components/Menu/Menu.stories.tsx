import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { expect, within } from "storybook/test";

import { Menu } from "./Menu";

const SAMPLE_SRC = "/images/defaultImage.png";

/**
 * 트리거 없이 펼쳐둔 메뉴입니다. 푸터나 사이드바처럼 여닫을 필요가 없는 자리에 사용합니다.
 * 여닫는 동작과 메뉴 role이 필요하면 `DropdownMenu`를 사용합니다.
 */
const meta: Meta<typeof Menu.Root> = {
  title: "Components/Menu",
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
    menuStyle: "hollow",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

interface RouterLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  to: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...restProps }, ref) => (
  <a ref={ref} {...restProps} href={to} />
));

RouterLink.displayName = "RouterLink";

/**
 * 동작은 `Menu.Button`, 이동은 `Menu.Anchor`를 사용합니다.
 */
export const Default: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Content style={{ width: "200px" }}>
        <Menu.Category>카테고리</Menu.Category>
        <Menu.Group>
          <Menu.Button fullWidthText suffixIconVisible suffixIcon='chevron-right'>
            메뉴 레이블
          </Menu.Button>
          <Menu.Button isSelected>메뉴 레이블 (selected)</Menu.Button>
          <Menu.Button disabled>메뉴 레이블 (disabled)</Menu.Button>
          <Menu.Anchor href='#' fullWidthText suffixBadgeVisible suffixBadge={5}>
            메뉴 레이블 (badge)
          </Menu.Anchor>
          <Menu.Anchor asChild fullWidthText suffixIconVisible suffixIcon='arrow-up-right'>
            <RouterLink to='#'>메뉴 레이블 (asChild)</RouterLink>
          </Menu.Anchor>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
};

/**
 * lg, md, sm 순서입니다. 각 메뉴의 위는 icon variant, 아래는 thumbnail variant입니다.
 * 크기는 `Menu.Root`에 지정하면 항목까지 전달됩니다.
 */
export const Sizes: Story = {
  render: ({ menuStyle }) => (
    <FlexRow>
      {(["lg", "md", "sm"] as const).map(size => (
        <Menu.Root key={size} size={size} menuStyle={menuStyle}>
          <Menu.Content>
            <Menu.Group>
              <Menu.Button prefixIconVisible>메뉴 레이블</Menu.Button>
              <Menu.Button variant='thumbnail' imageSrc={SAMPLE_SRC} imageAlt='샘플'>
                메뉴 레이블
              </Menu.Button>
            </Menu.Group>
          </Menu.Content>
        </Menu.Root>
      ))}
    </FlexRow>
  ),
};

/**
 * 기본, 선택(`isSelected`), 비활성(`disabled`) 상태를 비교합니다.
 */
export const States: Story = {
  render: args => (
    <Menu.Root {...args}>
      <Menu.Content>
        <Menu.Group>
          <Menu.Button>기본</Menu.Button>
          <Menu.Button isSelected>선택됨 (isSelected)</Menu.Button>
          <Menu.Button disabled>비활성 (disabled)</Menu.Button>
          <Menu.Anchor href='#' disabled>
            비활성 링크 (disabled)
          </Menu.Anchor>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledLink = canvas.getByRole("link", { name: "비활성 링크 (disabled)" });

    await expect(disabledLink).not.toHaveAttribute("href");
    await expect(disabledLink).toHaveAttribute("aria-disabled", "true");
    await expect(disabledLink).toHaveAttribute("tabindex", "-1");
  },
};

/**
 * `fullWidthText`를 켜면 라벨이 남은 공간을 모두 차지해 후행 아이콘과 배지가 오른쪽 끝으로
 * 정렬됩니다. `stretched`는 항목의 좌우 여백을 제거해 컨테이너에 꽉 차게 배치할 때 사용합니다.
 */
export const Layout: Story = {
  render: args => (
    <FlexColumn>
      <Menu.Root {...args}>
        <Menu.Content style={{ width: "200px" }}>
          <Menu.Group>
            <Menu.Button fullWidthText suffixIconVisible suffixIcon='chevron-right'>
              fullWidthText
            </Menu.Button>
            <Menu.Button suffixIconVisible suffixIcon='chevron-right'>
              기본 (label 너비만큼)
            </Menu.Button>
          </Menu.Group>
        </Menu.Content>
      </Menu.Root>
    </FlexColumn>
  ),
};
