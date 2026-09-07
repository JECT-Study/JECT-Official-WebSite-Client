import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

import { EmptyState } from "./EmptyState";
import { Code } from "../Code";
import type { ThumbnailProps } from "../Thumbnail";

const SAMPLE_BUTTON = "레이블";
const SAMPLE_HEADER = "엠티 스테이트 타이틀";
const SAMPLE_BODY =
  "해당 엠티 스테이트에 대해 설명하거나 제안하는 콘텐츠 내용을 최대 세 줄 까지 입력할 수 있습니다.";
const SAMPLE_IMAGE: ThumbnailProps = { alt: "샘플 이미지" };

const handleButtonClick = () => {
  alert("버튼이 클릭되었습니다.");
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

const Case = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={caseStyle}>
    <Code size='xs'>{label}</Code>
    <div style={{ width: "100%", maxWidth: 360 }}>{children}</div>
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
      description:
        "엠티 스테이트가 사용되는 맥락에서의 주변 요소들이나 부모 컨테이너의 시각적 특징을 고려해 적절히 사용합니다.",
      table: {
        defaultValue: { summary: "hollow" },
      },
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description:
        "컴포넌트의 최종적인 외형은 해석에 영향을 미치지 않습니다. 내부 요소들의 배열이 수직인지, 수평인지를 구별해야 한다면 이 프로퍼티를 사용하세요.",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    header: {
      control: "text",
      description:
        "엠티 스테이트를 축약적으로 설명하는 타이틀 텍스트입니다. 작성되지 않을 경우 컴포넌트에 표시되지 않습니다.",
    },
    body: {
      control: "text",
      description: "엠티 스테이트를 자세하게 설명하는 본문 텍스트입니다.",
    },
    image: {
      control: "object",
      description:
        "엠티 스테이트에 표시되는 이미지 슬롯(ThumbnailProps)입니다. { src, alt } 형태로 지정하며, src가 없으면 fallback이 표시됩니다. 작성되지 않을 경우 컴포넌트에 표시되지 않습니다.",
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

export const WithTitle: Story = {
  render: () => (
    <div style={rowStyle}>
      <Case label='withTitle=false'>
        <EmptyState
          image={SAMPLE_IMAGE}
          body={SAMPLE_BODY}
          primaryAction={PRIMARY_ACTION}
          secondaryAction={SECONDARY_ACTION}
        />
      </Case>
      <Case label='withTitle=true'>
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
