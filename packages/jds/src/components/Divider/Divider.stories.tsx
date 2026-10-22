import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";

import { Divider } from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    thickness: {
      control: "select",
      options: ["normal", "bold", "bolder", "boldest"],
      description: "디바이더의 선 굵기",
      table: {
        defaultValue: { summary: "normal" },
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "디바이더의 선 방향",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    variant: {
      control: "select",
      options: ["solid", "dashed"],
      description: "디바이더의 선 스타일",
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    decorative: {
      control: "boolean",
      description: "순수 장식용일 때 스크린 리더에서 숨김 처리",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    dashLength: {
      control: "number",
      description: "점선 한 칸의 길이(px), variant가 dashed일 때만 반영",
      table: {
        defaultValue: { summary: "6" },
      },
    },
    dashGap: {
      control: "number",
      description: "점선 사이 간격(px), 지정하지 않으면 dashLength를 따라감",
      table: {
        defaultValue: { summary: "dashLength" },
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    thickness: "normal",
    orientation: "horizontal",
  },
  render: args => {
    const isVertical = args.orientation === "vertical";

    return (
      <div
        style={
          isVertical
            ? { height: "100px", display: "flex", alignItems: "stretch" }
            : { width: "300px" }
        }
      >
        <Divider {...args} />
      </div>
    );
  },
};

export const AllThicknesses: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "300px" }}>
      <FlexColumn gap='8px'>
        <Label>Normal (1px):</Label>
        <Divider thickness='normal' />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>Bold (2px):</Label>
        <Divider thickness='bold' />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>Bolder (4px):</Label>
        <Divider thickness='bolder' />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>Boldest (8px):</Label>
        <Divider thickness='boldest' />
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "디바이더의 선 굵기를 4단계로 조절할 수 있습니다.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "300px" }}>
      <FlexColumn gap='8px'>
        <Label>Solid (기본값):</Label>
        <Divider variant='solid' />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>Dashed:</Label>
        <Divider variant='dashed' />
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "디바이더의 선 스타일을 solid(실선)과 dashed(점선)로 변경할 수 있습니다.",
      },
    },
  },
};

export const DashSpacing: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "300px" }}>
      <FlexColumn gap='8px'>
        <Label>기본값 (6 / 6):</Label>
        <Divider variant='dashed' />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>dashLength=2 (2 / 2):</Label>
        <Divider variant='dashed' dashLength={2} />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>dashLength=2, dashGap=6:</Label>
        <Divider variant='dashed' dashLength={2} dashGap={6} />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label>dashLength=12, dashGap=4, thickness=bold:</Label>
        <Divider variant='dashed' dashLength={12} dashGap={4} thickness='bold' />
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "점선 간격은 기본값이 6px / 6px이고 dashLength와 dashGap으로 조정합니다. dashGap을 생략하면 dashLength를 따라갑니다.",
      },
    },
  },
};

export const VerticalDivider: Story = {
  render: () => (
    <FlexRow gap='16px' style={{ height: "100px", alignItems: "stretch" }}>
      <div>좌측 콘텐츠</div>
      <Divider orientation='vertical' />
      <div>중앙 콘텐츠</div>
      <Divider orientation='vertical' thickness='bold' />
      <div>우측 콘텐츠</div>
      <Divider orientation='vertical' variant='dashed' />
      <div>점선 구분</div>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical divider는 `<div role="separator" aria-orientation="vertical">`를 사용하여 ' +
          "콘텐츠를 수직으로 구분합니다. WAI-ARIA 명세를 준수합니다.",
      },
    },
  },
};

export const DecorativeDivider: Story = {
  render: () => (
    <FlexColumn gap='16px' style={{ width: "400px" }}>
      <div>섹션 1</div>
      <Divider decorative />
      <div>섹션 2 (위 divider는 스크린 리더에서 무시됩니다)</div>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'decorative prop을 true로 설정하면 `aria-hidden="true"`가 추가되어 ' +
          "스크린 리더가 이를 무시합니다. 순수 장식 목적일 때 사용하세요.",
      },
    },
  },
};
