import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { DateField } from "./DateField";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

/**
 * 특정 날짜를 직접 입력하는 필드입니다.
 * 연, 월, 일을 세그먼트 단위로 편집하며 값은 `"YYYY-MM-DD"` 형식의 문자열입니다.
 *
 * - 숫자를 입력하면 세그먼트가 채워지는 즉시 다음 세그먼트로 넘어갑니다. `2026.7.25`처럼 구분자를 포함해 입력해도 됩니다.
 * - 일이 그 달의 마지막 날을 넘으면 마지막 날로 맞춥니다.
 * - 입력이 완성되지 않았으면 값은 빈 문자열입니다.
 *
 * | 키 | 동작 |
 * | --- | --- |
 * | `←` `→` | 세그먼트 이동 |
 * | `↑` `↓` | 값 증감. 월과 일은 끝에서 반대쪽 끝으로 순환 |
 * | `Home` `End` | 월과 일을 첫 값, 마지막 값으로 변경 |
 * | `Backspace` `Delete` | 세그먼트 비우기. 빈 세그먼트에서 `Backspace`는 앞 세그먼트로 이동 |
 * | `Ctrl/⌘ + A` | 전체 선택. 이어서 `Backspace`로 모두 지우거나 숫자를 입력해 처음부터 다시 입력 |
 * | `Ctrl/⌘ + V` | `2026.07.25`, `2026-7-25`, `2026년 7월 25일`, `20260725` 형식 붙여넣기 |
 * | `Tab` | 필드 밖으로 이동. 필드 하나가 탭 정지점 하나 |
 *
 * Date picker 연결은 아직 제공하지 않습니다.
 */
const meta = {
  title: "Components/DateField",
  component: DateField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <DateField {...args} style={FIELD_WIDTH}>
      <DateField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </DateField.Label>
      <DateField.Input />
      <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
    </DateField>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <DateField status={status} style={FIELD_WIDTH}>
            <DateField.Label>레이블</DateField.Label>
            <DateField.Input defaultValue='2026-07-25' />
            <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
          </DateField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 값을 바꿀 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스와 세그먼트 이동이 가능합니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["disabled", { disabled: true }],
          ["readonly", { readonly: true }],
          ["required", { required: true }],
        ] as const
      ).map(([name, props]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          {["", "2026-07-25"].map(defaultValue => (
            <DateField key={defaultValue} {...props} style={FIELD_WIDTH}>
              <DateField.Label>레이블</DateField.Label>
              <DateField.Input defaultValue={defaultValue} />
              <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
            </DateField>
          ))}
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `suffix`로 입력 오른쪽에 `Kbd`를 배치합니다.
 * 특정 키나 키 조합 입력이 필드와 직접 연관이 있을 때만 사용합니다.
 */
export const WithKbd: Story = {
  render: () => (
    <DateField style={FIELD_WIDTH}>
      <DateField.Label>레이블</DateField.Label>
      <DateField.Input
        suffix={
          <Kbd size='sm' type='function'>
            ⌘
          </Kbd>
        }
      />
      <DateField.Helper>헬퍼 메시지 텍스트</DateField.Helper>
    </DateField>
  ),
};

/**
 * 주변 맥락이 레이블을 대신한다면 레이블 없이 `aria-label`로 이름을 제공합니다.
 */
export const WithoutLabel: Story = {
  render: () => (
    <DateField style={FIELD_WIDTH}>
      <DateField.Input aria-label='시작일' />
    </DateField>
  ),
};

const ControlledPreview = () => {
  const [date, setDate] = useState("2026-07-25");

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <DateField style={FIELD_WIDTH}>
        <DateField.Label>레이블</DateField.Label>
        <DateField.Input value={date} onChange={setDate} />
      </DateField>
      <Label>value: {date === "" ? "빈 문자열" : date}</Label>
    </FlexColumn>
  );
};

/**
 * `onChange`는 입력이 완성되면 `"YYYY-MM-DD"`를, 완성된 값의 세그먼트를 지우면 빈 문자열을 전달합니다.
 */
export const Controlled: Story = {
  render: () => <ControlledPreview />,
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const entry = new FormData(e.currentTarget).get("startDate");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
      onReset={() => setSubmitted(null)}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <DateField style={FIELD_WIDTH}>
          <DateField.Label>시작일</DateField.Label>
          <DateField.Input name='startDate' defaultValue='2026-07-25' />
        </DateField>
        <FlexRow gap='8px' style={FIELD_WIDTH}>
          <BlockButton type='reset' style={{ flex: 1 }}>
            초기화
          </BlockButton>
          <BlockButton type='submit' style={{ flex: 1 }}>
            제출
          </BlockButton>
        </FlexRow>
        <FormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 `"YYYY-MM-DD"` 값이 hidden input으로 렌더되어 폼 제출에 포함됩니다.
 * 폼을 초기화하면 `defaultValue`로 돌아갑니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
