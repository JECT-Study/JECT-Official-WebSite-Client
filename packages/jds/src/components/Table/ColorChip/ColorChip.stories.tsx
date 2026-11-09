import type { Meta, StoryObj } from "@storybook/react-vite";

import { Table } from "..";

const meta = {
  title: "Components/Table/ColorChip",
  component: Table.ColorChip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ColorChip은 Table RowItem에서 색상 값을 작게 시각화하는 보조 컴포넌트이며, Table.ColorChip으로 사용합니다. 라벨, 상태, 색상 코드처럼 텍스트만으로 구분하기 어려운 값을 함께 표시할 때 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "칩의 배경 색상",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    style: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Table.ColorChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#21A2FF",
  },
};

export const ColorContrast: Story = {
  args: {
    color: "#21A2FF",
  },
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Table.ColorChip color='#FFFFFF' aria-label='white color chip' />
      <Table.ColorChip color='#21A2FF' aria-label='bright color chip' />
      <Table.ColorChip color='#111827' aria-label='dark color chip' />
    </div>
  ),
};
