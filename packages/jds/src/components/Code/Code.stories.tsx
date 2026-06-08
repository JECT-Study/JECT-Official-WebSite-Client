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
          "코드는 문장 흐름 안에서 키워드, 값, 명령어, 짧은 코드 조각을 시각적으로 구분하는 텍스트 컴포넌트입니다. 본문을 끊지 않고도 코드 요소를 맥락 속에서 인지하게 합니다. 설명 문맥을 유지하면서 특정 표현을 정확히 지목할 때 사용합니다.",
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
