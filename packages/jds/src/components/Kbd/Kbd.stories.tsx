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
          "키보드 키는 키보드 입력이나 단축키를 시각적으로 표현하기 위한 컴포넌트입니다. 특정 키 또는 키 조합을 명확히 인지할 수 있도록 표시하여, 사용자가 수행해야 할 입력 행동을 보조적으로 안내합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md", "sm", "xs"],
      description: "컴포넌트의 시각적 크기입니다.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    type: {
      control: "radio",
      options: ["key", "text", "function"],
      description: "역할이나 유형에 대한 구분입니다.",
      table: {
        defaultValue: { summary: "key" },
      },
    },
    muted: {
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
    type: "key",
    muted: false,
  },
};

export const Types: Story = {
  args: {
    children: "kbd",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>key</span>
        <Kbd type='key'>A</Kbd>
        <Kbd type='key'>/</Kbd>
        <Kbd type='key'>\</Kbd>
      </FlexRow>
      <FlexRow>
        <span>text</span>
        <Kbd type='text'>ctrl</Kbd>
        <Kbd type='text'>alt</Kbd>
        <Kbd type='text'>tab</Kbd>
        <Kbd type='text'>esc</Kbd>
      </FlexRow>
      <FlexRow>
        <span>function</span>
        <Kbd type='function'>⌘</Kbd>
        <Kbd type='function'>⌥</Kbd>
        <Kbd type='function'>⇧</Kbd>
        <Kbd type='function'>⌃</Kbd>
        <Kbd type='function'>⌫</Kbd>
        <Kbd type='function'>⏎</Kbd>
      </FlexRow>
    </FlexColumn>
  ),
};

export const isMuted: Story = {
  args: {
    children: "kbd",
  },
  render: () => (
    <FlexColumn>
      <Kbd muted>A</Kbd>
      <Kbd>/</Kbd>
    </FlexColumn>
  ),
};
