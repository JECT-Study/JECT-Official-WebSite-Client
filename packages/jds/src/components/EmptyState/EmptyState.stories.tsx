import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";

import { EmptyState } from "./EmptyState";

const SAMPLE_BUTTON = "레이블";
const SAMPLE_LABEL = "멀티 스테이트 레이블";
const SAMPLE_BODY =
  "해당 엠티 스테이트에 대해 설명하거나 제안하는 콘텐츠 내용을 최대 세 줄 까지 입력할 수 있습니다.";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["empty", "outlined", "alpha"],
      description: "엠티 스테이트 외관 변형",
      table: {
        defaultValue: { summary: "empty" },
      },
    },
    header: {
      control: "text",
      description: "엠티 스테이트를 축약적으로 설명하는 레이블",
    },
    body: {
      control: "text",
      description: "엠티 스테이트를 자세하게 설명하는 레이블",
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "엠티 스테이트의 세로-가로 방향에 따른 외관 변경",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    icon: {
      control: "text",
      description: "엠티 스테이트에 표시되는 아이콘 이름 (Icon 컴포넌트)",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    variant: "empty",
    header: SAMPLE_LABEL,
    body: SAMPLE_BODY,
    layout: "vertical",
    icon: "vector",
  },
};

export const AllVariants: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState header='Empty' body={SAMPLE_BODY} />
      <EmptyState variant='outlined' header='Outlined' body={SAMPLE_BODY} />
      <EmptyState variant='alpha' header='Alpha' body={SAMPLE_BODY} />
    </FlexColumn>
  ),
};

const handleButtonClick = () => {
  console.log("클릭");
};

export const AllLayouts: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState header={SAMPLE_LABEL} body={SAMPLE_BODY} />
      <EmptyState layout='horizontal' header={SAMPLE_LABEL} body={SAMPLE_BODY} />
    </FlexColumn>
  ),
};

export const AllActions: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
      <EmptyState
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
        secondaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
      <EmptyState
        layout='horizontal'
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
      <EmptyState
        layout='horizontal'
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
        secondaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
    </FlexColumn>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <FlexColumn>
      <EmptyState
        icon='vector'
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
        secondaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
      <EmptyState
        icon='vector'
        layout='horizontal'
        header={SAMPLE_LABEL}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
        secondaryAction={{ children: SAMPLE_BUTTON, onClick: handleButtonClick }}
      />
    </FlexColumn>
  ),
};
