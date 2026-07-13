import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import { Dialog } from "./Dialog";
import type { DialogProps } from "./dialog.types";

import type { CheckedState } from "@/components";
import { BlockButton } from "@/components";

const SAMPLE_HEADER = "다이얼로그 타이틀";
const SAMPLE_BODY = "간결하게 안내하는 내용을 작성합니다. 피드백 메시지 원칙을 참조하세요.";
const SAMPLE_BUTTON = "레이블";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    header: {
      control: "text",
      description: "제목 역할의 텍스트 내용",
    },
    body: {
      control: "text",
      description: "본문 내용 역할의 텍스트 내용",
    },
    closeOnClickOutside: {
      control: "boolean",
      description: "배경(오버레이) 클릭 시 다이얼로그가 닫히는지 여부",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    primaryAction: {
      control: "object",
      description: "첫 번째 버튼",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    header: SAMPLE_HEADER,
    body: SAMPLE_BODY,
    closeOnClickOutside: true,
    primaryAction: {
      children: SAMPLE_BUTTON,
    },
  },

  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <BlockButton.Basic onClick={() => setIsOpen(true)}>다이얼로그 열기</BlockButton.Basic>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          closeOnClickOutside={args.closeOnClickOutside}
          header={args.header}
          body={args.body}
          primaryAction={{
            ...args.primaryAction,
          }}
        />
      </>
    );
  },

  parameters: {
    docs: {
      description: {
        story:
          "버튼 클릭으로 다이얼로그를 열어 등장/퇴장 애니메이션과 오버레이 동작을 확인할 수 있습니다.",
      },
    },
  },
};

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

const cellStyle: CSSProperties = {
  position: "relative",
  width: 360,
};

const MATRIX_CELL_CLASS = "dialog-variant-cell";
const MATRIX_STYLE = `
.${MATRIX_CELL_CLASS} > *:not([role="dialog"]) { display: none; }
.${MATRIX_CELL_CLASS} [role="dialog"] { position: static; transform: none; animation: none; width: 100%; min-width: 0; max-width: none; }
.${MATRIX_CELL_CLASS} :where(button, label)::before, .${MATRIX_CELL_CLASS} :where(button, label)::after { box-shadow: none !important; }
`;

type MatrixCaseProps = {
  label: string;
  checkbox?: boolean;
} & Omit<DialogProps, "open" | "container" | "checkboxAction">;

const MatrixCase = ({ label, checkbox, ...props }: MatrixCaseProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState<CheckedState>(false);

  return (
    <div style={caseStyle}>
      <span style={captionStyle}>{label}</span>
      <div ref={setContainer} className={MATRIX_CELL_CLASS} style={cellStyle}>
        {container && (
          <Dialog
            open
            modal={false}
            container={container}
            checkboxAction={
              checkbox ? { label: SAMPLE_BUTTON, checked, onCheckedChange: setChecked } : undefined
            }
            {...props}
          />
        )}
      </div>
    </div>
  );
};

const Matrix = ({ children }: { children: ReactNode }) => (
  <>
    <style>{MATRIX_STYLE}</style>
    <div style={rowStyle}>{children}</div>
  </>
);

export const WithCheckbox: Story = {
  render: () => (
    <Matrix>
      <MatrixCase
        label='withCheckbox=false'
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
      />
      <MatrixCase
        label='withCheckbox=true'
        checkbox
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
      />
    </Matrix>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "checkboxAction을 통해 본문 하단에 체크박스를 포함하는지 여부입니다.",
      },
    },
  },
};

export const WithSecondaryButton: Story = {
  render: () => (
    <Matrix>
      <MatrixCase
        label='withSecondaryButton=false'
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
      />
      <MatrixCase
        label='withSecondaryButton=true'
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
        secondaryAction={{ children: SAMPLE_BUTTON }}
      />
    </Matrix>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "secondaryAction을 통해 두 번째 위계의 버튼을 포함하는지 여부입니다.",
      },
    },
  },
};

export const ButtonLayout: Story = {
  render: () => (
    <Matrix>
      <MatrixCase
        label='buttonLayout=horizontal'
        buttonLayout='horizontal'
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
        secondaryAction={{ children: SAMPLE_BUTTON }}
      />
      <MatrixCase
        label='buttonLayout=vertical'
        buttonLayout='vertical'
        header={SAMPLE_HEADER}
        body={SAMPLE_BODY}
        primaryAction={{ children: SAMPLE_BUTTON }}
        secondaryAction={{ children: SAMPLE_BUTTON }}
      />
    </Matrix>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "buttonLayout으로 버튼 배치를 전환합니다. horizontal은 보조, 주요 버튼을 우측 정렬한 md 크기로, vertical은 주요 버튼을 위에 둔 전체 너비 lg 크기로 세로 배치합니다.",
      },
    },
  },
};
