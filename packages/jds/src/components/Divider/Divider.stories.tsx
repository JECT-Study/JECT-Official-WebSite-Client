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
    <FlexColumn gap="24px" style={{ width: "300px" }}>
      <FlexColumn gap="8px">
        <Label>Normal (1px):</Label>
        <Divider thickness="normal" />
      </FlexColumn>
      <FlexColumn gap="8px">
        <Label>Bold (2px):</Label>
        <Divider thickness="bold" />
      </FlexColumn>
      <FlexColumn gap="8px">
        <Label>Bolder (4px):</Label>
        <Divider thickness="bolder" />
      </FlexColumn>
      <FlexColumn gap="8px">
        <Label>Boldest (8px):</Label>
        <Divider thickness="boldest" />
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
    <FlexColumn gap="24px" style={{ width: "300px" }}>
      <FlexColumn gap="8px">
        <Label>Solid (기본값):</Label>
        <Divider variant="solid" />
      </FlexColumn>
      <FlexColumn gap="8px">
        <Label>Dashed:</Label>
        <Divider variant="dashed" />
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

export const HorizontalDivider: Story = {
  render: () => (
    <FlexColumn gap="16px" style={{ width: "400px" }}>
      <div>섹션 1의 콘텐츠</div>
      <Divider />
      <div>섹션 2의 콘텐츠</div>
      <Divider thickness="bold" />
      <div>섹션 3의 콘텐츠</div>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal divider는 `<hr>` 태그를 사용하여 섹션을 수평으로 구분합니다. " +
          'Semantic HTML을 준수하며, 스크린 리더는 이를 "Horizontal Splitter"로 읽습니다.',
      },
    },
  },
};

export const VerticalDivider: Story = {
  render: () => (
    <FlexRow gap="16px" style={{ height: "100px", alignItems: "stretch" }}>
      <div>좌측 콘텐츠</div>
      <Divider orientation="vertical" />
      <div>중앙 콘텐츠</div>
      <Divider orientation="vertical" thickness="bold" />
      <div>우측 콘텐츠</div>
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

export const DashedDivider: Story = {
  render: () => (
    <FlexColumn gap="24px" style={{ width: "400px" }}>
      <FlexColumn gap="16px">
        <h4 style={{ margin: 0 }}>수평 Dashed</h4>
        <div>섹션 1</div>
        <Divider variant="dashed" />
        <div>섹션 2</div>
        <Divider variant="dashed" thickness="bold" />
        <div>섹션 3</div>
      </FlexColumn>
      <FlexRow gap="16px" style={{ height: "100px", alignItems: "stretch" }}>
        <div>좌측</div>
        <Divider orientation="vertical" variant="dashed" />
        <div>중앙</div>
        <Divider orientation="vertical" variant="dashed" thickness="bold" />
        <div>우측</div>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'variant="dashed"를 사용하여 점선 스타일의 구분선을 만들 수 있습니다.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ margin: "0 0 16px 0" }}>카드 제목</h3>
      <p style={{ margin: "0 0 16px 0" }}>첫 번째 정보 그룹입니다.</p>
      <Divider />
      <p style={{ margin: "16px 0 0 0" }}>두 번째 정보 그룹입니다.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "카드 내부에서 정보 그룹을 구분할 때 사용할 수 있습니다.(실제 Card 컴포넌트를 사용하지 않음)",
      },
    },
  },
};

export const InFlexLayout: Story = {
  render: () => (
    <FlexRow gap="16px" style={{ height: "200px", width: "500px" }}>
      <FlexColumn style={{ flex: 1, padding: "16px", backgroundColor: "#f5f5f5" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>사이드바</h4>
        <p style={{ margin: 0, fontSize: "14px" }}>사이드바 콘텐츠</p>
      </FlexColumn>
      <Divider orientation="vertical" thickness="normal" />
      <FlexColumn style={{ flex: 2, padding: "16px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>메인 콘텐츠</h4>
        <p style={{ margin: 0, fontSize: "14px" }}>메인 콘텐츠 영역</p>
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "Flex 레이아웃에서 수직 divider를 사용하여 영역을 구분할 수 있습니다.",
      },
    },
  },
};

export const DecorativeDivider: Story = {
  render: () => (
    <FlexColumn gap="16px" style={{ width: "400px" }}>
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

export const StyleGuide: Story = {
  render: () => (
    <FlexColumn gap="32px" style={{ width: "700px", fontSize: "14px" }}>
      <div>
        <h3 style={{ margin: "0 0 16px 0" }}>스타일 가이드</h3>
      </div>

      <Divider />

      <div>
        <h4 style={{ margin: "0 0 12px 0" }}>기본 사용</h4>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            margin: 0,
          }}
        >
          {`<Divider />
<Divider orientation="vertical" />
<Divider thickness="bold" />
<Divider variant="dashed" />`}
        </pre>
      </div>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 스타일 구현 원칙과 사용 가이드입니다.",
      },
    },
  },
};
