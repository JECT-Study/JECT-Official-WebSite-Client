import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { TimePicker } from "./TimePicker";
import { TIME_PICKER_FORMAT_OPTIONS, TIME_STEP_OPTIONS, type TimeValue } from "./timePicker.types";

import { Code } from "@/components/Code";

const SAMPLE_TIME: TimeValue = { hour: 15, minute: 25, second: 40 };

const PropertyLabel = ({ name, value }: { name: string; value: string }) => (
  <FlexRow gap='6px' style={{ alignItems: "center" }}>
    <span>{name}</span>
    <Code>{value}</Code>
  </FlexRow>
);

const formatTime = (time: TimeValue | null) => {
  if (time == null) return "선택 없음";

  const pad = (unit: number) => {
    return String(unit).padStart(2, "0");
  };

  return `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`;
};

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "시각과 관련된 값을 목록에서 선택해 입력하는 컴포넌트입니다. 정해진 시각 단위 안에서 원하는 시각을 빠르게 선택할 수 있도록 돕습니다.",
          "TimePicker는 오전/오후, 시, 분, 초 열과 선택적인 액션 바로 구성됩니다. 열마다 `role='listbox'`로 노출되며, 열 사이에는 dashed Divider를 둡니다.",
          "값은 날짜와 시간대가 없는 `{ hour, minute, second }` 객체이고 `hour`는 12시간제로 표시해도 0~23으로 담습니다. `value`를 넘기면 호출부가 소유하고, 넘기지 않으면 `defaultValue`로 시작해 TimePicker가 기억합니다. 트리거와 팝오버 연결은 아직 없습니다.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    format: { control: "select", options: TIME_PICKER_FORMAT_OPTIONS },
    value: { control: false },
    defaultValue: { control: false },
    minuteStep: { control: "select", options: TIME_STEP_OPTIONS },
    secondStep: { control: "select", options: TIME_STEP_OPTIONS },
    minTime: { control: false },
    maxTime: { control: false },
    withActionBar: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    defaultValue: SAMPLE_TIME,
    onChange: fn(),
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};

export const Format: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`format`은 표시할 열 구성을 정하는 속성입니다.",
          "- `hh`로 시작하는 형식은 12시간제이며 오전/오후 열을 맨 앞에 둡니다. 시 열은 12, 01, ..., 11 순서입니다.",
          "- `HH`로 시작하는 형식은 24시간제이며 시 열은 00~23입니다.",
          "- `mm`, `mm:ss`, `ss`처럼 시 열이 없는 형식도 시간 길이가 아니라 시각을 입력합니다. 화면에 없는 단위는 현재 값을 유지합니다.",
          "",
          "열릴 때 선택 항목을 열의 맨 위로 스크롤합니다. 목록 끝의 항목도 맨 위까지 올라옵니다.",
        ].join("\n"),
      },
    },
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
      {TIME_PICKER_FORMAT_OPTIONS.map(format => (
        <FlexColumn key={format} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='format' value={format} />
          <TimePicker {...args} format={format} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const Step: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`minuteStep`, `secondStep`은 분, 초 목록의 간격입니다. `1`, `5`, `10`, `15`, `30` 중 하나이며 기본값은 `5`입니다.",
          "",
          "간격에 맞지 않는 값이 들어오면 값은 바꾸지 않고 해당 열에 선택 표시를 하지 않습니다. 이 예시의 선택 값은 15:25이므로 간격이 10, 15, 30일 때는 분 열에 선택 표시가 없습니다.",
        ].join("\n"),
      },
    },
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
      {TIME_STEP_OPTIONS.map(step => (
        <FlexColumn key={step} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='minuteStep' value={String(step)} />
          <TimePicker {...args} format='HH:mm' minuteStep={step} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const WithActionBar: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`withActionBar`는 TimePicker 하부에 적용 버튼 영역을 포함할지 정하는 속성입니다.",
          "- 기본적으로는 `withActionBar=false`로 사용하며, 항목을 누르는 즉시 `onChange`가 호출됩니다.",
          "- 시각 선택에 별도 확인(적용) 절차가 필요하면 `withActionBar=true`로 사용합니다. 항목을 눌러도 바로 확정되지 않고, 적용을 눌러야 `onChange`가 호출됩니다. 확정된 값과 고른 값이 같으면 적용 버튼은 비활성화됩니다.",
        ].join("\n"),
      },
    },
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      {[false, true].map(withActionBar => (
        <FlexColumn key={String(withActionBar)} gap='12px' style={{ alignItems: "center" }}>
          <PropertyLabel name='withActionBar' value={String(withActionBar)} />
          <TimePicker {...args} withActionBar={withActionBar} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

export const TimeRange: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`minTime`, `maxTime`으로 선택할 수 있는 시각 범위를 정합니다. 범위 밖의 항목은 숨기지 않고 비활성화합니다. 항목은 그 항목을 골랐을 때 유효한 시각이 하나라도 있으면 활성입니다.",
          "",
          "이 예시의 범위는 09:30~18:00입니다. 시를 바꿔 분이 범위를 벗어나면 고른 시는 유지한 채 가장 가까운 유효 시각으로 맞춥니다. 예를 들어 오후 05시 30분에서 시를 06으로 바꾸면 18:30은 범위 밖이므로 18:00으로 맞춰집니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    defaultValue: { hour: 9, minute: 30, second: 0 },
    minTime: { hour: 9, minute: 30, second: 0 },
    maxTime: { hour: 18, minute: 0, second: 0 },
  },
};

export const OutOfRangeValue: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "범위 밖의 값이 들어오면 값을 바꾸지 않고 선택과 비활성을 함께 표시합니다. 이 예시는 `maxTime`이 18:00인데 20:00이 선택된 상태입니다.",
      },
    },
  },
  args: {
    format: "HH:mm",
    defaultValue: { hour: 20, minute: 0, second: 0 },
    maxTime: { hour: 18, minute: 0, second: 0 },
  },
};

