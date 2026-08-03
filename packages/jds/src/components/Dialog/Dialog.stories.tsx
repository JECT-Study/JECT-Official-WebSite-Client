import type { Meta, StoryObj } from "@storybook/react-vite";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

import { Dialog } from "./Dialog";
import { dialogPanelWidth } from "./dialog.css";
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
    closeOnInteractOutside: {
      control: "boolean",
      description:
        "바깥 영역 클릭 또는 바깥 요소로의 포커스 이동 시 다이얼로그가 닫히는지 여부. Esc 키 동작에는 영향을 주지 않음",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    buttonLayout: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "버튼 배치 방향. horizontal은 우측 정렬 md, vertical은 전체 너비 lg 세로 배치",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    primaryAction: {
      control: "object",
      description: "주요 위계 버튼",
    },
    secondaryAction: {
      control: "object",
      description: "두 번째 위계의 버튼(선택). 없으면 렌더링되지 않음",
    },
    checkboxAction: {
      control: "object",
      description: "본문 하단 체크박스(선택). 없으면 렌더링되지 않음",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    header: SAMPLE_HEADER,
    body: SAMPLE_BODY,
    closeOnInteractOutside: true,
    buttonLayout: "horizontal",
    primaryAction: {
      children: SAMPLE_BUTTON,
    },
  },

  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <BlockButton.Basic onClick={() => setIsOpen(true)}>다이얼로그 열기</BlockButton.Basic>
        <Dialog {...args} open={isOpen} onOpenChange={setIsOpen} />
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

export const PanelWidth: Story = {
  args: Default.args,
  render: args => <Dialog {...args} open />,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [400, 1200] },
    docs: {
      description: {
        story:
          "패널의 실제 포지셔닝과 너비를 확인합니다. 너비를 지정하지 않으면 400~560px 사이에서 내용에 맞춰 정해지고, 뷰포트가 좁으면 좌우 16px을 남기고 줄어듭니다.",
      },
    },
  },
};

export const ScrollableBody: Story = {
  args: {
    ...Default.args,
    body: Array.from({ length: 12 }, () => SAMPLE_BODY).join(" "),
    secondaryAction: { children: SAMPLE_BUTTON },
  },
  render: args => <Dialog {...args} open />,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "본문이 길어 패널이 최대 너비 560px과 최대 높이에 모두 걸린 상태입니다. 제목과 버튼은 고정되고 본문 영역만 스크롤됩니다.",
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

const MATRIX_PANEL_WIDTH = 360;
const PANEL_VIEWPORT_GUTTER = 32;

const cellStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: MATRIX_PANEL_WIDTH + PANEL_VIEWPORT_GUTTER,
};

const MATRIX_CELL_CLASS = "dialog-variant-cell";
const MATRIX_STYLE = `
.${MATRIX_CELL_CLASS} > *:not([role="dialog"]) { display: none; }
.${MATRIX_CELL_CLASS} [role="dialog"] { position: static; transform: none; animation: none; }
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
            style={assignInlineVars({ [dialogPanelWidth]: "100%" })}
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
      source: {
        code: `const [open, setOpen] = useState(false);
const [checked, setChecked] = useState<CheckedState>(false);

<Dialog
  open={open}
  onOpenChange={setOpen}
  header="다이얼로그 타이틀"
  body="간결하게 안내하는 내용을 작성합니다."
  primaryAction={{ children: "레이블" }}
  checkboxAction={{ label: "레이블", checked, onCheckedChange: setChecked }}
/>`,
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
      source: {
        code: `const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onOpenChange={setOpen}
  header="다이얼로그 타이틀"
  body="간결하게 안내하는 내용을 작성합니다."
  primaryAction={{ children: "레이블" }}
  secondaryAction={{ children: "레이블" }}
/>`,
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
      source: {
        code: `const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onOpenChange={setOpen}
  buttonLayout="vertical"
  header="다이얼로그 타이틀"
  body="간결하게 안내하는 내용을 작성합니다."
  primaryAction={{ children: "레이블" }}
  secondaryAction={{ children: "레이블" }}
/>`,
      },
    },
  },
};
