import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn, Label } from "@storybook-utils/layout";

import { BlockButton } from "./BlockButton";
import { BLOCK_BUTTON_HIERARCHY_OPTIONS, BLOCK_BUTTON_STYLE_OPTIONS } from "./blockButton.types";

const meta = {
  title: "Components/BlockButton",
  component: BlockButton.Basic,
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
      options: BLOCK_BUTTON_HIERARCHY_OPTIONS,
      description: "버튼의 시각적 위계",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "버튼의 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: ["solid", "outlined", "empty"],
      description: "버튼의 스타일 변형",
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
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
} satisfies Meta<typeof BlockButton.Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "레이블",
    hierarchy: "primary",
    size: "md",
    variant: "solid",
    prefixIcon: "absolute",
    suffixIcon: "absolute",
  },
};

export const AllSizes: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexRow>
      <BlockButton.Basic size='xs'>Extra Small</BlockButton.Basic>
      <BlockButton.Basic size='sm'>Small</BlockButton.Basic>
      <BlockButton.Basic size='md'>Medium</BlockButton.Basic>
      <BlockButton.Basic size='lg'>Large</BlockButton.Basic>
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic hierarchy='accent'>Accent</BlockButton.Basic>
      <BlockButton.Basic hierarchy='primary'>Primary</BlockButton.Basic>
      <BlockButton.Basic hierarchy='secondary'>Secondary</BlockButton.Basic>
      <BlockButton.Basic hierarchy='tertiary'>Tertiary</BlockButton.Basic>
    </FlexColumn>
  ),
};

export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic variant='solid'>Solid</BlockButton.Basic>
      <BlockButton.Basic variant='outlined'>Outlined</BlockButton.Basic>
      <BlockButton.Basic variant='empty'>Empty</BlockButton.Basic>
    </FlexColumn>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic prefixIcon='arrow-left-line'>With Prefix Icon</BlockButton.Basic>
      <BlockButton.Basic suffixIcon='arrow-right-line'>With Suffix Icon</BlockButton.Basic>
      <BlockButton.Basic prefixIcon='arrow-left-line' suffixIcon='arrow-right-line'>
        With Both Icons
      </BlockButton.Basic>
    </FlexColumn>
  ),
};

export const InteractionStates: Story = {
  args: {
    children: "Interact with me",
  },
  render: () => (
    <FlexColumn>
      <BlockButton.Basic>Hover me</BlockButton.Basic>
      <BlockButton.Basic>Click me (Active)</BlockButton.Basic>
      <BlockButton.Basic>Tab to focus me</BlockButton.Basic>
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
          "- **data-focus-visible**: 키보드 포커스 시 (focus ring 표시)",
      },
    },
  },
};

export const ComprehensiveMatrix: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn gap='32px'>
      {BLOCK_BUTTON_STYLE_OPTIONS.map(variant => (
        <FlexColumn key={variant} gap='12px'>
          <Label>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Label>
          <FlexRow gap='12px'>
            {BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
              <BlockButton.Basic key={hierarchy} variant={variant} hierarchy={hierarchy}>
                {hierarchy}
              </BlockButton.Basic>
            ))}
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 variant와 hierarchy 조합을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};

export const SizeWithVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      {(["xs", "sm", "md", "lg"] as const).map(size => (
        <FlexColumn key={size} gap='12px'>
          <Label>{size.toUpperCase()}:</Label>
          <FlexRow gap='12px'>
            <BlockButton.Basic size={size} variant='solid'>
              Solid
            </BlockButton.Basic>
            <BlockButton.Basic size={size} variant='outlined'>
              Outlined
            </BlockButton.Basic>
            <BlockButton.Basic size={size} variant='empty'>
              Empty
            </BlockButton.Basic>
          </FlexRow>
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const FeedbackButtons: Story = {
  args: {
    children: "Feedback Button",
  },
  render: () => (
    <FlexColumn>
      {(["positive", "destructive"] as const).map(intent => (
        <FlexColumn key={intent} gap='12px'>
          <Label>{intent.charAt(0).toUpperCase() + intent.slice(1)}:</Label>
          <FlexRow gap='12px'>
            {(["xs", "sm", "md", "lg"] as const).map(size => (
              <BlockButton.Feedback key={size} intent={intent} size={size}>
                {intent === "positive" ? "저장" : "삭제"}
              </BlockButton.Feedback>
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
          "피드백 버튼은 사용자 행동에 대한 긍정적(positive) 또는 부정적(destructive) 피드백을 제공할 때 사용합니다.",
      },
    },
  },
};
