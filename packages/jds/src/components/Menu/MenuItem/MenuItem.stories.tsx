import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { MenuItem } from ".";

const SAMPLE_SRC = "https://picsum.photos/seed/jds-menu-item/80/80";

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
      description: "선행 영역 표현 방식 (아이콘 / 썸네일)",
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
      description: "메뉴 아이템 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    isSelected: {
      control: "boolean",
      description: "선택 상태 여부",
    },
    prefixIcon: {
      control: "select",
      description: "선행 아이콘명 (variant='icon'일 때)",
    },
    suffixIcon: {
      control: "select",
      description: "후행 아이콘명",
    },
    prefixIconVisible: {
      control: "boolean",
      description: "선행 아이콘 노출 여부",
    },
    suffixIconVisible: {
      control: "boolean",
      description: "후행 아이콘 노출 여부",
    },
    stretched: {
      control: "boolean",
      description: "패딩을 제거해 컨테이너 너비에 꽉 차게 배치",
    },
    fullWidthText: {
      control: "boolean",
      description: "라벨을 남은 공간만큼 확장해 후행 요소를 오른쪽 끝으로 정렬",
    },
    imageAlt: {
      control: "text",
      description: "썸네일 대체 텍스트 (variant='thumbnail'일 때)",
    },
    imageSrc: {
      control: "text",
      description: "썸네일 이미지 URL (variant='thumbnail'일 때)",
    },
    children: {
      control: "text",
      description: "메뉴 아이템 라벨",
    },
  },
  args: {
    variant: "icon",
    size: "md",
    disabled: false,
    isSelected: false,
    prefixIcon: "blank",
    suffixIcon: "blank",
    prefixIconVisible: true,
    suffixIconVisible: true,
    stretched: false,
    fullWidthText: false,
    children: "메뉴 레이블",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <MenuItem.Button {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "MenuItem은 버튼형(MenuItem.Button)과 링크형(MenuItem.Anchor) 두 종류가 있습니다. 이 스토리는 MenuItem.Button이며, 우측 Controls로 각 속성을 바꿔볼 수 있습니다.",
      },
    },
  },
};

export const Sizes: Story = {
  render: args => (
    <FlexRow>
      <FlexColumn>
        <MenuItem.Button {...args} size='lg' />
        <MenuItem.Button {...args} size='md' />
        <MenuItem.Button {...args} size='sm' />
      </FlexColumn>
      <FlexColumn>
        <MenuItem.Button {...args} size='lg' variant='thumbnail' imageSrc={SAMPLE_SRC} imageAlt='샘플' />
        <MenuItem.Button {...args} size='md' variant='thumbnail' imageSrc={SAMPLE_SRC} imageAlt='샘플' />
        <MenuItem.Button {...args} size='sm' variant='thumbnail' imageSrc={SAMPLE_SRC} imageAlt='샘플' />
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "왼쪽은 icon variant, 오른쪽은 thumbnail variant입니다. lg / md / sm 크기를 비교해 보세요.",
      },
    },
  },
};

export const States: Story = {
  render: args => (
    <FlexColumn>
      <MenuItem.Button {...args}>기본</MenuItem.Button>
      <MenuItem.Button {...args} isSelected>
        선택됨 (isSelected)
      </MenuItem.Button>
      <MenuItem.Button {...args} disabled>
        비활성 (disabled)
      </MenuItem.Button>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 / 선택(isSelected) / 비활성(disabled) 상태를 한눈에 비교합니다.",
      },
    },
  },
};

export const Layout: Story = {
  args: {
    suffixIconVisible: true,
    suffixIcon: "arrow-right-s-line",
  },
  render: args => (
    <FlexColumn style={{ width: "200px" }}>
      <MenuItem.Button {...args} fullWidthText>
        fullWidthText
      </MenuItem.Button>
      <MenuItem.Button {...args}>기본 (label 너비만큼)</MenuItem.Button>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "fullWidthText를 켜면 라벨이 남은 공간을 모두 차지해 후행 아이콘/배지가 오른쪽 끝으로 정렬됩니다. stretched는 아이템의 좌우 패딩을 제거해 컨테이너에 꽉 차게 배치할 때 사용합니다.",
      },
    },
  },
};

type AnchorStory = StoryObj<typeof MenuItem.Anchor>;

export const Anchor: AnchorStory = {
  args: {
    variant: "icon",
    size: "md",
    disabled: false,
    isSelected: false,
    href: "/",
    prefixIcon: "blank",
    prefixIconVisible: true,
    suffixIconVisible: false,
    suffixBadgeVisible: true,
    suffixBadge: 99,
    suffixBadgeMuted: false,
    fullWidthText: true,
    children: "메뉴 레이블",
  },
  argTypes: {
    href: {
      control: "text",
      description: "이동 경로 (a 태그 href)",
    },
    suffixBadge: {
      control: "text",
      description: "후행 NumericBadge 값",
    },
    suffixBadgeVisible: {
      control: "boolean",
      description: "후행 배지 노출 여부",
    },
    suffixBadgeMuted: {
      control: "boolean",
      description: "배지 muted(저강조) 스타일 여부",
    },
  },
  render: args => (
    <div style={{ width: "200px" }}>
      <MenuItem.Anchor {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "페이지 이동용 메뉴 아이템은 MenuItem.Anchor를 사용합니다. a 태그로 렌더되어 href로 탭 이동이 가능하며, 후행에 NumericBadge를 노출할 수 있습니다(suffixBadge / suffixBadgeVisible / suffixBadgeMuted).",
      },
    },
  },
};
