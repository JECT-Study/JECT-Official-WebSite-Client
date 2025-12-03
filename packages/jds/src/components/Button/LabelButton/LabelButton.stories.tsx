import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn, Label } from "@storybook-utils/layout";
import { LabelButton } from "components";

const meta = {
  title: "Components/LabelButton",
  component: LabelButton.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "버튼 텍스트",
      table: {
        defaultValue: { summary: "레이블" },
      },
    },
    hierarchy: {
      control: "select",
      options: ["accent", "primary", "secondary", "tertiary"],
      description: "버튼의 시각적 맥락적 위계 구분",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "컴포넌트의 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 되었는지의 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    prefixIcon: {
      control: "text",
      description: "버튼 텍스트 앞에 표시되는 아이콘 이름 (Icon 컴포넌트)",
      table: {
        defaultValue: { summary: "absolute" },
      },
    },
    suffixIcon: {
      control: "text",
      description: "버튼 텍스트 뒤에 표시되는 아이콘 이름 (Icon 컴포넌트)",
      table: {
        defaultValue: { summary: "absolute" },
      },
    },
  },
} satisfies Meta<typeof LabelButton.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "레이블",
    hierarchy: "primary",
    size: "md",
    prefixIcon: "absolute",
    suffixIcon: "absolute",
  },
};

export const AllSizes: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexRow>
      <LabelButton.Basic size="xs">Extra Small</LabelButton.Basic>
      <LabelButton.Basic size="sm">Small</LabelButton.Basic>
      <LabelButton.Basic size="md">Medium</LabelButton.Basic>
      <LabelButton.Basic size="lg">Large</LabelButton.Basic>
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexColumn>
      <LabelButton.Basic hierarchy="accent">Accent</LabelButton.Basic>
      <LabelButton.Basic hierarchy="primary">Primary</LabelButton.Basic>
      <LabelButton.Basic hierarchy="secondary">Secondary</LabelButton.Basic>
      <LabelButton.Basic hierarchy="tertiary">Tertiary</LabelButton.Basic>
    </FlexColumn>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexColumn>
      <LabelButton.Basic prefixIcon="arrow-left-line">With Prefix Icon</LabelButton.Basic>
      <LabelButton.Basic suffixIcon="arrow-right-line">With Suffix Icon</LabelButton.Basic>
      <LabelButton.Basic prefixIcon="arrow-left-line" suffixIcon="arrow-right-line">
        With Both Icons
      </LabelButton.Basic>
    </FlexColumn>
  ),
};

export const InteractionStates: Story = {
  args: {
    children: "Interact with me",
  },
  render: () => (
    <FlexColumn>
      <LabelButton.Basic>Hover me</LabelButton.Basic>
      <LabelButton.Basic>Click me (Active)</LabelButton.Basic>
      <LabelButton.Basic>Tab to focus me</LabelButton.Basic>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "rest, hover, active, focus 상태를 직접 테스트해보세요.",
      },
    },
  },
};

export const HierarchyWithSizes: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Accent:</Label>
        <LabelButton.Basic size="xs" hierarchy="accent">
          XS
        </LabelButton.Basic>
        <LabelButton.Basic size="sm" hierarchy="accent">
          SM
        </LabelButton.Basic>
        <LabelButton.Basic size="md" hierarchy="accent">
          MD
        </LabelButton.Basic>
        <LabelButton.Basic size="lg" hierarchy="accent">
          LG
        </LabelButton.Basic>
      </FlexRow>
      <FlexRow>
        <Label>Primary:</Label>
        <LabelButton.Basic size="xs" hierarchy="primary">
          XS
        </LabelButton.Basic>
        <LabelButton.Basic size="sm" hierarchy="primary">
          SM
        </LabelButton.Basic>
        <LabelButton.Basic size="md" hierarchy="primary">
          MD
        </LabelButton.Basic>
        <LabelButton.Basic size="lg" hierarchy="primary">
          LG
        </LabelButton.Basic>
      </FlexRow>
      <FlexRow>
        <Label>Secondary:</Label>
        <LabelButton.Basic size="xs" hierarchy="secondary">
          XS
        </LabelButton.Basic>
        <LabelButton.Basic size="sm" hierarchy="secondary">
          SM
        </LabelButton.Basic>
        <LabelButton.Basic size="md" hierarchy="secondary">
          MD
        </LabelButton.Basic>
        <LabelButton.Basic size="lg" hierarchy="secondary">
          LG
        </LabelButton.Basic>
      </FlexRow>
      <FlexRow>
        <Label>Tertiary:</Label>
        <LabelButton.Basic size="xs" hierarchy="tertiary">
          XS
        </LabelButton.Basic>
        <LabelButton.Basic size="sm" hierarchy="tertiary">
          SM
        </LabelButton.Basic>
        <LabelButton.Basic size="md" hierarchy="tertiary">
          MD
        </LabelButton.Basic>
        <LabelButton.Basic size="lg" hierarchy="tertiary">
          LG
        </LabelButton.Basic>
      </FlexRow>
    </FlexColumn>
  ),
};

