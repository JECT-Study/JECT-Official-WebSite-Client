import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { SegmentedControls } from "./SegmentedControls";
import type { SegmentedControlsSize } from "./segmentedControls.types";

const sizes = ["lg", "md", "sm", "xs"] as const satisfies readonly SegmentedControlsSize[];
const storyWidth = "22.5rem";
const labelWidth = "3ch";

const options = [
  { value: "option1", label: "레이블" },
  { value: "option2", label: "레이블" },
  { value: "option3", label: "레이블" },
] as const;
const optionValues = options.map(({ value }) => value);

const renderItems = (
  items: readonly {
    value: string;
    label: string;
    disabled?: boolean;
  }[] = options,
) =>
  items.map(({ value, label, disabled }) => (
    <SegmentedControls.Item key={value} value={value} disabled={disabled}>
      {label}
    </SegmentedControls.Item>
  ));

const ControlledExample = () => {
  const [value, setValue] = useState("option1");

  return (
    <FlexColumn gap='0.75rem' style={{ width: storyWidth }}>
      <SegmentedControls.Root value={value} onValueChange={setValue}>
        {renderItems([
          { value: "option1", label: "목록" },
          { value: "option2", label: "카드" },
          { value: "option3", label: "표" },
        ])}
      </SegmentedControls.Root>
      <Label>Selected: {value}</Label>
    </FlexColumn>
  );
};

const meta: Meta<typeof SegmentedControls.Root> = {
  title: "Components/SegmentedControls",
  component: SegmentedControls.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "컴포넌트의 시각적 크기입니다.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    defaultValue: {
      control: "select",
      options: optionValues,
      description: "기본 선택된 세그먼티드 컨트롤 아이템입니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성화되었는지의 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    asChild: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof SegmentedControls.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    defaultValue: "option1",
    disabled: false,
  },
  render: args => (
    <SegmentedControls.Root key={`${args.size}-${args.defaultValue}-${args.disabled}`} {...args}>
      {renderItems()}
    </SegmentedControls.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "라디오처럼 여러 옵션 중 하나를 선택해 연관된 뷰나 상태, 표시 형식을 전환하는 컴포넌트입니다. Root가 Item들을 감싸며, Item 내부 텍스트는 한 줄 말줄임으로 표시됩니다. Tab으로 포커스하고, 화살표 키(←/→, ↑/↓)로 항목 간 이동 및 선택이 가능합니다.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <FlexColumn gap='1.25rem' style={{ width: storyWidth }}>
      <FlexColumn gap='0.5rem'>
        <Label>Default</Label>
        <SegmentedControls.Root defaultValue='option2'>{renderItems()}</SegmentedControls.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Item disabled</Label>
        <SegmentedControls.Root defaultValue='option1'>
          {renderItems([
            { value: "option1", label: "레이블" },
            { value: "option2", label: "레이블", disabled: true },
            { value: "option3", label: "레이블" },
          ])}
        </SegmentedControls.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Root disabled</Label>
        <SegmentedControls.Root defaultValue='option1' disabled>
          {renderItems()}
        </SegmentedControls.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Focused</Label>
        <SegmentedControls.Root defaultValue='option2'>
          {renderItems([
            { value: "option1", label: "레이블" },
            { value: "option2", label: "레이블" },
            { value: "option3", label: "레이블", disabled: true },
          ])}
        </SegmentedControls.Root>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Item은 rest, hover, active, focused 상태를 가지며 선택된 항목은 data-state='checked'로 표현됩니다. 선택된 항목을 다시 눌러도 해제되지 않고, 다른 항목을 선택하면 기존 선택이 해제됩니다. Item 또는 Root의 disabled 속성으로 비활성화할 수 있습니다.",
      },
    },
  },
};

export const ItemSizes: Story = {
  render: () => (
    <FlexColumn gap='0.75rem' style={{ width: storyWidth }}>
      {sizes.map(size => (
        <FlexRow key={size} gap='0.75rem'>
          <Label style={{ width: labelWidth }}>{size}</Label>
          <SegmentedControls.Root size={size} defaultValue='option1'>
            {renderItems(options.slice(0, 2))}
          </SegmentedControls.Root>
        </FlexRow>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: `세그먼티드 컨트롤은 ${sizes.join(", ")} 사이즈를 제공합니다. 주변 UI 요소와 디바이스 환경에 맞는 크기를 선택합니다.`,
      },
    },
  },
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

export const Sizing: Story = {
  render: () => (
    <FlexColumn gap='1.25rem' style={{ width: storyWidth }}>
      <FlexColumn gap='0.5rem'>
        <Label>부모 채움 (기본)</Label>
        <SegmentedControls.Root defaultValue='option1'>{renderItems()}</SegmentedControls.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>래퍼로 너비 제어 (15rem)</Label>
        <div style={{ width: "15rem" }}>
          <SegmentedControls.Root defaultValue='option1'>{renderItems()}</SegmentedControls.Root>
        </div>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>래퍼로 너비 제어 (10rem)</Label>
        <div style={{ width: "10rem" }}>
          <SegmentedControls.Root defaultValue='option1'>
            {renderItems(options.slice(0, 2))}
          </SegmentedControls.Root>
        </div>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "세그먼티드 컨트롤의 기본 너비는 부모 레이아웃을 채우는 width: 100%(Figma의 fill)입니다. 특정 너비가 필요하면 컴포넌트에 직접 width를 주지 않고, 소비처에서 원하는 너비의 래퍼로 감싸 사이즈를 제어합니다. 화면 전체 너비로 늘어나면 위계가 무너지므로 넓은 레이아웃에서는 래퍼로 적절한 너비를 의도하는 것이 권장됩니다.",
      },
    },
  },
};
