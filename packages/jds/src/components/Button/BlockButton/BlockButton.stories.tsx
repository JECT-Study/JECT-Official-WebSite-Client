import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { BlockButton } from "./BlockButton";
import {
  BLOCK_BUTTON_FEEDBACK_OPTIONS,
  BLOCK_BUTTON_HIERARCHY_OPTIONS,
  BLOCK_BUTTON_SIZE_OPTIONS,
  BLOCK_BUTTON_VARIANT_OPTIONS,
} from "./blockButton.types";

const meta: Meta<typeof BlockButton> = {
  title: "Components/BlockButton",
  component: BlockButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "버튼 레이블",
    },
    hierarchy: {
      control: "select",
      options: BLOCK_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 위계",
      table: { defaultValue: { summary: "primary" } },
    },
    variant: {
      control: "select",
      options: BLOCK_BUTTON_VARIANT_OPTIONS,
      description: "버튼 스타일",
      table: { defaultValue: { summary: "solid" } },
    },
    size: {
      control: "select",
      options: BLOCK_BUTTON_SIZE_OPTIONS,
      description: "버튼 크기",
      table: { defaultValue: { summary: "md" } },
    },
    prefixIcon: {
      control: "text",
      description: "레이블 앞에 표시되는 아이콘 이름",
    },
    suffixIcon: {
      control: "text",
      description: "레이블 뒤에 표시되는 아이콘 이름",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof BlockButton>;

export default meta;

type Story = StoryObj<typeof BlockButton>;

export const Default: Story = {
  args: {
    children: "레이블",
    hierarchy: "primary",
    variant: "solid",
    size: "md",
  },
};

export const BlockButtonSizes: Story = {
  render: () => (
    <FlexRow>
      {BLOCK_BUTTON_SIZE_OPTIONS.map(size => (
        <BlockButton key={size} size={size}>
          레이블
        </BlockButton>
      ))}
    </FlexRow>
  ),
};

export const BlockButtonHierarchies: Story = {
  render: () => (
    <FlexRow>
      {BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <BlockButton key={hierarchy} hierarchy={hierarchy}>
          레이블
        </BlockButton>
      ))}
    </FlexRow>
  ),
};

export const BlockButtonVariants: Story = {
  render: () => (
    <FlexRow>
      {BLOCK_BUTTON_VARIANT_OPTIONS.map(variant => (
        <BlockButton key={variant} variant={variant}>
          레이블
        </BlockButton>
      ))}
    </FlexRow>
  ),
};

export const BlockButtonDisabled: Story = {
  render: () => (
    <FlexRow>
      {BLOCK_BUTTON_VARIANT_OPTIONS.map(variant => (
        <BlockButton key={variant} variant={variant} disabled>
          레이블
        </BlockButton>
      ))}
    </FlexRow>
  ),
};

export const BlockButtonWithIcons: Story = {
  render: () => (
    <FlexRow>
      <BlockButton prefixIcon='arrow-left-line'>레이블</BlockButton>
      <BlockButton suffixIcon='arrow-right-line'>레이블</BlockButton>
      <BlockButton prefixIcon='arrow-left-line' suffixIcon='arrow-right-line'>
        레이블
      </BlockButton>
    </FlexRow>
  ),
};

export const BlockButtonFeedback: Story = {
  render: () => (
    <FlexRow>
      {BLOCK_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
        <BlockButton key={feedback} feedback={feedback}>
          {feedback === "positive" ? "저장" : "삭제"}
        </BlockButton>
      ))}
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "피드백 버튼은 positive / destructive 의도를 표현하며, hierarchy · variant와 함께 사용할 수 없습니다.",
      },
    },
  },
};

export const BlockButtonComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      {BLOCK_BUTTON_VARIANT_OPTIONS.map(variant => (
        <FlexRow key={variant}>
          {BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
            <BlockButton key={hierarchy} variant={variant} hierarchy={hierarchy}>
              {hierarchy}
            </BlockButton>
          ))}
          {BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
            <BlockButton
              key={`${hierarchy}-disabled`}
              variant={variant}
              hierarchy={hierarchy}
              disabled
            >
              {hierarchy}
            </BlockButton>
          ))}
        </FlexRow>
      ))}
      <FlexRow>
        {BLOCK_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
          <BlockButton key={feedback} feedback={feedback}>
            {feedback}
          </BlockButton>
        ))}
        {BLOCK_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
          <BlockButton key={`${feedback}-disabled`} feedback={feedback} disabled>
            {feedback}
          </BlockButton>
        ))}
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant와 hierarchy 조합, 그리고 feedback 버튼을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
