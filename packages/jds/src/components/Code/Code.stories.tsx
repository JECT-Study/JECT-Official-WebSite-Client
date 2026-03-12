import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Code } from "./Code";

const CODE_TEXT = "inline code syntax";

const meta: Meta<typeof Code> = {
  title: "Components/Code",
  component: Code,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "인라인 코드는 문장 흐름 안에서 특정 키워드, 값, 명령어, 짧은 코드 조각을 시각적으로 구분하기 위한 텍스트 컴포넌트입니다. 주요 내용의 이해를 보조하는 용도로, 문장을 끊지 않고 맥락 속에서 코드를 인지할 수 있도록 합니다.",
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
    children: {
      control: "text",
      description: "코드 구문 표시 역할의 텍스트 내용입니다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: CODE_TEXT,
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <span>xs</span>
        <Code size='xs'>{CODE_TEXT}</Code>
      </FlexRow>
      <FlexRow>
        <span>sm</span>
        <Code size='sm'>{CODE_TEXT}</Code>
      </FlexRow>
      <FlexRow>
        <span>md</span>
        <Code size='md'>{CODE_TEXT}</Code>
      </FlexRow>
      <FlexRow>
        <span>lg</span>
        <Code size='lg'>{CODE_TEXT}</Code>
      </FlexRow>
    </FlexColumn>
  ),
};