export const Keyboard: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "열마다 Tab 정지점이 하나씩 있습니다. 포커스는 열에 두고 `aria-activedescendant`로 활성 항목을 가리킵니다. 선택은 포커스를 따라가지 않으므로 방향키로 옮긴 뒤 Enter나 Space로 고릅니다.",
          "",
          "| 키 | 동작 |",
          "| --- | --- |",
          "| Tab, Shift + Tab | 다음, 이전 열이나 적용 버튼으로 이동 |",
          "| ArrowUp, ArrowDown | 같은 열에서 이전, 다음 항목 활성 |",
          "| Home, PageUp | 처음 항목 활성 |",
          "| End, PageDown | 마지막 항목 활성 |",
          "| ArrowLeft, ArrowRight | 이전, 다음 열로 포커스 이동 |",
          "| Enter, Space | 활성 항목 선택 |",
          "",
          "이 예시는 Tab으로 시 열에 들어간 뒤 아래 방향키로 다음 항목을 활성화한 모습입니다. 포커스 링은 키보드로 포커스했을 때만 보입니다.",
        ].join("\n"),
      },
      story: { autoplay: true },
    },
  },
  args: {
    format: "HH:mm",
  },
  play: async ({ canvasElement }) => {
    const hourColumn = within(canvasElement).getByRole("listbox", { name: "시" });

    for (let count = 0; count < 5 && document.activeElement !== hourColumn; count += 1) {
      await userEvent.tab();
    }

    await expect(hourColumn).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value`와 `onChange`로 선택 값을 호출부가 소유하는 예시입니다. 밖에서 값을 바꾸면 각 열이 새 선택 항목을 맨 위로 스크롤합니다.",
      },
    },
  },
  render: function ControlledStory() {
    const [time, setTime] = useState<TimeValue | null>(null);

    return (
      <FlexColumn gap='16px' style={{ alignItems: "center" }}>
        <TimePicker format='hh:mm:ss' value={time} onChange={setTime} />
        <FlexRow gap='8px'>
          <span>{formatTime(time)}</span>
          <button type='button' onClick={() => setTime(null)}>
            초기화
          </button>
          <button type='button' onClick={() => setTime({ hour: 23, minute: 55, second: 30 })}>
            23:55:30으로
          </button>
        </FlexRow>
      </FlexColumn>
    );
  },
};

export const DisabledAndReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`disabled`를 켜면 모든 열을 조작하거나 포커스할 수 없습니다. `readOnly`를 켜면 열은 포커스하고 탐색할 수 있지만 선택은 바꿀 수 없고, 액션 바의 적용도 비활성화됩니다.",
      },
    },
  },
  args: {
    withActionBar: true,
  },
  render: args => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      <FlexColumn gap='12px' style={{ alignItems: "center" }}>
        <PropertyLabel name='disabled' value='true' />
        <TimePicker {...args} disabled />
      </FlexColumn>
      <FlexColumn gap='12px' style={{ alignItems: "center" }}>
        <PropertyLabel name='readOnly' value='true' />
        <TimePicker {...args} readOnly />
      </FlexColumn>
    </FlexRow>
  ),
};
