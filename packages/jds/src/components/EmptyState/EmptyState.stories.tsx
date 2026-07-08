import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

import { EmptyState } from "./EmptyState";
import type { ThumbnailProps } from "../Thumbnail";

const SAMPLE_BUTTON = "레이블";
const SAMPLE_HEADER = "엠티 스테이트 타이틀";
const SAMPLE_BODY =
  "해당 엠티 스테이트에 대해 설명하거나 제안하는 콘텐츠 내용을 최대 세 줄 까지 입력할 수 있습니다.";
const SAMPLE_IMAGE: ThumbnailProps = { alt: "샘플 이미지" };

const handleButtonClick = () => {
  console.log("클릭");
};
const PRIMARY_ACTION = { children: SAMPLE_BUTTON, onClick: handleButtonClick };
const SECONDARY_ACTION = { children: SAMPLE_BUTTON, onClick: handleButtonClick };

const rowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 32,
};
const caseStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
};
const captionStyle: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.4,
  color: "#8a8a8a",
  background: "#efefef",
  padding: "3px 8px",
  borderRadius: 3,
  whiteSpace: "nowrap",
};

const Case = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={caseStyle}>
    <span style={captionStyle}>{label}</span>
    <div style={{ width: 360 }}>{children}</div>
  </div>
);

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["hollow", "dashed", "alpha"],
      description: "엠티 스테이트 외관 변형",
      table: {
        defaultValue: { summary: "hollow" },
      },
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "엠티 스테이트의 세로-가로 방향에 따른 외관 변경",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    header: {
      control: "text",
      description: "엠티 스테이트를 축약적으로 설명하는 타이틀",
    },
    body: {
      control: "text",
      description: "엠티 스테이트를 자세하게 설명하는 본문",
    },
    image: {
      control: false,
      description: "엠티 스테이트에 표시되는 이미지 슬롯 (Thumbnail 재사용)",
    },
    primaryAction: {
      control: "object",
      description: "primary 버튼 설정 (children, onClick, disabled)",
    },
    secondaryAction: {
      control: "object",
      description: "secondary 버튼 설정 (children, onClick, disabled)",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    variant: "hollow",
    layout: "vertical",
    header: SAMPLE_HEADER,
    body: SAMPLE_BODY,
    image: SAMPLE_IMAGE,
    primaryAction: PRIMARY_ACTION,
  },
};

export const Style: Story = {
  render: () => (
    <div style={rowStyle}>
      {(["hollow", "dashed", "alpha"] as const).map(variant => (
        <Case key={variant} label={variant}>
          <EmptyState
            variant={variant}
            header={SAMPLE_HEADER}
            body={SAMPLE_BODY}
            primaryAction={PRIMARY_ACTION}
            secondaryAction={SECONDARY_ACTION}
          />
        </Case>
      ))}
    </div>
  ),
};

export const Layout: Story = {
  render: () => (
    <div style={rowStyle}>
      {(["vertical", "horizontal"] as const).map(layout => (
        <Case key={layout} label={layout}>
          <EmptyState
            layout={layout}
            header={SAMPLE_HEADER}
            body={SAMPLE_BODY}
            primaryAction={PRIMARY_ACTION}
          />
        </Case>
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div style={rowStyle}>
      <Case label='withImage=false'>
        <EmptyState
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={PRIMARY_ACTION}
          secondaryAction={SECONDARY_ACTION}
        />
      </Case>
      <Case label='withImage=true'>
        <EmptyState
          image={SAMPLE_IMAGE}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={PRIMARY_ACTION}
          secondaryAction={SECONDARY_ACTION}
        />
      </Case>
    </div>
  ),
};

export const WithPrimaryButton: Story = {
  render: () => (
    <div style={rowStyle}>
      <Case label='withPrimaryButton=false'>
        <EmptyState header={SAMPLE_HEADER} body={SAMPLE_BODY} />
      </Case>
      <Case label='withPrimaryButton=true'>
        <EmptyState header={SAMPLE_HEADER} body={SAMPLE_BODY} primaryAction={PRIMARY_ACTION} />
      </Case>
    </div>
  ),
};

export const WithSecondaryButton: Story = {
  render: () => (
    <div style={rowStyle}>
      <Case label='withSecondaryButton=true'>
        <EmptyState header={SAMPLE_HEADER} body={SAMPLE_BODY} secondaryAction={SECONDARY_ACTION} />
      </Case>
      <Case label='withSecondaryButton, withPrimaryButton=true'>
        <EmptyState
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={PRIMARY_ACTION}
          secondaryAction={SECONDARY_ACTION}
        />
      </Case>
    </div>
  ),
};
