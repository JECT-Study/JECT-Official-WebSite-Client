import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { MenuItem } from ".";

const meta: Meta<typeof MenuItem.Button> = {
  title: "Components/Menu/MenuItem",
  component: MenuItem.Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["icon", "thumbnail"],
      description: "메뉴 아이템 변형 종류",
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
      description: "메뉴 아이템 크기",
    },
    disabled: {
      control: "boolean",
      description: "항목의 비활성화 여부",
    },
    isSelected: {
      control: "boolean",
      description: "항목 선택 여부",
    },
    isDestructive: {
      control: "boolean",
      description: "항목의 부정-파괴적 여부",
    },
    prefixIcon: {
      control: "select",
      description: "왼쪽 아이콘명",
    },
    suffixIcon: {
      control: "select",
      description: "오른쪽 아이콘명",
    },
    prefixIconVisible: {
      control: "boolean",
      description: "왼쪽 아이콘 가시 여부",
    },
    suffixIconVisible: {
      control: "boolean",
      description: "오른쪽 아이콘 가시 여부",
    },
    imageAlt: {
      control: "text",
      description: "썸네일 이미지 대체 텍스트",
    },
    imageSrc: {
      control: "text",
      description: "썸네일 이미지 URL",
    },
    children: {
      control: "text",
      description: "메뉴 아이템 텍스트",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "icon",
    size: "md",
    disabled: false,
    isSelected: false,
    isDestructive: false,
    prefixIcon: "blank",
    suffixIcon: "blank",
    prefixIconVisible: true,
    suffixIconVisible: true,
  },
  render: args => <MenuItem.Button {...args}>메뉴레이블</MenuItem.Button>,
  parameters: {
    docs: {
      description: {
        story:
          "MenuItem.Button, MenuItem.ItemAnchor 2가지 종류가 있습니다. (해당 스토리는 MenuItem.ItemButton을 사용했습니다)",
      },
    },
  },
};

export const MenuItemSizes: Story = {
  args: {
    disabled: false,
    isSelected: false,
    isDestructive: false,
    prefixIconVisible: true,
    suffixIconVisible: true,
  },
  render: args => (
    <FlexRow>
      <FlexColumn>
        <MenuItem.Button size='lg' {...args}>
          메뉴레이블
        </MenuItem.Button>
        <MenuItem.Button size='md' {...args}>
          메뉴레이블
        </MenuItem.Button>
        <MenuItem.Button size='sm' {...args}>
          메뉴레이블
        </MenuItem.Button>
      </FlexColumn>
      <FlexColumn>
        <MenuItem.Button size='lg' variant='thumbnail' {...args}>
          메뉴레이블
        </MenuItem.Button>
        <MenuItem.Button size='md' variant='thumbnail' {...args}>
          메뉴레이블
        </MenuItem.Button>
        <MenuItem.Button size='sm' variant='thumbnail' {...args}>
          메뉴레이블
        </MenuItem.Button>
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "스토리북의 controls를 활용해 상태를 변경해보세요",
      },
    },
  },
};

type AnchorStory = StoryObj<typeof MenuItem.Anchor>;

export const MenuItemAnchor: AnchorStory = {
  args: {
    variant: "icon",
    size: "md",
    disabled: false,
    isSelected: false,
    isDestructive: false,
    prefixIcon: "blank",
    suffixIcon: "blank",
    prefixIconVisible: true,
    suffixIconVisible: true,
    href: "/",
    children: "메뉴레이블",
  },
  render: args => <MenuItem.Anchor {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "페이지 이동 목적인 메뉴아이템은 MenuItem.Anchor를 사용합니다. a태그를 사용하며 href 속성을 사용할 경우에 tab 이동이 가능합니다",
      },
    },
  },
};
