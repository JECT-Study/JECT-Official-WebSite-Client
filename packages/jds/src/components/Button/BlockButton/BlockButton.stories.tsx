import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow, FlexColumn, Label } from "@storybook-utils/layout";

import { BlockButton } from "./BlockButton";
import {
  BLOCK_BUTTON_FEEDBACK_OPTIONS,
  BLOCK_BUTTON_HIERARCHY_OPTIONS,
  BLOCK_BUTTON_SIZE_OPTIONS,
  BLOCK_BUTTON_VARIANT_OPTIONS,
} from "./blockButton.types";

const meta = {
  title: "Components/BlockButton",
  component: BlockButton,
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
      options: BLOCK_BUTTON_SIZE_OPTIONS,
      description: "버튼의 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: BLOCK_BUTTON_VARIANT_OPTIONS,
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
} satisfies Meta<typeof BlockButton>;

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
      <BlockButton size='xs'>Extra Small</BlockButton>
      <BlockButton size='sm'>Small</BlockButton>
      <BlockButton size='md'>Medium</BlockButton>
      <BlockButton size='lg'>Large</BlockButton>
    </FlexRow>
  ),
};

export const AllHierarchies: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton hierarchy='accent'>Accent</BlockButton>
      <BlockButton hierarchy='primary'>Primary</BlockButton>
      <BlockButton hierarchy='secondary'>Secondary</BlockButton>
      <BlockButton hierarchy='tertiary'>Tertiary</BlockButton>
    </FlexColumn>
  ),
};

export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton variant='solid'>Solid</BlockButton>
      <BlockButton variant='outlined'>Outlined</BlockButton>
      <BlockButton variant='empty'>Empty</BlockButton>
    </FlexColumn>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <FlexColumn>
      <BlockButton prefixIcon='arrow-left-line'>With Prefix Icon</BlockButton>
      <BlockButton suffixIcon='arrow-right-line'>With Suffix Icon</BlockButton>
      <BlockButton prefixIcon='arrow-left-line' suffixIcon='arrow-right-line'>
        With Both Icons
      </BlockButton>
    </FlexColumn>
  ),
};

export const InteractionStates: Story = {
  args: {
    children: "Interact with me",
  },
  render: () => (
    <FlexColumn>
      <BlockButton>Hover me</BlockButton>
      <BlockButton>Click me (Active)</BlockButton>
      <BlockButton>Tab to focus me</BlockButton>
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
      {BLOCK_BUTTON_VARIANT_OPTIONS.map(variant => (
        <FlexColumn key={variant} gap='12px'>
          <Label>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Label>
          <FlexRow gap='12px'>
            {BLOCK_BUTTON_HIERARCHY_OPTIONS.map(hierarchy => (
              <BlockButton key={hierarchy} variant={variant} hierarchy={hierarchy}>
                {hierarchy}
              </BlockButton>
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
      {BLOCK_BUTTON_SIZE_OPTIONS.map(size => (
        <FlexColumn key={size} gap='12px'>
          <Label>{size.toUpperCase()}:</Label>
          <FlexRow gap='12px'>
            <BlockButton size={size} variant='solid'>
              Solid
            </BlockButton>
            <BlockButton size={size} variant='outlined'>
              Outlined
            </BlockButton>
            <BlockButton size={size} variant='empty'>
              Empty
            </BlockButton>
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
      {BLOCK_BUTTON_FEEDBACK_OPTIONS.map(feedback => (
        <FlexColumn key={feedback} gap='12px'>
          <Label>{feedback.charAt(0).toUpperCase() + feedback.slice(1)}:</Label>
          <FlexRow gap='12px'>
            {BLOCK_BUTTON_SIZE_OPTIONS.map(size => (
              <BlockButton key={size} feedback={feedback} size={size}>
                {feedback === "positive" ? "저장" : "삭제"}
              </BlockButton>
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
