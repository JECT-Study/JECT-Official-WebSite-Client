import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn } from "@storybook-utils/layout";

import { Kbd } from "./Kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "키보드 키는 키 입력이나 단축키 예시를 시각적으로 보여주는 텍스트 표시 컴포넌트입니다. 사용자는 키 조합을 한눈에 인지하고, 적절한 입력을 빠르게 할 수 있습니다. 문서, 튜토리얼, 도움말, 인앱 가이드 등에서 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
      description: "컴포넌트의 시각적 크기입니다.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    isMuted: {
      control: "boolean",
      description: "시각적으로 강조도가 낮춰졌는지의 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "키에 들어갈 텍스트 또는 아이콘입니다.",
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "K",
    size: "md",
    isMuted: false,
  },
};

export const AllSizes: Story = {
  args: {
    children: "Kbd",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>sm</span>
        <Kbd size='sm'>A</Kbd>
        <Kbd size='sm'>ctrl</Kbd>
        <Kbd size='sm'>⌘</Kbd>
      </FlexRow>
      <FlexRow>
        <span>md</span>
        <Kbd size='md'>A</Kbd>
        <Kbd size='md'>ctrl</Kbd>
        <Kbd size='md'>⌘</Kbd>
      </FlexRow>
      <FlexRow>
        <span>lg</span>
        <Kbd size='lg'>A</Kbd>
        <Kbd size='lg'>ctrl</Kbd>
        <Kbd size='lg'>⌘</Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};

export const IsMuted: Story = {
  args: {
    children: "Kbd",
  },
  render: () => (
    <FlexRow>
      <Kbd isMuted>A</Kbd>
      <Kbd isMuted>ctrl</Kbd>
      <Kbd isMuted>⌘</Kbd>
    </FlexRow>
  ),
};