export const FeedbackButtons: Story = {
  args: {
    children: "Feedback",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Positive:</Label>
        <LabelButton.Feedback intent="positive" size="xs">
          확인
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" size="sm">
          확인
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" size="md">
          확인
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" size="lg">
          확인
        </LabelButton.Feedback>
      </FlexRow>
      <FlexRow>
        <Label>Destructive:</Label>
        <LabelButton.Feedback intent="destructive" size="xs">
          삭제
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" size="sm">
          삭제
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" size="md">
          삭제
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" size="lg">
          삭제
        </LabelButton.Feedback>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "피드백 라벨 버튼은 사용자 행동에 대한 긍정적(positive) 또는 부정적(destructive) 피드백을 제공할 때 사용합니다.",
      },
    },
  },
};

export const FeedbackWithIcons: Story = {
  args: {
    children: "Feedback",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Positive:</Label>
        <LabelButton.Feedback intent="positive" prefixIcon="check-line">
          저장 완료
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" suffixIcon="arrow-right-line">
          다음 단계
        </LabelButton.Feedback>
      </FlexRow>
      <FlexRow>
        <Label>Destructive:</Label>
        <LabelButton.Feedback intent="destructive" prefixIcon="delete-bin-line">
          삭제하기
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" suffixIcon="close-line">
          취소
        </LabelButton.Feedback>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "피드백 버튼에 아이콘을 추가하여 시각적 명확성을 높일 수 있습니다.",
      },
    },
  },
};

export const FeedbackDisabled: Story = {
  args: {
    children: "Feedback",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Positive Disabled:</Label>
        <LabelButton.Feedback intent="positive" size="sm" disabled>
          확인
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" size="md" disabled>
          확인
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="positive" size="lg" disabled>
          확인
        </LabelButton.Feedback>
      </FlexRow>
      <FlexRow>
        <Label>Destructive Disabled:</Label>
        <LabelButton.Feedback intent="destructive" size="sm" disabled>
          삭제
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" size="md" disabled>
          삭제
        </LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive" size="lg" disabled>
          삭제
        </LabelButton.Feedback>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 피드백 버튼의 상태를 보여줍니다.",
      },
    },
  },
};

export const FeedbackInteractionStates: Story = {
  args: {
    children: "Interact",
  },
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Label>Positive:</Label>
        <LabelButton.Feedback intent="positive">Hover me</LabelButton.Feedback>
        <LabelButton.Feedback intent="positive">Click me</LabelButton.Feedback>
        <LabelButton.Feedback intent="positive">Focus me</LabelButton.Feedback>
      </FlexRow>
      <FlexRow>
        <Label>Destructive:</Label>
        <LabelButton.Feedback intent="destructive">Hover me</LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive">Click me</LabelButton.Feedback>
        <LabelButton.Feedback intent="destructive">Focus me</LabelButton.Feedback>
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "피드백 버튼의 rest, hover, active, focus 상태를 직접 테스트해보세요. " +
          "Positive는 긍정적 피드백에, Destructive는 부정적 피드백에 사용됩니다.",
      },
    },
  },
};
