import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";

import { Cell } from "./Cell";
import { CELL_STATUS_OPTIONS } from "./cell.types";

import { Code } from "@/components/Code";

const SAMPLE_DATE = new Date(2026, 8, 30);

const meta: Meta<typeof Cell> = {
  title: "Components/DatePicker/Cell",
  component: Cell,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker의 날짜 한 칸을 그리는 내부 파츠입니다. 배럴에 공개되지 않으며 DatePicker 내부에서만 사용합니다. hover, active, focus는 prop이 아니라 CSS 의사클래스로 표현되므로, 스토리에서 직접 마우스를 올리거나 Tab으로 포커스해 확인합니다.",
      },
    },
  },
  argTypes: {
    date: {
      control: "date",
      description:
        "셀이 나타내는 날짜. 화면에는 일(日)만 표시되고 aria-label에는 전체 날짜가 들어갑니다.",
    },
    status: {
      control: "select",
      options: CELL_STATUS_OPTIONS,
      description:
        "날짜의 의미. current는 오늘, selected는 선택된 날짜입니다. current는 aria-current='date', selected는 aria-selected를 함께 부여합니다.",
      table: { defaultValue: { summary: "normal" } },
    },
    outsideMonth: {
      control: "boolean",
      description:
        "표시 중인 달에 속하지 않는 날짜인지 여부. true면 모습은 disabled와 다르게 유지하면서 native disabled로 선택을 막습니다.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부. native disabled를 사용하므로 키보드 포커스를 받지 않습니다.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof Cell>;

export const Default: Story = {
  args: {
    date: SAMPLE_DATE,
    status: "normal",
    outsideMonth: false,
    disabled: false,
  },
};

export const CellStatuses: Story = {
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const OutsideMonth: Story = {
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} outsideMonth />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} disabled />
          <Cell date={SAMPLE_DATE} status={status} outsideMonth disabled />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};
