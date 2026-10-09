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
        "날짜의 의미. current는 오늘, selected는 선택된 날짜입니다. selected는 aria-selected를 함께 부여합니다. 오늘이면서 선택된 날짜는 selected로 표시합니다.",
      table: { defaultValue: { summary: "normal" } },
    },
    outsideMonth: {
      control: "boolean",
      description:
        "표시 중인 달에 속하지 않는 날짜인지 여부. true면 주목도를 낮춘 모습으로 표시하고, 선택은 막지 않습니다.",
      table: { defaultValue: { summary: "false" } },
    },
    today: {
      control: "boolean",
      description:
        "오늘 날짜인지 여부. true면 aria-current='date'를 부여합니다. 모습은 바꾸지 않으므로 status와 함께 current를 지정합니다.",
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
  parameters: {
    docs: {
      description: {
        story: [
          "`state`는 UI 요소의 상호작용 상태를 시각적으로 정의한 속성입니다.",
          "- `rest`는 상호작용하기 이전의 기본값입니다.",
          "- `hover`는 해당 요소 위에 포인팅 장치를 올려둔 상태입니다.",
          "- `active`는 해당 요소에 대해 클릭이나 탭(터치) 등의 조치를 취한 상태입니다. '눌린 상태'로도 해석할 수 있습니다.",
          "- `focused`는 키보드 조작이나 음성 명령 등으로 포커스한 상태입니다.",
          "",
          "`state`와 `focused`는 prop이 아니라 CSS `:hover`, `:active`, `:focus-visible`로 표현됩니다. 셀에 포인터를 올리거나 누르고, Tab으로 포커스해 확인합니다. rest에서 hover로는 `motion.fluent`, `duration.100`으로 전환되고, hover에서 active로는 모션 없이 즉시 바뀝니다.",
          "",
          "`disabled=true`와 `focused=true`는 Figma에서 샌드박스적으로 함께 조합할 수 있지만, 실제 개발에서는 사용하지 않습니다. 다만 스크린리더 사용자에게 '비활성화된 상태와 이유'를 명확히 전달해야 하는 상황이라면 사용에 대해 별도 논의합니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    date: SAMPLE_DATE,
    status: "normal",
    outsideMonth: false,
    today: false,
    disabled: false,
  },
};

export const CellStatuses: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`status`는 DatePicker 캘린더 셀의 선택 상태에 대한 속성입니다.",
          "- `normal`은 일반적인 날짜 셀입니다.",
          "- `current`는 시스템 날짜 상의 오늘에 해당하는 셀입니다.",
          "- `selected`는 사용자 혹은 시스템에 의해 선택된 날짜 셀입니다.",
          "",
          "DatePicker가 날짜마다 `status`를 정하며, 값이 바뀔 때 `motion.fluent`, `duration.150`으로 전환됩니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} today={status === "current"} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const OutsideMonth: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`outsideMonth`는 현재 보고 있는 달의 이전, 다음 달에 해당하는 날짜 셀 여부에 대한 속성입니다.",
          "- `outsideMonth=false`는 현재 보고 있는 달에 해당하는 날짜인 경우입니다.",
          "- 이전, 다음 달에 해당하는 날짜라면 `outsideMonth=true`로 주목도를 낮춰 구분합니다.",
          "",
          "`selected`인 셀은 `outsideMonth=true`여도 `selected` 모습으로 나타납니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} today={status === "current"} outsideMonth />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`disabled`는 비활성화 여부에 대한 속성입니다.",
          "`disabled=true`라면 DatePicker Cell이 비활성화되었으므로 시각적으로 미묘하게 처리해 접근할 수 없음을 암시합니다.",
          "또한 `state=rest`가 아닌 다른 상호작용 상태와 `disabled=true`는 함께 조합될 수 없습니다.",
          "",
          "DatePicker에서는 `minDate`, `maxDate` 범위 밖의 날짜와 `isDateDisabled`가 `true`를 반환한 날짜가 `disabled`로 표시됩니다. 위 줄은 표시 중인 달의 날짜, 아래 줄은 이전, 다음 달 날짜입니다.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <FlexRow>
      {CELL_STATUS_OPTIONS.map(status => (
        <FlexColumn key={status} gap='8px' style={{ alignItems: "center" }}>
          <Code>{status}</Code>
          <Cell date={SAMPLE_DATE} status={status} today={status === "current"} disabled />
          <Cell
            date={SAMPLE_DATE}
            status={status}
            today={status === "current"}
            outsideMonth
            disabled
          />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};
