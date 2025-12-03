import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl.Root> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
      description: "세그먼티드 컨트롤 사이즈",
    },
    defaultValue: {
      control: "text",
      description: "기본 선택된 세그먼티드 컨트롤 아이템",
    },
  },
} satisfies Meta<typeof SegmentedControl.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: args => (
    <SegmentedControl.Root defaultValue="option1" size={args.size}>
      <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "키보드로 탐색할 수 있습니다. Tab으로 컴포넌트에 포커스하고, 화살표 키(←/→)로 항목 간 이동 및 선택이 가능합니다.",
      },
    },
  },
};

export const DisabledItem: Story = {
  render: () => (
    <SegmentedControl.Root defaultValue="option1">
      <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
      <SegmentedControl.Item value="option2" disabled>
        Disabled
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option3">레이블</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "SegmentedControl.Item의 disabled 속성을 통해 비활성화시킬 수 있습니다.",
      },
    },
  },
};

export const ItemSizes: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>lg</Label>
        <SegmentedControl.Root size="lg" defaultValue="option1">
          <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        </SegmentedControl.Root>
      </FlexRow>
      <FlexRow>
        <Label>md</Label>
        <SegmentedControl.Root size="md" defaultValue="option1">
          <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        </SegmentedControl.Root>
      </FlexRow>
      <FlexRow>
        <Label>sm</Label>
        <SegmentedControl.Root size="sm" defaultValue="option1">
          <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        </SegmentedControl.Root>
      </FlexRow>
      <FlexRow>
        <Label>xs</Label>
        <SegmentedControl.Root size="xs" defaultValue="option1">
          <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        </SegmentedControl.Root>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "세그먼티드 컨트롤은 lg, md, sm, xs 사이즈를 제공합니다.",
      },
    },
  },
};

export const ItemCounts: Story = {
  render: () => (
    <FlexColumn>
      <SegmentedControl.Root defaultValue="option1">
        <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
      </SegmentedControl.Root>
      <SegmentedControl.Root defaultValue="option1">
        <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option3">레이블</SegmentedControl.Item>
      </SegmentedControl.Root>
      <SegmentedControl.Root defaultValue="option1">
        <SegmentedControl.Item value="option1">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option3">레이블</SegmentedControl.Item>
        <SegmentedControl.Item value="option4">레이블</SegmentedControl.Item>
      </SegmentedControl.Root>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "세그먼티드 컨트롤의 내부 항목 개수는 슬롯을 추가하는 방식으로 설정할 수 있습니다.",
      },
    },
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <SegmentedControl.Root defaultValue="option1">
      <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "defaultValue를 사용한 비제어 컴포넌트입니다. 내부적으로 상태를 관리합니다.",
      },
    },
  },
};

const ControlledExample = () => {
  const [value, setValue] = useState("option1");

  return (
    <FlexColumn>
      <SegmentedControl.Root value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
      </SegmentedControl.Root>
      <Label>Selected: {value}</Label>
    </FlexColumn>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: "value와 onValueChange를 사용한 제어 컴포넌트입니다. 외부에서 상태를 관리합니다.",
      },
    },
  },
};
