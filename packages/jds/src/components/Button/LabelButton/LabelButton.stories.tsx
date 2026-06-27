import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn, Label } from "@storybook-utils/layout";

import { LabelButton } from "./LabelButton";
import { LABEL_BUTTON_HIERARCHY_OPTIONS, LABEL_BUTTON_SIZE_OPTIONS } from "./labelButton.types";

const meta = {
  title: "Components/LabelButton",
  component: LabelButton,
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
      options: LABEL_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 맥락적 위계 구분",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: LABEL_BUTTON_SIZE_OPTIONS,
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
} satisfies Meta<typeof LabelButton>;

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
      <LabelButton size='xs'>Extra Small</LabelButton>
      <LabelButton size='sm'>Small</LabelButton>
      <LabelButton size='md'>Medium</LabelButton>
      <LabelButton size='lg'>Large</LabelButton>
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexColumn>
      <LabelButton hierarchy='accent'>Accent</LabelButton>
      <LabelButton hierarchy='primary'>Primary</LabelButton>
      <LabelButton hierarchy='secondary'>Secondary</LabelButton>
      <LabelButton hierarchy='tertiary'>Tertiary</LabelButton>
    </FlexColumn>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexColumn>
      <LabelButton prefixIcon='arrow-left-line'>With Prefix Icon</LabelButton>
      <LabelButton suffixIcon='arrow-right-line'>With Suffix Icon</LabelButton>
      <LabelButton prefixIcon='arrow-left-line' suffixIcon='arrow-right-line'>
        With Both Icons
      </LabelButton>
    </FlexColumn>
  ),
};

export const InteractionStates: Story = {
  args: {
    children: "Interact with me",
  },
  render: () => (
    <FlexColumn>
      <LabelButton>Hover me</LabelButton>
      <LabelButton>Click me (Active)</LabelButton>
      <LabelButton>Tab to focus me</LabelButton>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "VE overlay 유틸 기반 인터랙션 시스템 (data attribute 방식):\n\n" +
          "- **rest**: 기본 상태 (opacity: 0)\n" +
          "- **data-hovered**: 마우스 오버 시 (opacity: 0.08, fluent motion 100ms)\n" +
          "- **data-pressed**: 클릭 중 (opacity: 0.12, transition 없음)\n" +
          "- **data-focus-visible**: 키보드 포커스 시 (focus ring 표시, 음수 inset으로 시각 영역 밖으로 확장)",
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
      {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <FlexColumn key={hierarchy} gap='12px'>
          <Label>{hierarchy.charAt(0).toUpperCase() + hierarchy.slice(1)}:</Label>
          <FlexRow gap='12px'>
            {LABEL_BUTTON_SIZE_OPTIONS.map(size => (
              <LabelButton key={size} size={size} hierarchy={hierarchy}>
                {size.toUpperCase()}
              </LabelButton>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const DisabledStates: Story = {
  args: {
    children: "Label Button",
  },
  render: () => (
    <FlexColumn gap='32px'>
      {LABEL_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
        <FlexColumn key={hierarchy} gap='12px'>
          <Label>{hierarchy.charAt(0).toUpperCase() + hierarchy.slice(1)}:</Label>
          <FlexRow gap='12px'>
            {LABEL_BUTTON_SIZE_OPTIONS.map(size => (
              <LabelButton key={size} hierarchy={hierarchy} size={size} disabled>
                {size.toUpperCase()}
              </LabelButton>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const FeedbackButtons: Story = {
  args: {
    children: "Feedback",
  },
  render: () => (
    <FlexColumn>
      {(["positive", "destructive"] as const).map(intent => (
        <FlexColumn key={intent} gap='12px'>
          <Label>{intent.charAt(0).toUpperCase() + intent.slice(1)}:</Label>
          <FlexRow gap='12px'>
            {LABEL_BUTTON_SIZE_OPTIONS.map(size => (
              <LabelButton key={size} feedback={intent} size={size}>
                {intent === "positive" ? "확인" : "삭제"}
              </LabelButton>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
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
      <FlexColumn gap='12px'>
        <Label>Positive:</Label>
        <FlexRow gap='12px'>
          <LabelButton feedback='positive' prefixIcon='check-line'>
            저장 완료
          </LabelButton>
          <LabelButton feedback='positive' suffixIcon='arrow-right-line'>
            다음 단계
          </LabelButton>
        </FlexRow>
      </FlexColumn>
      <FlexColumn gap='12px'>
        <Label>Destructive:</Label>
        <FlexRow gap='12px'>
          <LabelButton feedback='destructive' prefixIcon='delete-bin-line'>
            삭제하기
          </LabelButton>
          <LabelButton feedback='destructive' suffixIcon='close-line'>
            취소
          </LabelButton>
        </FlexRow>
      </FlexColumn>
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
      {(["positive", "destructive"] as const).map(intent => (
        <FlexColumn key={intent} gap='12px'>
          <Label>{intent.charAt(0).toUpperCase() + intent.slice(1)} Disabled:</Label>
          <FlexRow gap='12px'>
            {(["sm", "md", "lg"] as const).map(size => (
              <LabelButton key={size} feedback={intent} size={size} disabled>
                {intent === "positive" ? "확인" : "삭제"}
              </LabelButton>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
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
      {(["positive", "destructive"] as const).map(intent => (
        <FlexColumn key={intent} gap='12px'>
          <Label>{intent.charAt(0).toUpperCase() + intent.slice(1)}:</Label>
          <FlexRow gap='12px'>
            <LabelButton feedback={intent}>Hover me</LabelButton>
            <LabelButton feedback={intent}>Click me</LabelButton>
            <LabelButton feedback={intent}>Focus me</LabelButton>
          </FlexRow>
        </FlexColumn>
      ))}
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
