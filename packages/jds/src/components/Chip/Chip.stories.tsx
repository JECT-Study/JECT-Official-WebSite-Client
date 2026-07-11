import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "칩은 선택된 항목, 적용된 조건, 입력된 값 같은 현재 맥락을 짧게 요약해 보여주는 컴포넌트입니다. 사용자는 칩을 통해 적용 상태를 빠르게 확인하고 필요하다면 즉시 해제할 수 있습니다. 필터, 태그, 다중 선택 결과처럼 반복되는 상태를 정리하는 데 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "기본 레이블입니다.",
    },
    valueLabel: {
      control: "text",
      description: "기본 레이블 뒤에 표시되는 값 레이블입니다. 전달되면 활성 상태로 표시됩니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성 되었는지의 여부입니다.",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "레이블",
    disabled: false,
    onClick: () => alert("chip clicked"),
    onRemove: () => alert("icon clicked"),
  },
};

export const Activated: Story = {
  args: {
    label: "레이블",
    onRemove: () => alert("icon clicked"),
  },
  render: () => (
    <Chip
      label='레이블'
      valueLabel='값 레이블'
      onClick={() => alert("chip clicked")}
      onRemove={() => alert("icon clicked")}
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: "레이블",
    onRemove: () => alert("icon clicked"),
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Chip
          label='레이블'
          disabled
          onClick={() => alert("chip clicked")}
          onRemove={() => alert("icon clicked")}
        />
        <Chip
          label='레이블'
          valueLabel='값 레이블'
          disabled
          onClick={() => alert("chip clicked")}
          onRemove={() => alert("icon clicked")}
        />
      </FlexRow>
    </FlexColumn>
  ),
};
