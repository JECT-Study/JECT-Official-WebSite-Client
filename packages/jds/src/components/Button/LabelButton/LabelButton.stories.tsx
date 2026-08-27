import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { LabelButton } from "./LabelButton";
import {
  LABEL_BUTTON_FEEDBACK_OPTIONS,
  LABEL_BUTTON_HIERARCHY_OPTIONS,
  LABEL_BUTTON_SIZE_OPTIONS,
} from "./labelButton.types";

const meta: Meta<typeof LabelButton> = {
  title: "Components/LabelButton",
  component: LabelButton,
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
      options: LABEL_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 위계",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: LABEL_BUTTON_SIZE_OPTIONS,
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
} satisfies Meta<typeof LabelButton>;

export default meta;

type Story = StoryObj<typeof LabelButton>;

export const Default: Story = {
  args: {
    children: "레이블",
    hierarchy: "primary",
    size: "md",
  },
};

export const LabelButtonSizes: Story = {
  render: () => (
    <FlexRow>
      {LABEL_BUTTON_SIZE_OPTIONS.map(size => (
        <LabelButton key={size} size={size}>
          레이블
        </LabelButton>
      ))}
    </FlexRow>
  ),
};

export const LabelButtonHierarchies: Story = {
  render: () => (
    <FlexRow>
      {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <LabelButton key={hierarchy} hierarchy={hierarchy}>
          레이블
        </LabelButton>
      ))}
    </FlexRow>
  ),
};

export const LabelButtonDisabled: Story = {
  render: () => (
    <FlexRow>
      {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <LabelButton key={hierarchy} hierarchy={hierarchy} disabled>
          레이블
        </LabelButton>
      ))}
    </FlexRow>
  ),
};

export const LabelButtonWithIcons: Story = {
  render: () => (
    <FlexRow>
      <LabelButton prefixIcon='arrow-left'>레이블</LabelButton>
      <LabelButton suffixIcon='arrow-right'>레이블</LabelButton>
      <LabelButton prefixIcon='arrow-left' suffixIcon='arrow-right'>
        레이블
      </LabelButton>
    </FlexRow>
  ),
};

export const LabelButtonFeedback: Story = {
  render: () => (
    <FlexRow>
      {LABEL_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
        <LabelButton key={feedback} feedback={feedback}>
          {feedback === "positive" ? "확인" : "삭제"}
        </LabelButton>
      ))}
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "피드백 버튼은 positive / destructive 의도를 표현하며, hierarchy와 함께 사용할 수 없습니다.",
      },
    },
  },
};

export const LabelButtonComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
          <LabelButton key={hierarchy} hierarchy={hierarchy}>
            {hierarchy}
          </LabelButton>
        ))}
      </FlexRow>
      <FlexRow>
        {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
          <LabelButton key={hierarchy} hierarchy={hierarchy} disabled>
            {hierarchy}
          </LabelButton>
        ))}
      </FlexRow>
      <FlexRow>
        {LABEL_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
          <LabelButton key={feedback} feedback={feedback}>
            {feedback}
          </LabelButton>
        ))}
        {LABEL_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
          <LabelButton key={`${feedback}-disabled`} feedback={feedback} disabled>
            {feedback}
          </LabelButton>
        ))}
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 hierarchy 조합, 그리고 feedback 버튼을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
