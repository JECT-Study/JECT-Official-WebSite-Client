import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { SegmentedControl } from "./SegmentedControl";
import type { SegmentedControlSize } from "./segmentedControl.types";

const sizes = ["lg", "md", "sm", "xs"] as const satisfies readonly SegmentedControlSize[];
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
    <SegmentedControl.Item key={value} value={value} disabled={disabled}>
      {label}
    </SegmentedControl.Item>
  ));

const ControlledExample = () => {
  const [value, setValue] = useState("option1");

  return (
    <FlexColumn gap='0.75rem' style={{ width: storyWidth }}>
      <SegmentedControl.Root value={value} onValueChange={setValue}>
        {renderItems([
          { value: "option1", label: "목록" },
          { value: "option2", label: "카드" },
          { value: "option3", label: "표" },
        ])}
      </SegmentedControl.Root>
      <Label>Selected: {value}</Label>
    </FlexColumn>
  );
};

const meta: Meta<typeof SegmentedControl.Root> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl.Root,
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
  },
} satisfies Meta<typeof SegmentedControl.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    defaultValue: "option1",
  },
  render: args => (
    <SegmentedControl.Root key={`${args.size}-${args.defaultValue}-${args.disabled}`} {...args}>
      {renderItems()}
    </SegmentedControl.Root>
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
        <SegmentedControl.Root defaultValue='option2'>{renderItems()}</SegmentedControl.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Item disabled</Label>
        <SegmentedControl.Root defaultValue='option1'>
          {renderItems([
            { value: "option1", label: "레이블" },
            { value: "option2", label: "레이블", disabled: true },
            { value: "option3", label: "레이블" },
          ])}
        </SegmentedControl.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Root disabled</Label>
        <SegmentedControl.Root defaultValue='option1' disabled>
          {renderItems()}
        </SegmentedControl.Root>
      </FlexColumn>
      <FlexColumn gap='0.5rem'>
        <Label>Focused</Label>
        <SegmentedControl.Root defaultValue='option2'>
          {renderItems([
            { value: "option1", label: "레이블" },
            { value: "option2", label: "레이블" },
            { value: "option3", label: "레이블", disabled: true },
          ])}
        </SegmentedControl.Root>
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
          <SegmentedControl.Root size={size} defaultValue='option1'>
            {renderItems(options.slice(0, 2))}
          </SegmentedControl.Root>
        </FlexRow>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "세그먼티드 컨트롤은 lg, md, sm, xs 사이즈를 제공합니다. 주변 UI 요소와 디바이스 환경에 맞는 크기를 선택합니다.",
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
